const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
//测试session，用来记录访问次数
router.get('/session',async (ctx,next)=>{
  if(ctx.session.viewcount == null){
    ctx.session.viewcount = 0
  }
  ctx.session.viewcount++;
  ctx.body = {
   viewcount: ctx.session.viewcount
  }

})
module.exports = router
