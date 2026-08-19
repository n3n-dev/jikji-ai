import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const infraTeaserSource = await readFile(
  new URL('./infra-teaser.tsx', import.meta.url),
  'utf8',
);

test('AI campus specs keep a 48px gap from the image on desktop', () => {
  assert.match(
    infraTeaserSource,
    /className="grid md:grid-cols-2 gap-12 items-stretch"/,
  );
});
