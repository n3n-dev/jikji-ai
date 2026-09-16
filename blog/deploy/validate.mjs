// Render-only checks: no containers started and no cluster contacted.
import assert from 'node:assert/strict';
import {execFileSync, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {parseAllDocuments} from 'yaml';
const cwd=fileURLToPath(new URL('../',import.meta.url));
const env={PATH:process.env.PATH,HOME:process.env.HOME,
  GHOST_IMAGE:'jikji-ghost:6.62.0',MYSQL_IMAGE:'mysql:8.0',METRICS_IMAGE:'jikji-blog-metrics:1',
  GHOST_URL:'https://example.com/blog',DB_HOST:'mysql',DB_NAME:'ghost',DB_USER:'ghost',
  DB_PASSWORD:'validation-only',MYSQL_ROOT_PASSWORD:'validation-only',
  MAIL_FROM:'blog@example.com',SMTP_HOST:'smtp.example.com',SMTP_USER:'validation-only',SMTP_PASSWORD:'validation-only',
  BLOG_ORIGIN:'https://example.com',GHOST_CONTENT_API_KEY:'validation-only'};
const base=['compose','--env-file','/dev/null','-f','deploy/compose/compose.yaml'];
for (const overlays of [[],['mysql'],['metrics'],['mysql','metrics']]) {
  const args=[...base,...overlays.flatMap(n=>['-f',`deploy/compose/compose.${n}.yaml`]),'config','--format','json'];
  const config=JSON.parse(execFileSync('docker',args,{cwd,env,encoding:'utf8'}));
  assert.equal(config.services.ghost.environment.DB_HOST,'mysql');
  assert.ok(config.services.ghost.volumes.some(v=>v.target==='/var/lib/ghost/content'));
  for (const service of Object.values(config.services)) {
    for (const port of service.ports || []) assert.equal(port.host_ip,'127.0.0.1');
    assert.equal(service.environment?.security__staffDeviceVerification,undefined);
  }
  if (overlays.includes('mysql')) assert.equal(config.services.mysql.ports,undefined);
  if (overlays.includes('metrics')) assert.ok(config.services.metrics.environment.GHOST_CONTENT_API_KEY);
}
const invalid=spawnSync('docker',[...base,'config','--quiet'],{cwd,env:{...env,DB_PASSWORD:''},encoding:'utf8'});
assert.notEqual(invalid.status,0);
console.log('PASS Compose: 4 variants, private ports, persistence, required-secret failure');
const rendered=execFileSync('kubectl',['kustomize','deploy/kubernetes/example'],{cwd,encoding:'utf8'});
const docs=parseAllDocuments(rendered).map(d=>{assert.equal(d.errors.length,0);return d.toJSON();});
const get=(kind,name)=>docs.find(d=>d.kind===kind&&d.metadata.name===name);
const ghost=get('Deployment','ghost');
assert.equal(ghost.spec.replicas,1);
assert.equal(ghost.spec.strategy.type,'Recreate');
assert.equal(ghost.spec.template.spec.securityContext.runAsNonRoot,true);
assert.ok(get('PersistentVolumeClaim','ghost-content'));
assert.ok(get('StatefulSet','mysql'));
assert.equal(get('Service','ghost').spec.type,undefined);
const ingress=get('Ingress','ghost');
assert.equal(ingress.spec.rules[0].http.paths[0].path,'/blog');
assert.ok(ingress.spec.tls.length);
const configs=docs.filter(d=>d.kind==='ConfigMap');
for(const config of configs) for(const key of Object.keys(config.data)) assert.ok(!/PASSWORD|API_KEY/.test(key));
assert.equal(docs.some(d=>d.kind==='Secret'),false);
const metrics=parseAllDocuments(execFileSync('kubectl',['kustomize','deploy/kubernetes/metrics'],{cwd,encoding:'utf8'})).map(d=>d.toJSON());
assert.equal(metrics.find(d=>d.kind==='Deployment').spec.replicas,1);
console.log('PASS Kubernetes: Kustomize, single writer, TLS routing, PVCs, Secret references');
