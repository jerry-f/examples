const Koa = require('koa');
const app = module.exports = new Koa();

// look ma, error propagation!

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    console.log('err:', err);
    ctx.status = err.status || 500;
    ctx.type = 'html';
    ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>';

    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});

// response

app.use(async function(ctx) {
  // ctx.throw(404, '有问题的404');
  // ctx.throw(400, 'name required');
  ctx.throw(401, 'access_denied', { user: 'jerry' });
  /*
  等价于：
    const err = new Error('name required');
    err.status = 400;
    err.expose = true;
    throw err;
   */
  // throw new Error('boom boom');
});

// error handler

app.on('error', function(err) {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    // console.log(err);
  }
});

if (!module.parent) app.listen(3000);
