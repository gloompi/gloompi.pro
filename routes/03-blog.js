const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {ArticlesModel} = require('../db');
const pick = require('lodash/pick');

router
  .param('articleById', async(id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.throw(404);
    }
    ctx.articleById = await ArticlesModel.findById(id);
    if (!ctx.articleById) {
      ctx.throw(404);
    }
    await next();
  })
  .post('/articles', async function(ctx, next){
    let articleFields = pick(ctx.req.body, ArticlesModel.publicFields);
    articleFields.coverImage = ctx.req.files.img[0].path.slice(6)
    let article = await ArticlesModel.create(articleFields)
    ctx.body = article.toObject();
  })
  .put('/articles/:articleById', async function(ctx, next) {
    let articleFields = pick(ctx.req.body, ArticlesModel.publicFields);
    if(ctx.req.files.img) articleFields.coverImage = ctx.req.files.img[0].path.slice(6);
    Object.assign(ctx.articleById, articleFields);
    await ctx.articleById.save();

    ctx.body = ctx.articleById.toObject();
  })
  .del('/articles/:articleById', async function(ctx, next) {
    await ctx.articleById.remove();
    ctx.body = 'ok';
  })
  .get('/articles/:articleById', async function(ctx, next) {
    ctx.body = ctx.articleById.toObject()
  })
  .get('/articles', async function(ctx, next) {
    let articles = await ArticlesModel.find({})

    ctx.body = articles.map(article => article.toObject())
  })

exports.init = app => app.use(router.routes())
