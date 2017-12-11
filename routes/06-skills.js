const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {SkillsModel} = require('../db');
const pick = require('lodash/pick');

router
  .param('skillById', async(id, ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.throw(404);
    }
    ctx.skillById = await SkillsModel.findById(id);
    if (!ctx.skillById) {
      ctx.throw(404);
    }
    await next();
  })
  .post('/skills', async function(ctx, next){
    let skillFields = pick(ctx.request.body, SkillsModel.publicFields);
    let skill = await SkillsModel.create(skillFields);
    ctx.body = skill.toObject();
  })
  .put('/skills/:skillById', async function(ctx, next) {
    let skillFields = pick(ctx.request.body, SkillsModel.publicFields);
    Object.assign(ctx.skillById, skillFields);
    await ctx.skillById.save();

    ctx.body = ctx.skillById.toObject()
  })
  .del('/skills/:skillById', async function(ctx, next) {
    await ctx.skillById.remove()
    ctx.body = 'ok'
  })
  .get('/skills/:skillById', async function(ctx, next) {
    ctx.body = ctx.skillById.toObject()
  })
  .get('/skills', async function(ctx, next) {
    let skills = await SkillsModel.find({})

    ctx.body = skills.map(skill => skill.toObject())
  })
  .get('/skills-populated', async function(ctx, next) {
    let skills = await SkillsModel.find({}).populate('children')

    ctx.body = skills.map(skill => skill.toObject())
  })

exports.init = app => app.use(router.routes())
