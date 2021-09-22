const router = require('koa-router')()
const {create,findall,findById,changeaddress} = require('../controller/address')

const Auth = require('../middleware/tokencheck')
router.prefix('/api/address')

router.post('/', new Auth().m,async function (ctx, next) {
  const data = ctx.request.body
  const userInfo = ctx.auth
  try{
      const addressNew = await create(username = userInfo.username,data)
      ctx.body={
          errno:0,
          data:addressNew,
      }
  }catch(err){
      console.log(err)
      ctx.body = {
          errno:-1,
          message:'xxx'
      }
  }

})
router.get('/',new Auth().m,async function(ctx,next){
    const userInfo =  ctx.auth
    const username = userInfo.username
    const res = await findall(username)
    ctx.body = {
        data:res,
        errno:0
    }

})
router.get('/one',new Auth().m,async function(ctx,next){
    const userInfo =  ctx.auth
    const username = userInfo.username
    const latlng = ctx.params.latlng
    const res = await findall(username)
    ctx.body = {
        data:res,
        errno:0
    }

})

router.get('/:id',new Auth().m,async function(ctx,next){
    const id = ctx.params.id
    const res = await findById(id)
    ctx.body = {
        data:res,
        errno:0
    }

})
router.patch('/:id',new Auth().m,async function(ctx,next){
    const userInfo = ctx.auth
    const username = userInfo.username
    const data = ctx.request.body
    const id = ctx.params.id
    const res = await changeaddress(id,username,data)
    ctx.body = {
        errno:0,
        data:res
    }

})
module.exports = router
