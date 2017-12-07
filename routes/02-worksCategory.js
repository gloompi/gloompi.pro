const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {WorkCategoriesModel} = require('../db');
const pick = require('lodash/pick');

router
  .param('categoryById', async(id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.throw(404);
    }
    ctx.categoryById = await WorkCategoriesModel.findById(id);
    if (!ctx.categoryById) {
      ctx.throw(404);
    }
    await next();
  })
  .post('/works-category', async function(ctx, next){
    let category = await WorkCategoriesModel.create({name: ctx.request.body.name});

    ctx.body = category.toObject();
  })
  .del('/works-category/:categoryById', async function(ctx, next) {
    await ctx.categoryById.remove()
    ctx.body = 'ok'
  })
  .get('/works-category/:categoryById', async function(ctx, next) {
    ctx.body = ctx.categoryById.toObject()
  })
  .get('/works-category', async function(ctx, next) {
    let works = await WorkCategoriesModel.find({})

    ctx.body = works.map(work => work.toObject())
  })

exports.init = app => app.use(router.routes())
