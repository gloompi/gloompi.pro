const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {WorksModel} = require('../db');
const pick = require('lodash/pick');

router
  .param('workById', async(id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.throw(404);
    }
    ctx.workById = await WorksModel.findById(id);
    if (!ctx.workById) {
      ctx.throw(404);
    }
    await next();
  })
  .post('/works', async function(ctx, next){
    let workFields = pick(ctx.req.body, WorksModel.publicFields);
    if(ctx.req.files.img) workFields.img = ctx.req.files.img[0].path.slice(6);
    if(ctx.req.files.images) {
      workFields.images = [];
      for(let i=0; i < ctx.req.files.images.length; i++){
        workFields.images[i] = ctx.req.files.images[i].path.slice(6)
      };
    }
    let work = await WorksModel.create(workFields);
    ctx.body = work.toObject();
  })
  .put('/works/:workById', async function(ctx, next) {
    let workFields = pick(ctx.req.body, WorksModel.publicFields);
    if(ctx.req.files.img) workFields.img = ctx.req.files.img[0].path.slice(6);
    if(ctx.req.files.images) {
      workFields.images = [];
      for(let i=0; i < ctx.req.files.images.length; i++){
        workFields.images[i] = ctx.req.files.images[i].path.slice(6)
      };
    }
    Object.assign(ctx.workById, workFields);
    await ctx.workById.save();

    ctx.body = ctx.workById.toObject()
  })
  .del('/works/:workById', async function(ctx, next) {
    await ctx.workById.remove()
    ctx.body = 'ok'
  })
  .get('/works/:workById', async function(ctx, next) {
    ctx.body = ctx.workById.toObject()
  })
  .get('/works', async function(ctx, next) {
    let works = await WorksModel.find({})

    ctx.body = works.map(work => work.toObject())
  })
  .get('/works/page/:page', async function(ctx, next) {
    let works = await WorksModel.paginate({}, { page: ctx.params.page, limit: 2 });
    ctx.body = works;
  })

exports.init = app => app.use(router.routes())
