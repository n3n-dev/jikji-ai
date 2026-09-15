import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const header = readFileSync(new URL('./header.tsx', import.meta.url), 'utf8');

test('Blog precedes Company in the shared desktop/mobile navigation', () => {
  assert.match(header, /\{ label: 'Blog', href: 'https:\/\/blog\.jikji\.ai\/' \},\s*t\.nav\.company/);
  assert.equal((header.match(/navSections\.map\(/g) || []).length, 2);
});

test('Blog links to the live Ghost site with no localhost fallback', () => {
  assert.match(header, /label: 'Blog', href: 'https:\/\/blog\.jikji\.ai\/'/);
  assert.doesNotMatch(header, /localhost:2368|NEXT_PUBLIC_BLOG_URL/);
});

test('local redirect is development-only and production retains static export', () => {
  const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
  assert.match(config, /const isDevelopment = process\.env\.NODE_ENV === 'development'/);
  assert.match(config, /output: isDevelopment \? undefined : 'export'/);
  assert.match(config, /\.\.\.\(isDevelopment \? \{\s*async redirects\(\)/);
  assert.match(config, /source: '\/blog', destination: 'http:\/\/localhost:2368\/', permanent: false/);
});
