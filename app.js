var koa = require('koa');
var views = require('koa-views');
var jade = require('jade');
var router = require('koa-router');
var fs = require('mz/fs');

var app = koa();

app.use(require('koa-static')('static'));
app.use(views('views', {
  default: 'jade'
}));
app.use(router(app));
 
app.get('/show/:pdf', function *(next) {
  yield this.render('show', {pdf: this.params.pdf});
});

app.get('/', function *(next) {
  var files = yield fs.readdir('static/files')
  yield this.render('list', {files: files})
})

app.listen(3000);
