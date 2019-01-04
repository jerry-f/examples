const Koa = require('koa');
const auth = require('koa-basic-auth');

const app = module.exports = new Koa();

// custom 401 handling

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

// require auth
app.use(async (ctx, next) => {
  console.log(ctx.method);
  console.log(ctx.header);
  await next();
});

app.use(auth({ name: 'tj', pass: 'tobi' }));

// secret response

app.use(async function(ctx) {
  console.log('success');
  ctx.body = 'secret';
});

if (!module.parent) app.listen(3000);

/*
$ curl -H "Authorization: basic dGo6dG9iaQ==" http://localhost:3000/ -i
HTTP/1.1 200 OK
X-Powered-By: koa
Content-Type: text/plain; charset=utf-8
Content-Length: 6
Date: Sat, 30 Nov 2013 19:35:17 GMT
Connection: keep-alive

 */
