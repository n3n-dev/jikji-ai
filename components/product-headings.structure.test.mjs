import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Featured heading is text-only with its bottom spacing preserved', () => {
  const catalog = readFileSync(new URL('../app/products/product-catalog.tsx', import.meta.url), 'utf8');
  assert.match(catalog, /<h2 className="mb-5 text-xl font-bold tracking-normal text-white">\s*Featured\s*<\/h2>/);
  assert.match(catalog, /<h1[^>]*>\s*Products\s*<\/h1>/);
  assert.ok(catalog.includes('relative h-5 w-5 shrink-0'));
  assert.doesNotMatch(catalog, /<Sparkles className="h-10 w-10 text-white"/);
  assert.match(catalog, /icon: Sparkles/);
});
