import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, rm, stat, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {buildConfig, writeConfig} from '../deploy/images/config.mjs';
import {prepareTheme} from '../deploy/images/prepare-theme.mjs';

const env = {
  GHOST_URL:'https://example.com/blog', DB_HOST:'mysql', DB_NAME:'ghost',
  DB_USER:'ghost', DB_PASSWORD:'test-only-db', MAIL_FROM:'blog@example.com',
  SMTP_HOST:'smtp.example.com', SMTP_PORT:'587', SMTP_SECURE:'false',
  SMTP_USER:'test-user', SMTP_PASSWORD:'test-only-mail'
};

test('production config uses MySQL and typed SMTP values without disabling verification', () => {
  const c = buildConfig(env);
  assert.equal(c.url, 'https://example.com/blog');
  assert.equal(c.database.client, 'mysql');
  assert.equal(c.database.connection.password, env.DB_PASSWORD);
  assert.equal(c.mail.options.secure, false);
  assert.equal(c.mail.options.port, 587);
  assert.equal(c.security, undefined);
  assert.equal(c.paths.contentPath, '/var/lib/ghost/content');
  assert.equal(buildConfig({...env, SMTP_SECURE:'true',SMTP_PORT:'465'}).mail.options.secure,true);
});

test('missing credentials, malformed URLs and invalid types fail without disclosing values', () => {
  for (const key of ['DB_PASSWORD','SMTP_PASSWORD','SMTP_HOST','GHOST_URL']) {
    assert.throws(() => buildConfig({...env,[key]:''}), new RegExp(key));
  }
  for (const url of ['http://example.com/blog','https://user:secret@example.com/blog','https://example.com/blog?key=secret','https://example.com/blog#secret']) {
    assert.throws(() => buildConfig({...env,GHOST_URL:url}), error => !error.message.includes('secret'));
  }
  assert.throws(() => buildConfig({...env,SMTP_SECURE:'no'}),/SMTP_SECURE/);
  assert.throws(() => buildConfig({...env,DB_PORT:'abc'}),/DB_PORT/);
  assert.equal(buildConfig({...env,GHOST_URL:'https://example.com/'}).url,'https://example.com');
});

test('production theme links use posts while retaining the source theme and News links', async () => {
  const dir = await mkdtemp(join(tmpdir(),'jikji-theme-'));
  const source = new URL('../theme/',import.meta.url);
  const before = await readFile(new URL('default.hbs',source),'utf8');
  try {
    await prepareTheme(source,dir);
    const generated = await readFile(join(dir,'default.hbs'),'utf8');
    assert.ok(generated.includes('{{@site.url}}/posts/'));
    assert.ok(generated.includes('{{@site.url}}/posts/rss/'));
    assert.ok(generated.includes('{{@site.url}}/news/'));
    assert.ok(!generated.includes('{{@site.url}}/blog/'));
    const back = await readFile(join(dir,'partials/article-actions.hbs'),'utf8');
    assert.ok(back.includes('{{#match section "blog"}}posts{{else}}{{section}}{{/match}}'));
    assert.equal(await readFile(new URL('default.hbs',source),'utf8'),before);
  } finally { await rm(dir,{recursive:true,force:true}); }
});

test('an existing configuration file is restricted to the service user', async () => {
  const dir=await mkdtemp(join(tmpdir(),'jikji-config-'));
  try {
    const path=join(dir,'config.production.json');
    await writeFile(path,'{}',{mode:0o644});
    writeConfig(path,buildConfig(env));
    assert.equal((await stat(path)).mode & 0o777,0o600);
  } finally { await rm(dir,{recursive:true,force:true}); }
});
