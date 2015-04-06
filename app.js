var koa = require('koa');
var views = require('koa-views');
var jade = require('jade');
var router = require('koa-router');

var app = koa();

app.use(require('koa-static')('static'));
app.use(views('views', {
  default: 'jade'
}));
app.use(router(app));
 
app.get('/', function *(next) {
  yield this.render('show', {});
});

app.listen(3000);
