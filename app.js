var koa = require('koa');
var views = require('koa-views');
var jade = require('jade');
var router = require('koa-router');
var body = require('koa-body-parser');
var koaPg = require('koa-pg')
var fs = require('mz/fs');
var settings = require('./settings.js');

var app = koa();

app.use(require('koa-static')('static'));
app.use(body());
app.use(koaPg(settings.pg_connection));
app.use(views('views', {
  default: 'jade'
}));
app.use(router(app));
 
app.get('/show/:pdf', function *(next) {
  var column = yield this.pg.db.client.query_('SELECT id FROM pdfs WHERE name = $1', [this.params.pdf]);
  if(column.rowCount === 0) {
    var result = yield this.pg.db.client.query_('INSERT INTO pdfs (name) VALUES ($1)', [this.params.pdf]);
  } else {
  }
  yield this.render('show', {pdf: this.params.pdf});
});

app.get('/', function *(next) {
  var files = yield fs.readdir('static/files')
  yield this.render('list', {files: files})
})

app.post('/memo/:pdf', function *(next) {
  var text = this.request.body.text;
  //make id if not exist
  
  //make memo
  this.redirect('/show/' + this.params.pdf);
});

app.listen(3000);
