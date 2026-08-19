import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const infraTeaserSource = await readFile(
  new URL('./infra-teaser.tsx', import.meta.url),
  'utf8',
);

test('AI campus specs use a 60/40 desktop split with a 48px gap', () => {
  assert.match(
    infraTeaserSource,
    /className="grid md:grid-cols-2 lg:grid-cols-\[minmax\(0,3fr\)_minmax\(0,2fr\)\] gap-12 items-stretch"/,
  );
});
