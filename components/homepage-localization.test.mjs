import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const en = JSON.parse(
  readFileSync(new URL('../dictionaries/en.json', import.meta.url), 'utf8'),
);

test('English homepage locale content is complete and contains no Hangul', () => {
  const groups = en.company.about.fullstack_groups ?? [];
  const strings = [
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
  assert.equal(strings.length, 18);
  assert.equal(
    strings.every((value) => typeof value === 'string' && value.length > 0),
    true,
  );
  assert.doesNotMatch(strings.join('\n'), /[가-힣]/u);
});
