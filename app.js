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
} = require('./db')

const app = exports.app = new Koa();

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort()
handlers.map(handler => require('./handlers/' + handler).init(app))

const routes = fs.readdirSync(path.join(__dirname, 'routes')).sort()
routes.map(route => require('./routes/' + route).init(app))

const router = exports.router = new Router()

router.get('/', async(ctx) => {
  ctx.body = ctx.render('./templates/index.pug', {});
})

app.use(router.routes())