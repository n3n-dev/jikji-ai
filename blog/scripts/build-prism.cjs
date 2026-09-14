// Vendored Prism 1.30.0 (MIT), rebuilt from the locked npm dependency.
const fs = require('node:fs');
const path = require('node:path');
const base = path.dirname(require.resolve('prismjs/package.json'));
const languages = ['markup','css','clike','javascript','jsx','typescript','tsx','json','bash','python','yaml','sql'];
const files = ['prism-core', ...languages.map(name => `prism-${name}`)];
const banner = `/* Prism 1.30.0 | MIT | https://prismjs.com */\n`;
fs.writeFileSync('theme/assets/js/prism.js', banner + files.map(name => fs.readFileSync(path.join(base, 'components', name + '.min.js'),'utf8')).join('\n'));
fs.copyFileSync(path.join(base,'LICENSE'), 'theme/assets/js/prism-LICENSE.txt');
