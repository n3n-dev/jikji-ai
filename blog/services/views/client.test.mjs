import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

test('client displays server count and reuses browser identity on reload', async () => {
  const code = readFileSync(new URL('../../theme/assets/js/views.js', import.meta.url), 'utf8');
  const storage = new Map();
  const visitors = [];
  async function run(ok = true, endpoint = 'http://localhost:2369/views') {
    const label = {textContent:''};
    const element = {hidden:true,dataset:{postId:'aaaaaaaaaaaaaaaaaaaaaaaa',viewsEndpoint:endpoint},querySelector:()=>label};
    await runInNewContext(code, {
      document:{querySelector:s=>s==='[data-article-views]'?element:null,addEventListener(){}}, location:{origin:'http://localhost:2368',pathname:'/blog/article/'}, URL,
      localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},
      crypto:{randomUUID:()=> '12345678-1234-4234-8234-123456789012'},
      fetch:async (url, options)=>{ visitors.push(JSON.parse(options.body).visitor); return {ok,json:async()=>({views:1234})}; },
      AbortSignal, Intl
    });
    return {element,label};
  }
  const first = await run();
  assert.equal(first.element.hidden,false);
  assert.equal(first.label.textContent,'조회수 1,234');
  await run();
  assert.equal(visitors[0],visitors[1]);
  assert.equal((await run(false)).element.hidden,true);
  assert.equal((await run(true,'')).element.hidden,true);
  assert.equal(visitors.length,3);
});

async function sharePage({copyFails=false, apiFails=false, endpoint='http://localhost:2369/views', storageFails=false} = {}) {
  const requests = [];
  const shareLabel = {hidden:true,textContent:'',setAttribute(){}};
  const viewLabel = {textContent:''};
  const element = {hidden:true,dataset:{postId:'aaaaaaaaaaaaaaaaaaaaaaaa',viewsEndpoint:endpoint},querySelector:()=>viewLabel};
  const status = {textContent:''};
  const input = {hidden:true,focus(){},select(){}};
  let click;
  const button = {addEventListener:(_,fn)=>click=fn,closest:()=>({querySelector:s=>s==='.share-status'?status:input})};
  const document = new EventTarget();
  document.querySelector = s => s==='[data-article-views]'?element:s==='[data-share-count]'?shareLabel:null;
  document.querySelectorAll = s => s==='[data-article-share]'?[button]:[];
  document.body = {};
  const context = {
    document, Event, URL, AbortSignal, Intl, MutationObserver:class{observe(){}},
    location:{origin:'http://localhost:2368',pathname:'/blog/article/'},
    window:{location:{href:'http://localhost:2368/blog/article/?utm_source=test#heading'}},
    localStorage:{getItem:()=>{if(storageFails)throw Error('storage blocked');return '12345678-1234-4234-8234-123456789012';}},
    navigator:{clipboard:{async writeText(){if(copyFails)throw Error('denied');}}},
    fetch:async (_, options) => {
      const body = JSON.parse(options.body); requests.push(body);
      if(apiFails)throw Error('offline');
      return {ok:true,json:async()=>({views:12,shares:body.action==='share'?4:3})};
    }
  };
  runInNewContext(readFileSync(new URL('../../theme/assets/js/content.js',import.meta.url),'utf8'),context);
  await runInNewContext(readFileSync(new URL('../../theme/assets/js/views.js',import.meta.url),'utf8'),context);
  return {requests,shareLabel,status,input, async click(){await click(); await new Promise(setImmediate);}};
}

test('successful clipboard copy sends share event and updates displayed count', async () => {
  const page = await sharePage();
  assert.equal(page.shareLabel.textContent,'3');
  assert.equal(page.shareLabel.hidden,false);
  await page.click();
  assert.equal(page.requests.filter(r=>r.action==='share').length,1);
  assert.equal(page.shareLabel.textContent,'4');
  assert.equal(page.status.textContent,'링크를 복사했습니다.');
});

test('failed clipboard copy never sends a share event', async () => {
  const page = await sharePage({copyFails:true});
  await page.click();
  assert.equal(page.requests.filter(r=>r.action==='share').length,0);
  assert.equal(page.input.hidden,false);
  assert.equal(page.input.value,'http://localhost:2368/blog/article/');
});

test('counter unavailable does not turn successful copying into a failure', async () => {
  const page = await sharePage({apiFails:true});
  await page.click();
  assert.equal(page.requests.filter(r=>r.action==='share').length,1);
  assert.equal(page.status.textContent,'링크를 복사했습니다.');
  assert.equal(page.shareLabel.hidden,true);
});

test('unconfigured server or blocked storage sends no events but sharing still works', async () => {
  for (const options of [{endpoint:''},{storageFails:true}]) {
    const page = await sharePage(options);
    await page.click();
    assert.equal(page.requests.length,0);
    assert.equal(page.status.textContent,'링크를 복사했습니다.');
    assert.equal(page.shareLabel.hidden,true);
  }
});
