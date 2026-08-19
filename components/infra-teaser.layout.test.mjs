import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const infraTeaserSource = await readFile(
  new URL('./infra-teaser.tsx', import.meta.url),
  'utf8',
);

test('AI campus layout keeps Korean at 50/50 and uses 58/42 for English at lg', () => {
  assert.match(
    infraTeaserSource,
    /const \{ locale, t \} = useI18n\(\)/,
  );
  assert.match(
    infraTeaserSource,
    /locale === 'en'\s+\? 'grid md:grid-cols-2 lg:grid-cols-\[minmax\(0,7fr\)_minmax\(0,5fr\)\] gap-12 items-stretch'\s+: 'grid md:grid-cols-2 gap-12 items-stretch'/,
  );
});
