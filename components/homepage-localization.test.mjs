import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const en = JSON.parse(
  readFileSync(new URL('../dictionaries/en.json', import.meta.url), 'utf8'),
);

test('English homepage locale content is complete and contains no Hangul', () => {
  const groups = en.company.about.fullstack_groups ?? [];
  const strings = [
    en.footer.companyName,
    en.footer.ceo,
    en.infrastructure.region.cluster.title,
    en.infrastructure.region.cluster.subtitle,
    en.infrastructure.region.cluster.image_alt,
    en.infrastructure.region.cluster.campus_label,
    en.infrastructure.region.cluster.opening_label,
    en.products.platform.agents.example_prompt,
    ...groups.flatMap((group) => [
      group.title,
      ...group.items.flatMap((item) => [item.title, item.subtitle]),
    ]),
  ];

  assert.equal(groups.length, 3);
  assert.deepEqual(
    groups.map((group) => group.items.length),
    [2, 2, 2],
  );
  assert.equal(strings.length, 23);
  assert.equal(
    strings.every((value) => typeof value === 'string' && value.length > 0),
    true,
  );
  assert.doesNotMatch(strings.join('\n'), /[가-힣]/u);
  assert.doesNotMatch(strings.join('\n'), /\bAI DC\b/u);
  assert.equal(en.footer.companyName, 'N3N Co., Ltd.');
  assert.equal(en.footer.ceo, 'CEO: Youngsam Nam');
  assert.equal(
    en.infrastructure.region.cluster.title,
    'JIKJI Labs AI Edge Computing Infrastructure',
  );
  assert.equal(
    en.infrastructure.region.cluster.subtitle,
    'Building 25 AI Edge Computing clusters across the Seoul metropolitan area',
  );
});
