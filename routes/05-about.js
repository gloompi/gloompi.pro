const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const mongoose = require('../db/mongoose');
const {AboutModel} = require('../db');
const pick = require('lodash/pick');

router
  .put('/about', async function(ctx, next) {
    let aboutFields = pick(ctx.req.body, AboutModel.publicFields);
    if(ctx.req.files.img) aboutFields.coverImage = ctx.req.files.img[0].path.slice(6);
    let about = await AboutModel.findOne({});
    Object.assign(about, aboutFields);
    await about.save();

    ctx.body = about.toObject();
  })
  .get('/about', async function(ctx, next) {
    let about = await AboutModel.findOne({});
    
    ctx.body = about;
  })

exports.init = app => app.use(router.routes())
