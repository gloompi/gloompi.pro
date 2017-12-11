const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {ArticleCategoriesModel} = require('../db');
const pick = require('lodash/pick');

router
  .param('categoryById', async(id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.throw(404);
    }
    ctx.categoryById = await ArticleCategoriesModel.findById(id);
    if (!ctx.categoryById) {
      ctx.throw(404);
    }
    await next();
  })
  .post('/article-category', async function(ctx, next){
    let category = await ArticleCategoriesModel.create({name: ctx.request.body.name});

    ctx.body = category.toObject();
  })
  .del('/article-category/:categoryById', async function(ctx, next) {
    await ctx.categoryById.remove()
    ctx.body = 'ok'
  })
  .get('/article-category/:categoryById', async function(ctx, next) {
    ctx.body = ctx.categoryById.toObject()
  })
  .get('/article-category', async function(ctx, next) {
    let categories = await ArticleCategoriesModel.find({})

    ctx.body = categories.map(category => category.toObject())
  })

exports.init = app => app.use(router.routes())
