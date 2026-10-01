import {cp, readdir, readFile, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

// Build an isolated production variant. Development routes and source files stay intact.
export async function prepareTheme(source, target) {
  await cp(source,target,{recursive:true});
  async function visit(dir) {
    for (const entry of await readdir(dir,{withFileTypes:true})) {
      const path = join(dir,entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.name.endsWith('.hbs')) {
        const text = await readFile(path,'utf8');
        await writeFile(path,text.replaceAll('{{@site.url}}/blog/','{{@site.url}}/posts/')
          .replaceAll('{{@site.url}}/{{section}}/','{{@site.url}}/{{#match section "blog"}}posts{{else}}{{section}}{{/match}}/'));
      }
    }
  }
  await visit(target);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length!==4) throw new Error('Usage: prepare-theme.mjs SOURCE TARGET');
  const source=resolve(process.argv[2]),target=resolve(process.argv[3]);
  if (target===source || target.startsWith(source+'/')) throw new Error('Target must be outside the source theme');
  await prepareTheme(source,target);
}
