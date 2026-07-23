import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const layoutSource = readFileSync('app/layout.tsx', 'utf8');
const buttonPath = 'components/go-to-top-button.tsx';
const buttonSource = existsSync(buttonPath) ? readFileSync(buttonPath, 'utf8') : '';

assert.ok(existsSync(buttonPath), 'GoToTopButton component file should exist');

assert.match(
  layoutSource,
  /import \{ GoToTopButton \} from '@\/components\/go-to-top-button';/,
  'Root layout should import the global go-to-top button',
);
assert.match(
  layoutSource,
  /<GoToTopButton \/>/,
  'Root layout should render the global go-to-top button',
);
assert.match(
  buttonSource,
  /^'use client';/,
  'GoToTopButton must be a client component',
);
assert.match(
  buttonSource,
  /from 'lucide-react';/,
  'GoToTopButton should use lucide-react for the icon',
);
assert.match(
  buttonSource,
  /addEventListener\('scroll'/,
  'GoToTopButton should appear in response to page scroll',
);
assert.match(
  buttonSource,
  /window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)/,
  'GoToTopButton should smooth-scroll to the page top',
);
