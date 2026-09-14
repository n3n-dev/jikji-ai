import {readFile, realpath, stat} from 'node:fs/promises';
import {basename, dirname, extname, relative, resolve, sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHmac} from 'node:crypto';
import {parseArgs} from 'node:util';
import {marked} from 'marked';

const imageTypes = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif'};
const help = `Publish a local Markdown file directly to Ghost (Node 22+).

npm run publish:markdown -- --file /path/to/article.md --title "Title" --slug my-story --type blog --author GHOST_STAFF_ID

Required: --file, --title, --slug (lowercase URL slug), --type blog|news,
          --author (24-character Ghost staff ID; must be an existing user).
Optional: --dry-run (validate without credentials or sending anything).
Environment: GHOST_URL (site URL, including /blog if configured), GHOST_ADMIN_API_KEY.
Load credentials from a private file with Node --env-file, or your shell environment.
Do not put keys in command arguments, Markdown, git, or frontend code.

Running without --dry-run publishes immediately. No newsletter is sent.
Files are read only: no git commits, caches, temporary files, or source deletion.
Keep articles outside this repository (or in ignored blog/.local/).
Use ordinary Markdown images: ![alt](images/photo.png). Local raster images must
be inside the article directory; HTTPS images can also be referenced directly.
Raw HTML and local non-image links are rejected. SVG uploads are not supported.
After publishing, edit/delete in Ghost. An existing slug is never overwritten.
After a timeout, check Ghost before retrying: the server may have published.
Admin API keys grant broad access; only trusted developers should receive them.
`;

function auth(key) {
  if (!/^[a-f\d]{24}:[a-f\d]{64}$/i.test(key || '')) throw new Error('Invalid GHOST_ADMIN_API_KEY.');
  const [id, secret] = key.split(':');
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const data = `${encode({alg: 'HS256', typ: 'JWT', kid: id})}.${encode({iat: now, exp: now + 300, aud: '/admin/'})}`;
  return `Ghost ${data}.${createHmac('sha256', Buffer.from(secret, 'hex')).update(data).digest('base64url')}`;
}

function apiBase(value) {
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash ||
      (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))) {
    throw new Error('GHOST_URL requires HTTPS (HTTP allowed only for localhost).');
  }
  return `${url.href.replace(/\/$/, '')}/ghost/api/admin/`;
}

// No filesystem writes: the original document and uploaded bytes live in memory only.
export async function publishMarkdown(input, fetcher = fetch) {
  if (!input.title?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug || '') ||
      !['blog', 'news'].includes(input.type) || !/^[a-f\d]{24}$/i.test(input.author || '')) {
    throw new Error('Required: title, lowercase slug, type blog|news and existing Ghost staff ID.');
  }
  const file = await realpath(input.file);
  if (extname(file).toLowerCase() !== '.md' || (await stat(file)).size > 2 * 1024 * 1024) throw new Error('Expected a Markdown file up to 2 MB.');
  const markdown = await readFile(file, 'utf8');
  if (!markdown.trim()) throw new Error('Markdown is empty.');
  const tokens = marked.lexer(markdown);
  const images = new Map();
  const pending = [];
  const root = dirname(file);
  marked.walkTokens(tokens, token => {
    if (token.type === 'html') throw new Error('Raw HTML is not supported. Use Markdown syntax.');
    if (!['image', 'link'].includes(token.type)) return;
    if (/^https:\/\//i.test(token.href)) {
      const url = new URL(token.href);
      if (url.username || url.password) throw new Error('URLs must not contain credentials.');
      return;
    }
    if (token.type === 'link') {
      if (/^(mailto:|#)/i.test(token.href)) return;
      throw new Error('Links must use HTTPS, mailto or a page anchor.');
    }
    if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(token.href)) throw new Error('Local images must be relative to the article directory.');
    pending.push(token);
  });
  for (const token of pending) {
    const path = await realpath(resolve(root, decodeURIComponent(token.href)));
    const rel = relative(root, path);
    if (rel === '..' || rel.startsWith(`..${sep}`)) throw new Error('Images must stay inside the article directory.');
    const mime = imageTypes[extname(path).toLowerCase()];
    const info = await stat(path);
    if (!mime || !info.isFile() || info.size > 10 * 1024 * 1024) throw new Error('Expected PNG/JPEG/WEBP/GIF up to 10 MB.');
    if (!images.has(path)) images.set(path, {bytes: await readFile(path), mime, tokens: []});
    images.get(path).tokens.push(token);
  }
  if (input.dryRun) return {status: 'dry-run', slug: input.slug, images: images.size};
  const base = apiBase(input.url);
  auth(input.key); // Validate before making any network request.
  async function request(path, method = 'GET', body, allowMissing = false) {
    const headers = {Authorization: auth(input.key), 'Accept-Version': 'v6.0'};
    if (typeof body === 'string') headers['Content-Type'] = 'application/json';
    let response;
    try {
      response = await fetcher(base + path, {method, headers, body, redirect: 'error', signal: AbortSignal.timeout(30000)});
    } catch {
      throw new Error('Ghost connection failed. Check Ghost before retrying; the request may have completed.');
    }
    if (allowMissing && response.status === 404) return null;
    if (!response.ok) throw new Error(`Ghost API HTTP ${response.status}. Check Ghost before retrying. Uploaded images may remain if publication failed.`);
    try { return await response.json(); } catch { throw new Error('Invalid Ghost response. Check Ghost before retrying.'); }
  }
  if (await request(`posts/slug/${input.slug}/`, 'GET', undefined, true)) throw new Error('This slug already exists. Edit the post in Ghost instead.');
  const user = await request(`users/${input.author}/`);
  if (user.users?.[0]?.id !== input.author) throw new Error('Ghost author was not found.');
  for (const [path, image] of images) {
    const form = new FormData();
    form.set('file', new Blob([image.bytes], {type: image.mime}), basename(path));
    form.set('purpose', 'image');
    const uploaded = await request('images/upload/', 'POST', form);
    const url = uploaded.images?.[0]?.url;
    if (!url || !/^https?:\/\//.test(url)) throw new Error('Invalid uploaded image URL.');
    for (const token of image.tokens) token.href = url;
  }
  const post = {title: input.title.trim(), slug: input.slug, status: 'published',
    tags: [{name: input.type === 'blog' ? 'Blog' : 'News', slug: input.type}],
    authors: [{id: input.author}], html: marked.parser(tokens)};
  const result = await request('posts/?source=html', 'POST', JSON.stringify({posts: [post]}));
  if (result.posts?.[0]?.status !== 'published' || !result.posts[0].url) throw new Error('Publication not confirmed. Check Ghost before retrying.');
  return {id: result.posts[0].id, status: result.posts[0].status, url: result.posts[0].url};
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const {values} = parseArgs({options: {
      file: {type: 'string'}, title: {type: 'string'}, slug: {type: 'string'},
      type: {type: 'string'}, author: {type: 'string'},
      'dry-run': {type: 'boolean'}, help: {type: 'boolean'},
    }});
    if (values.help) console.log(help);
    else console.log(JSON.stringify(await publishMarkdown({...values, dryRun: values['dry-run'],
      url: process.env.GHOST_URL, key: process.env.GHOST_ADMIN_API_KEY}), null, 2));
  } catch (error) {
    // Do not print arbitrary option values, paths, stack traces or server bodies.
    const message = error.code ? 'Invalid arguments or unreadable file. Run with --help.' : error.message;
    console.error(message);
    process.exitCode = 1;
  }
}
