const Koa = require('koa');
const config = require('config');
const path = require('path');
const fs = require('fs');
const mongoose = require('./db/mongoose');
const Router = require('koa-router');
const pick = require('lodash/pick');

const {
  WorksModel, 
  WorkCategoriesModel, 
  ArticlesModel, 
  ArticleCategoriesModel, 
  AboutModel, 
  SkillsModel, 
  SkillItemModel
} = require('./db');

const app = exports.app = new Koa();

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();
handlers.map(handler => require('./handlers/' + handler).init(app));

const routes = fs.readdirSync(path.join(__dirname, 'routes')).sort();
routes.map(route => require('./routes/' + route).init(app));

const router = exports.router = new Router();

router.get('*/app.js', async(ctx) => {
  ctx.type = 'application/javascript'
  ctx.body = await fs.readFile(path.join(__dirname, 'public/app.js'));
});

router.get('/*', async(ctx) => {
  ctx.type = 'text/html'
  ctx.body = await fs.readFile(path.join(__dirname, 'public/index.html'));
});

app.use(router.routes());