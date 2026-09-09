import {mkdir, readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const {name, version} = JSON.parse(await readFile(path.join(root, 'theme/package.json'), 'utf8'));
if (!/^[a-z0-9-]+$/.test(name) || !/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Invalid theme name or version');
await mkdir(path.join(root, 'dist'), {recursive: true});
// A unique intermediate ZIP prevents stale files from a previous package.
const {mkdtemp, rename, rmdir} = await import('node:fs/promises');
const temporary = await mkdtemp(path.join(root, 'dist', '.package-'));
const archive = path.join(temporary, `${name}-${version}.zip`);
execFileSync('zip', ['-qr', archive, '.', '-x', '*.DS_Store'], {cwd: path.join(root, 'theme'), stdio: 'inherit'});
await rename(archive, path.join(root, 'dist', `${name}-${version}.zip`));
await rmdir(temporary);
console.log(`dist/${name}-${version}.zip`);
