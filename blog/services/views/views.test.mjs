import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createServer } from 'node:http';

test('counts persist and duplicate visits expire after 30 minutes', async () => {
  const { createCounter } = await import('./counter.mjs');
  const path = join(mkdtempSync(join(tmpdir(), 'jikji-views-')), 'views.db');
  let counter = createCounter(path);
  assert.equal(counter.visit('post-a', 'visitor-a', 0), 1);
  assert.equal(counter.visit('post-a', 'visitor-a', 1799999), 1);
  assert.equal(counter.visit('post-a', 'visitor-b', 1799999), 2);
  assert.equal(counter.visit('post-b', 'visitor-a', 1799999), 1);
  counter.close();
  counter = createCounter(path);
  assert.equal(counter.visit('post-a', 'visitor-a', 1799999), 2);
  assert.equal(counter.visit('post-a', 'visitor-a', 1800000), 3);
  counter.close();
  const db = new DatabaseSync(path);
  assert.ok(db.prepare('SELECT visitor FROM visits').all().every(row => !row.visitor.includes('visitor-')));
  db.close();
});

test('server can validate published posts through Ghost API without a Ghost database mount', async t => {
  const { createViewsServer } = await import('./server.mjs');
  let upstreamStatus = 200;
  const upstream = createServer((req,res) => {
    const url = new URL(req.url,'http://localhost');
    assert.equal(url.pathname,'/blog/ghost/api/content/posts/aaaaaaaaaaaaaaaaaaaaaaaa/');
    assert.equal(url.searchParams.get('key'),'test-content-key');
    res.writeHead(upstreamStatus,{'Content-Type':'application/json'});
    res.end(JSON.stringify({posts:[{id:'aaaaaaaaaaaaaaaaaaaaaaaa'}]}));
  });
  await new Promise(resolve=>upstream.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>upstream.close(resolve)));
  const dir = mkdtempSync(join(tmpdir(),'jikji-api-counter-'));
  const server = createViewsServer({dbPath:join(dir,'counts.db'),ghostUrl:`http://127.0.0.1:${upstream.address().port}/blog/`,contentApiKey:'test-content-key',origin:'https://jikji.ai'});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>server.close(resolve)));
  const request = () => fetch(`http://127.0.0.1:${server.address().port}/views`,{method:'POST',headers:{origin:'https://jikji.ai','content-type':'application/json'},body:JSON.stringify({action:'share',postId:'aaaaaaaaaaaaaaaaaaaaaaaa',visitor:'12345678-1234-4234-8234-123456789012'})});
  assert.deepEqual(await (await request()).json(),{views:0,shares:1});
  upstreamStatus=404;
  assert.equal((await request()).status,404);
  upstreamStatus=500;
  assert.equal((await request()).status,503);
});

test('shares persist, deduplicate independently and expire after 30 minutes', async () => {
  const { createCounter } = await import('./counter.mjs');
  const path = join(mkdtempSync(join(tmpdir(), 'jikji-shares-')), 'counts.db');
  let counter = createCounter(path);
  assert.equal(typeof counter.share, 'function');
  assert.deepEqual(counter.totals('post-a'), {views:0, shares:0});
  counter.visit('post-a','visitor-a',0);
  assert.equal(counter.share('post-a','visitor-a',0),1);
  assert.equal(counter.share('post-a','visitor-a',1799999),1);
  assert.equal(counter.share('post-b','visitor-a',1799999),1);
  assert.equal(counter.share('post-a','visitor-b',1799999),2);
  counter.close();
  counter = createCounter(path);
  assert.equal(counter.share('post-a','visitor-a',1799999),2);
  assert.deepEqual(counter.totals('post-a'), {views:1,shares:2});
  assert.equal(counter.share('post-a','visitor-a',1800000),3);
  assert.deepEqual(counter.totals('post-a'), {views:1,shares:3});
  counter.close();
});

test('HTTP endpoint rejects invalid requests and keeps shares separate from views', async t => {
  const { createViewsServer } = await import('./server.mjs');
  const dir = mkdtempSync(join(tmpdir(), 'jikji-views-http-'));
  const ghostPath = join(dir, 'ghost.db');
  const ghost = new DatabaseSync(ghostPath);
  ghost.exec("CREATE TABLE posts (id TEXT, slug TEXT, status TEXT, type TEXT); INSERT INTO posts VALUES ('aaaaaaaaaaaaaaaaaaaaaaaa','article','published','post'), ('bbbbbbbbbbbbbbbbbbbbbbbb','draft','draft','post')");
  ghost.close();
  const server = createViewsServer({ dbPath: join(dir, 'views.db'), ghostPath, origin: 'http://localhost:2368' });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/views`;
  const request = (body, origin = 'http://localhost:2368') => fetch(url, {method:'POST', headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
  const body = {postId:'aaaaaaaaaaaaaaaaaaaaaaaa', visitor:'12345678-1234-4234-8234-123456789012'};
  assert.equal((await request(body, 'https://other.test')).status, 403);
  assert.equal((await request({...body,postId:'bbbbbbbbbbbbbbbbbbbbbbbb'})).status, 404);
  assert.equal((await request({...body,visitor:''})).status, 400);
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await request({...body,action:'invalid'})).status, 400);
  assert.deepEqual(await (await request(body)).json(), {views:1,shares:0});
  const responses = await Promise.all(Array.from({length:5},()=>request(body)));
  for (const response of responses) assert.deepEqual(await response.json(), {views:1,shares:0});
  const shares = await Promise.all(Array.from({length:5},()=>request({...body,action:'share'})));
  for (const response of shares) assert.deepEqual(await response.json(), {views:1,shares:1});
  assert.equal((await request({...body,action:'share',postId:'bbbbbbbbbbbbbbbbbbbbbbbb'})).status,404);
  assert.equal((await request({...body,action:'share'},'https://other.test')).status,403);
  assert.deepEqual(await (await request({...body,action:'share',visitor:'22345678-1234-4234-8234-123456789012'})).json(), {views:1,shares:2});
});
