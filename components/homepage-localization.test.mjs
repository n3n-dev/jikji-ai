import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const en = JSON.parse(
  readFileSync(new URL('../dictionaries/en.json', import.meta.url), 'utf8'),
);
const ko = JSON.parse(
  readFileSync(new URL('../dictionaries/ko.json', import.meta.url), 'utf8'),
);

test('English homepage locale content is complete and contains no Hangul', () => {
  const groups = en.company.about.fullstack_groups ?? [];
  const aidcSpecs = en.infrastructure.aidc.specs ?? [];
  const strings = [
    en.footer.companyName,
    en.footer.ceo,
    en.company.about.title,
    en.company.about.fullstack_desc,
    en.infrastructure.region.cluster.title,
    en.infrastructure.region.cluster.subtitle,
    en.infrastructure.region.cluster.image_alt,
    en.infrastructure.region.cluster.campus_label,
    en.infrastructure.region.cluster.opening_label,
    en.products.platform.agents.example_prompt,
    ...aidcSpecs.flatMap((spec) => [spec.title, spec.desc]),
    ...groups.flatMap((group) => [
      group.title,
      ...group.items.flatMap((item) => [item.title, item.subtitle]),
    ]),
  ];

  assert.equal(groups.length, 3);
  assert.equal(aidcSpecs.length, 4);
  assert.deepEqual(
    groups.map((group) => group.items.length),
    [2, 2, 2],
  );
  assert.equal(strings.length, 33);
  assert.equal(
    strings.every((value) => typeof value === 'string' && value.length > 0),
    true,
  );
  assert.doesNotMatch(strings.join('\n'), /[가-힣]/u);
  assert.doesNotMatch(strings.join('\n'), /\bAI DC\b/u);
  assert.equal(en.footer.companyName, 'N3N Co., Ltd.');
  assert.equal(en.footer.ceo, 'CEO: Youngsam Nam');
  assert.equal(
    en.company.about.title,
    'We build the full AI stack.',
  );
  assert.equal(
    en.company.about.fullstack_desc,
    'Build, train, and deploy—all on one platform.',
  );
  assert.equal(
    en.infrastructure.aidc.title,
    'JIKJI Labs AI Infrastructure',
  );
  assert.equal(
    ko.infrastructure.aidc.title,
    'JIKJI Labs AI Infrastructure',
  );
  assert.equal(
    en.infrastructure.region.cluster.title,
    'JIKJI Labs - Building 25 AI Edge Computing Clusters',
  );
  assert.equal(
    ko.infrastructure.region.cluster.title,
    'JIKJI Labs - Building 25 AI Edge Computing Clusters',
  );
  assert.equal(
    en.infrastructure.region.cluster.subtitle,
    'Building 25 AI Edge Computing clusters across the Seoul metropolitan area',
  );
});

test('English AI campus specs match the approved Korean-aligned content', () => {
  assert.deepEqual(
    en.infrastructure.aidc.specs.map(({ index, title, desc }) => ({
      index,
      title,
      desc,
    })),
    [
      {
        index: '01',
        title: 'Building Overview',
        desc: '• Site: 575 m² / 6,189 sq ft\n• Floor area: 2,280 m² / 24,542 sq ft\n• 5 floors above grade / 2 below',
      },
      {
        index: '02',
        title: 'AI & GPU Infrastructure',
        desc: '• GPU clusters\n• AI compute servers\n• High-speed storage & networking\n• AI video processing\n• Large-scale training & inference',
      },
      {
        index: '03',
        title: 'Facilities',
        desc: '• AI research labs\n• GPU server room\n• AI development lab\n• Data analytics lab\n• Test lab\n• Training, meeting & collaboration spaces',
      },
      {
        index: '04',
        title: 'Capabilities',
        desc: '• AI video generation, analysis & editing\n• GPU-accelerated HPC\n• Large-scale training & inference\n• High-speed processing & storage\n• Hybrid cloud & on-prem support\n• Scalable GPU infrastructure',
      },
    ],
  );
});

test('Korean building overview renders as a three-item dotted list', () => {
  const buildingOverviewLines =
    ko.infrastructure.aidc.specs[0].desc.split('\n');

  assert.equal(buildingOverviewLines.length, 3);
  assert.equal(
    buildingOverviewLines.every((line) => line.startsWith('• ')),
    true,
  );
});
