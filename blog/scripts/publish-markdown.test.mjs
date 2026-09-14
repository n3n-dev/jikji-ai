import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, readFile, readdir, symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const mod = await import('./publish-markdown.mjs');
const key = 'a'.repeat(24) + ':' + 'b'.repeat(64);
const author = 'c'.repeat(24);
async function fixture(body = '# Hello\n\nA **story**.') {
  const dir = await mkdtemp(join(tmpdir(), 'jikji-publish-test-'));
  const file = join(dir, 'article.md');
  await writeFile(file, body);
  return {dir, file, title: '제목', slug: 'test-story', type: 'blog', author,
    url: 'https://example.com/blog/', key};
}
function api({exists = false, failPost = false} = {}) {
  const requests = [];
  return {requests, fetch: async (url, options) => {
    requests.push({url: String(url), ...options});
    if (String(url).includes('/posts/slug/')) return Response.json(exists ? {posts: [{id: 'existing'}]} : {}, {status: exists ? 200 : 404});
    if (String(url).includes('/users/')) return Response.json({users: [{id: author}]});
    if (String(url).includes('/images/upload/')) return Response.json({images: [{url: 'https://example.com/blog/content/images/photo.png'}]});
    if (failPost) return Response.json({errors: [{message: key}]}, {status: 500});
    return Response.json({posts: [{id: 'new', status: 'published', url: 'https://example.com/blog/blog/test-story/'}]}, {status: 201});
  }};
}
test('publishes Markdown with primary tag and explicit author, without writing to disk', async () => {
  assert.equal(typeof mod.publishMarkdown, 'function');
  const input = await fixture();
  const server = api();
  const before = await readdir(input.dir);
  const result = await mod.publishMarkdown(input, server.fetch);
  const post = JSON.parse(server.requests.find(r => r.method === 'POST').body).posts[0];
  assert.equal(post.status, 'published');
  assert.equal(post.tags[0].slug, 'blog');
  assert.deepEqual(post.authors, [{id: author}]);
  assert.match(post.html, /<strong>story<\/strong>/);
  assert.equal(result.status, 'published');
  assert.deepEqual(await readdir(input.dir), before);
  assert.equal(await readFile(input.file, 'utf8'), '# Hello\n\nA **story**.');
  assert.ok(server.requests.every(r => r.redirect === 'error'));
  const token = server.requests[0].headers.Authorization.slice(6).split('.');
  assert.equal(JSON.parse(Buffer.from(token[1], 'base64url')).aud, '/admin/');
  assert.ok(server.requests[0].url.startsWith('https://example.com/blog/ghost/api/admin/'));
});
test('existing slug stops before any uploads or writes (never overwrites Ghost edits)', async () => {
  const input = await fixture(); const server = api({exists: true});
  await assert.rejects(() => mod.publishMarkdown(input, server.fetch), /already exists/);
  assert.ok(server.requests.every(r => r.method === 'GET'));
});
test('uploads repeated local images once and replaces their paths', async () => {
  const input = await fixture('![First](photo.png)\n\n![Second](photo.png)');
  await writeFile(join(input.dir, 'photo.png'), Buffer.from('89504e470d0a1a0a', 'hex'));
  const server = api(); await mod.publishMarkdown(input, server.fetch);
  const uploads = server.requests.filter(r => r.url.includes('/images/upload/'));
  assert.equal(uploads.length, 1);
  assert.equal(uploads[0].body.get('file').name, 'photo.png');
  const post = JSON.parse(server.requests.at(-1).body).posts[0];
  assert.equal((post.html.match(/https:\/\/example.com\/blog\/content\/images\/photo.png/g) || []).length, 2);
});
test('preflight rejects invalid files, raw HTML and unsafe links before any requests', async () => {
  for (const body of ['![x](../secret.png)', '![x](missing.png)', '<script>alert(1)</script>', '[x](javascript:alert)', '[x](notes.md)']) {
    const input = await fixture(body); const server = api();
    await assert.rejects(() => mod.publishMarkdown(input, server.fetch));
    assert.equal(server.requests.length, 0);
  }
});
test('symlink images cannot escape the article directory', async () => {
  const input = await fixture('![x](photo.png)');
  const outside = await fixture();
  await symlink(outside.file, join(input.dir, 'photo.png'));
  await assert.rejects(() => mod.publishMarkdown(input, api().fetch), /directory/);
});
test('dry-run validates without credentials or network and leaves source intact', async () => {
  const input = await fixture(); const server = api();
  const result = await mod.publishMarkdown({...input, key: undefined, url: undefined, dryRun: true}, server.fetch);
  assert.equal(result.status, 'dry-run'); assert.equal(server.requests.length, 0);
});
test('rejects insecure remote URL, bad keys and bad metadata without requests', async () => {
  const input = await fixture();
  for (const change of [{url: 'http://example.com'}, {key: 'invalid'}, {type: 'other'}, {slug: 'bad slug'}, {author: ''}, {title: ''}]) {
    const server = api();
    await assert.rejects(() => mod.publishMarkdown({...input, ...change}, server.fetch));
    assert.equal(server.requests.length, 0);
  }
});
test('API errors do not expose server response, keys, or trigger automatic retry', async () => {
  const input = await fixture(); const server = api({failPost: true});
  await assert.rejects(() => mod.publishMarkdown(input, server.fetch), error => !error.message.includes(key) && /500/.test(error.message));
  assert.equal(server.requests.filter(r => r.url.includes('/posts/?')).length, 1);
});
