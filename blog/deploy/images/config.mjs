import {chmodSync, readFileSync, writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export function buildConfig(env) {
  const required = name => {
    if (!env[name]?.trim()) throw new Error(`${name} is required`);
    return env[name];
  };
  const port = (name, fallback) => {
    const n = Number(env[name] || fallback);
    if (!Number.isInteger(n) || n < 1 || n > 65535) throw new Error(`${name} must be a port`);
    return n;
  };
  let url;
  try { url = new URL(required('GHOST_URL')); }
  catch { throw new Error('GHOST_URL must be a public HTTPS URL'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('GHOST_URL must be a public HTTPS URL without credentials, query or fragment');
  }
  const secure = required('SMTP_SECURE');
  if (!['true','false'].includes(secure)) throw new Error('SMTP_SECURE must be true or false');
  const connection = {
    host:required('DB_HOST'), port:port('DB_PORT',3306),
    user:required('DB_USER'), password:required('DB_PASSWORD'), database:required('DB_NAME')
  };
  if (env.DB_SSL_CA_FILE) {
    connection.ssl = {ca:readFileSync(env.DB_SSL_CA_FILE,'utf8'),rejectUnauthorized:true};
  }
  return {
    url:url.href.replace(/\/$/,''), server:{host:'0.0.0.0',port:2368},
    database:{client:'mysql',connection}, paths:{contentPath:'/var/lib/ghost/content'},
    mail:{transport:'SMTP',from:required('MAIL_FROM'),options:{
      host:required('SMTP_HOST'),port:port('SMTP_PORT',587),secure:secure==='true',
      auth:{user:required('SMTP_USER'),pass:required('SMTP_PASSWORD')}
    }},
    logging:{transports:['stdout']}
  };
}

export function writeConfig(path, config) {
  writeFileSync(path,JSON.stringify(config),{mode:0o600});
  // mode only affects new files; the upstream image may already contain a 0644 config.
  chmodSync(path,0o600);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const config = buildConfig(process.env);
    writeConfig('/var/lib/ghost/config.production.json',config);
  } catch (error) {
    // Only validation errors from this module are public; no paths/secret values/stacks.
    console.error(error.code ? 'Unable to read or write production configuration' : error.message);
    process.exitCode = 1;
  }
}
