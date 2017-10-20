if (process.env.TRACE) {
  require('./libs/trace');
}

let Koa = require('koa');
const app = new Koa();
const config = require('config');
const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.forEach(handler => require('./handlers/' + handler).init(app));

app.use(async ctx => {
  ctx.body = fs.readFile(__dirname + '/public')
});

app.listen(config.get('port'));
