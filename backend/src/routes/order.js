const router = require('koa-router')()
const {createorder,findorders,findorderone} = require('../controller/order.js')
const Auth = require('../middleware/tokencheck')
const { find } = require('../models/address.js')
router.prefix('/api/order')
router.post('/',new Auth().m,async function(ctx,next){
    const userInfo = ctx.auth;
    const username = userInfo.username
    const data = ctx.request.body
    try{const res = await createorder(username,data)
        ctx.body={
            errno:0,
            data:res
        }}catch(err){
            console.log(err)
            ctx.body={
                errno:-1,
                message:'add failed'
            }
        }
    


})
router.get('/',new Auth().m,async function(ctx,next){
    const userInfo = ctx.auth;
    const username = userInfo.username;
    const res = await findorders(username);
    ctx.body={
        errno:0,
        data:res
    }
})
router.get('/:id',new Auth().m,async function(ctx,next){
    const userInfo = ctx.auth;
    const username = userInfo.username;
    const id = ctx.params.id;
    const res = await findorderone(id);
    ctx.body={
        errno:0,
        data:res
    }
})

module.exports = router