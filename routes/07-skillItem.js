const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {SkillItemModel} = require('../db');
const pick = require('lodash/pick');

router
  .param('skillItemById', async(id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.throw(404);
    }
    ctx.skillItemById = await SkillItemModel.findById(id);
    if (!ctx.skillItemById) {
      ctx.throw(404);
    }
    await next();
  })
  .post('/skill-item', async function(ctx, next){
    let skillItemFields = pick(ctx.req.body, SkillItemModel.publicFields);
    let skillItem = await SkillItemModel.create(skillItemFields);
    ctx.body = skillItem.toObject();
  })
  .put('/skill-item/:skillItemById', async function(ctx, next) {
    let skillItemFields = pick(ctx.req.body, SkillItemModel.publicFields);
    Object.assign(ctx.skillItemById, skillItemFields);
    await ctx.skillItemById.save();

    ctx.body = ctx.skillItemById.toObject()
  })
  .del('/skill-item/:skillItemById', async function(ctx, next) {
    await ctx.skillItemById.remove()
    ctx.body = 'ok'
  })
  .get('/skill-item/:skillItemById', async function(ctx, next) {
    ctx.body = ctx.skillItemById.toObject()
  })
  .get('/skill-item', async function(ctx, next) {
    let skillItems = await SkillItemModel.find({})

    ctx.body = skillItems.map(skillItem => skillItem.toObject())
  })

exports.init = app => app.use(router.routes())
