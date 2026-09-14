import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

for (const locale of ['ko', 'en']) {
  test(`${locale}: Pricing is inside the infrastructure dropdown`, () => {
    const {nav} = JSON.parse(readFileSync(new URL(`../dictionaries/${locale}.json`, import.meta.url)));
    assert.equal(nav.pricing.href, '#pricing');
    assert.deepEqual(nav.ai_infrastructure.items.at(-1), {label: 'Pricing', href: '#pricing'});
  });
}

function runScroll(href) {
  const events = [], targets = [], scrolls = [];
  const code = ts.transpileModule(readFileSync(new URL('../lib/scroll-to-section.ts', import.meta.url), 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  const context = {exports:{}, window:{scrollY:100,innerHeight:900,dispatchEvent:e=>events.push(e),scrollTo:v=>scrolls.push(v)}, document:{getElementById:id=>{targets.push(id);return {offsetHeight:1200,getBoundingClientRect:()=>({top:400})};}},CustomEvent:class {constructor(type, options){this.type=type;this.detail=options.detail;}}};
  vm.runInNewContext(code, context);
  context.exports.scrollToSection(href);
  return {events,targets,scrolls};
}

test('Pricing parent scrolls without changing selected GPU', () => {
  const {events,targets,scrolls} = runScroll('#pricing');
  assert.deepEqual(targets, ['pricing']);
  assert.equal(events.length, 0);
  assert.equal(scrolls[0].top, 412);
});
test('Product section tab switching remains unchanged', () => {
  const result = runScroll('#gpucloud');
  assert.equal(result.events[0].type, 'products-tab-switch');
  assert.equal(result.events[0].detail, 'gpucloud');
});
