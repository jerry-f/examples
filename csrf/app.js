const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const router = require('koa-router')();

const app = module.exports = new Koa();

/**
 * csrf need session
 */

app.keys = ['session key', 'csrf example'];
app.use(session(app));
app.use(koaBody());

/**
 * maybe a bodyparser
 */

/**
 * csrf middleware
 */

app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));

/**
 * route
 */

router.get('/token', token)
  .post('/post', post);

app.use(router.routes());

async function token(ctx) {
  ctx.type = 'html';
  ctx.body = `<p>${ctx.headers.cookie}</p>
              <p>${ctx.method}</p>
              <form action="/post" method="POST">
                <input type="hidden" name="_csrf" value="${ctx.csrf}" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Register</button>
              </form>
              <h2>${ctx.csrf}</h2>`;
}

async function post(ctx) {
  ctx.body = {ok: true};
}

if (!module.parent) app.listen(3000);
