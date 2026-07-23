import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const footerSource = await readFile(
  new URL('./footer.tsx', import.meta.url),
  'utf8',
);

test('footer exposes family sites from the control cluster', () => {
  assert.match(footerSource, /const familySites = \[/);
  assert.match(footerSource, /Family Sites/);
  assert.match(footerSource, /aria-haspopup="menu"/);
  assert.match(footerSource, /https:\/\/www\.n3n\.co\.kr/);
  assert.doesNotMatch(footerSource, /https:\/\/www\.jikji\.ai/);
  assert.doesNotMatch(footerSource, /JIKJI\.AI/);
});

test('footer removes the old inline N3N site link from copyright text', () => {
  assert.doesNotMatch(footerSource, /href="https:\/\/n3n\.ai"/);
  assert.doesNotMatch(footerSource, /t\.footer\.siteLink/);
});

test('footer family sites menu has accessible wiring and visible borders', () => {
  assert.match(footerSource, /id="family-sites-button"/);
  assert.match(footerSource, /aria-controls=/);
  assert.match(footerSource, /id="family-sites-menu"/);
  assert.match(footerSource, /aria-labelledby="family-sites-button"/);
  assert.match(footerSource, /onKeyDown=/);
  assert.match(footerSource, /border-white\/20/);
  assert.match(footerSource, /min-h-12/);
  assert.match(footerSource, /w-full/);
  assert.match(footerSource, /aria-label=\{`\$\{site\.name\}:/);
  assert.match(footerSource, /className="text-sm font-semibold text-white"/);
  assert.match(
    footerSource,
    /className="text-\[13px\] leading-4 text-white\/80"/,
  );
  assert.doesNotMatch(footerSource, /text-\[11px\]/);
});
