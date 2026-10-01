import http from 'node:http';
const prefix = new URL(process.env.GHOST_URL).pathname.replace(/\/$/,'');
const request=http.get({host:'127.0.0.1',port:2368,path:prefix+'/ghost/api/admin/site/',
  headers:{'X-Forwarded-Proto':'https'},timeout:4000}, response => {
  response.resume();
  process.exitCode=response.statusCode===200 ? 0 : 1;
});
request.on('timeout',()=>request.destroy());
request.on('error',()=>{process.exitCode=1;});
