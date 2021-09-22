const Order = require('../models/order.js')
const Address = require('../models/Address.js')
const Product = require('../models/Product.js')
!(async ()=>{
    const requestBody = {
    addressId:'6147da1c2349619dd99494f4',
    shopId:'6147e15476ea22ee660e6885',
    shopName:'沃尔玛',
    isCanceled:false,
    products:[{
        id:'6147e1f432b63b9e57606e15',
        num:2
    }]
    }
    //获取address
    const address_get = await Address.findById(requestBody.addressId)
    const pIds = requestBody.products.map(p=>p.id)
    const productsList =await Product.find(
        {
            shopId:requestBody.shopId,
            _id:{
                $in:pIds
            }
        }
    )
const productListwithSales = productsList.map(p=>{
    const id = p._id.toString()
    const filterproducts = requestBody.products.filter(p=>p.id == id)
    if(filterproducts.length == 0){
        throw Error('No sale number')
    }
    const {shopId,
    name,
    imgUrl,
    sales,
    price,
    oldPrice,
    tabs} = p
    let pj = {shopId,
        name,
        imgUrl,
        sales,
        price,
        oldPrice,
        tabs} 
        console.log(pj)
        console.log(p)
    return {
        product:pj,
        orderSales:filterproducts[0].num
    }
})
console.log( productListwithSales)
let a = {username:'lisis',
city:'北京市',
department:'xxx小区',
houseNumber:'501',
name:'lissis',
phone:'13388881111'}


const {
    username,
    city,
    department,
    houseNumber,
    name,
    phone,
} = address_get
let pbj = {
    username,
    city,
    department,
    houseNumber,
    name,
    phone,
}

await Order.create({
    username:'lisis',
    address:pbj,
    shopId : requestBody.shopId,
    shopName :requestBody.shopName,
    isCanceled :requestBody.isCanceled,
    products:productListwithSales

})
// const list = await Order.find({username:'lisis'})
// console.log(list[1].products[0].product.name)

})()