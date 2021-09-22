const router = require('koa-router')()
const {getshop,getshopInfo,getproducts} = require('../controller/shop.js')
const loginCheck = require('../middleware/logincheck')
router.prefix('/api/shop')

router.get('/',async function (ctx,next){
    const category = ctx.query.category || null
    const sortby = ctx.query.sortby || null
    const supporter = ctx.query.supporter || null
    const sale =  ctx.query.sale || null
    // console.log(sale,supporter)
    const shopList = await getshop(category,sortby,sale,supporter)
    ctx.body={
        errno:0,
        data:shopList
    }
})
router.get('/:id',async function(ctx,next){
    const id = ctx.params.id
    const shop = await getshopInfo(id)
    ctx.body={
        errno:0,
        data:shop
    }
})
router.get('/:id/products',async function(ctx,next){
    const shopId = ctx.params.shop
    const tab = ctx.query.tab || 'all'
    const res = await getproducts(shopId,tab)
    ctx.body={
        errno:0,
        data:res
    }

})

module.exports = router