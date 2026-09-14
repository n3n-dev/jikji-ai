import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { pathToFileURL } from 'node:url';
import { createCounter } from './counter.mjs';

// Production: use Ghost Content API (independent of Ghost's database engine).
// Local preview: optional read-only SQLite adapter. Never writes to Ghost.
export function createViewsServer({ dbPath, ghostPath, origin, ghostUrl, contentApiKey }) {
  if (!origin || new URL(origin).origin !== origin) throw new Error('BLOG_ORIGIN must be an origin without a path');
  let ghost;
  let isPublished;
  if (ghostUrl || contentApiKey) {
    if (!ghostUrl || !contentApiKey) throw new Error('GHOST_URL and GHOST_CONTENT_API_KEY are both required');
    const base = new URL(ghostUrl.endsWith('/') ? ghostUrl : ghostUrl + '/');
    if (!['http:','https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) throw new Error('Invalid GHOST_URL');
    isPublished = async id => {
      const url = new URL('ghost/api/content/posts/' + id + '/', base);
      url.searchParams.set('key', contentApiKey);
      url.searchParams.set('fields', 'id');
      const response = await fetch(url, {signal:AbortSignal.timeout(5000),redirect:'error'});
      if (response.status === 404) return false;
      if (!response.ok) throw new Error('Ghost unavailable');
      const body = await response.json();
      return body.posts?.some(post => post.id === id) === true;
    };
  } else {
    ghost = new DatabaseSync(ghostPath, { readOnly: true });
    const published = ghost.prepare("SELECT id FROM posts WHERE id=? AND status='published' AND type='post'");
    isPublished = id => Boolean(published.get(id));
  }
  const counter = createCounter(dbPath);
  let requests = 0;
  let windowStart = Date.now();
  const server = createServer(async (req, res) => {
    const send = (status, value) => {
      res.writeHead(status, {'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      res.end(JSON.stringify(value));
    };
    if (req.url !== '/views') return send(404, {error:'Not found'});
    if (!['POST','OPTIONS'].includes(req.method)) return send(405, {error:'Method not allowed'});
    if (req.headers.origin !== origin) return send(403, {error:'Origin not allowed'});
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.writeHead(204); return res.end();
    }
    if (Date.now() - windowStart >= 60000) { requests = 0; windowStart = Date.now(); }
    // Bounded local-service flood guard; not an anti-fraud/unique-person metric.
    if (++requests > 300) return send(429, {error:'Too many requests'});
    if (req.headers['content-type']?.split(';')[0] !== 'application/json') return send(415, {error:'JSON required'});
    try {
      let body = '';
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 1024) return send(413, {error:'Request too large'});
      }
      let data;
      try { data = JSON.parse(body); } catch { return send(400, {error:'Invalid JSON'}); }
      if (!data || !/^[a-f0-9]{24}$/.test(data.postId) || !/^[a-f0-9-]{36}$/.test(data.visitor)) return send(400, {error:'Invalid input'});
      const action = data.action ?? 'view';
      if (!['view','share'].includes(action)) return send(400, {error:'Invalid action'});
      if (!await isPublished(data.postId)) return send(404, {error:'Post not found'});
      if (action === 'share') counter.share(data.postId, data.visitor);
      else counter.visit(data.postId, data.visitor);
      return send(200, counter.totals(data.postId));
    } catch {
      if (!res.headersSent) send(503, {error:'Counter unavailable'});
    }
  });
  server.requestTimeout = 10000;
  server.on('close', () => { counter.close(); ghost?.close(); });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createViewsServer({dbPath:process.env.VIEWS_DB,ghostPath:process.env.GHOST_DB,origin:process.env.BLOG_ORIGIN,ghostUrl:process.env.GHOST_URL,contentApiKey:process.env.GHOST_CONTENT_API_KEY});
  server.listen(2369, '0.0.0.0', () => console.log('Article counter listening on 2369'));
  for (const signal of ['SIGTERM','SIGINT']) process.on(signal, () => server.close());
}
