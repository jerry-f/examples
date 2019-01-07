const path = require('path');
const views = require('koa-views');
const Koa = require('koa');
const app = (module.exports = new Koa());

// setup views, appending .ejs
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));
/*
views(root, opts)
root：您的观点所在的位置。必须是绝对的道路。所有渲染视图都与此路径相关
opts （可选的）
opts.extension：视图的默认扩展名
*/
// app.use(views(path.join(__dirname, '/views'), { map: { html: 'ejs' } }));
// 在此示例中，.html将以使用ejs模板引擎呈现以文件结尾的每个文件。

// dummy data

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// render

app.use(async function(ctx) {
  await ctx.render('user', { user });
});

if (!module.parent) app.listen(3000);
