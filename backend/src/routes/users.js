const router = require('koa-router')()
const generateToken = require('../middleware/generatetoken')
const {register,login} = require('../controller/user')
const Auth = require('../middleware/tokencheck')
router.prefix('/api/user')

router.get('/',new Auth().m, function (ctx, next) {
  console.log(ctx.auth)
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.post('/register',async function(ctx,next){
  const{username,password} = ctx.request.body
  
  try{
    const res = await register(username,password)
    ctx.body = {
      errno:0,
      data:res
    }

  }catch(err){
    console.log(err)
    ctx.body = {
      errno:-1,
      message:'xxx'
    }

  }

})
router.post('/login',async function(ctx,next){
  console.log(ctx.request.body,'odyss2232')
  const {username,password} = ctx.request.body
  console.log(username,password)
  const res = await login(username,password)
  
  if (res){
    
    const token = generateToken({username:username}, 1);
    
    // ctx.session.userInfo = {username,token}
    ctx.body = {
      errno:0,
      data:{username,token}
    }
    return
  }
  else{
    ctx.body={
      errno:-1,
      message:'xxx'
    }
  }



})



module.exports = router
