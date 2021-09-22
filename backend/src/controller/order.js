const Order = require('../models/order')
const Address = require('../models/address')
const Product = require('../models/product')
async function createorder(username,data){
    

    const address_get = await Address.findById(data.addressId)
    const {city,department,houseNumber,name,phone} = address_get
    let addressa = {city,department,houseNumber,name,phone}
    const pIds = data.products.map(p=>p._id)
    const productsList =await Product.find(
        {
            // shopId:data.shopId,
            _id:{
                $in:pIds
            }
        }
    )
    const productListwithSales = productsList.map(p=>{
        const id = p._id.toString()
        const filterproducts = data.products.filter(p=>p._id == id)
        if(filterproducts.length == 0){
            throw Error('No sale number')
        }
        const {shopId,name,imgUrl,sales,price,oldPrice,tabs} = p
        let pj = {shopId,name,imgUrl,sales,price,oldPrice,tabs}
        return {
            product:pj,
            orderSales:filterproducts[0].count
        }
    })
    const neworder = await Order.create({
        username,
        address:addressa,
        shopId : data.shopId,
        shopName :data.shopName,
        isCanceled :data.isCanceled,
        price:data.price,
        total:data.total,
        products:productListwithSales
    
    })
    return neworder


}
async function findorders(username){
    const res = Order.find({username}).sort({_id:1})
    return res
}
async function findorderone(id){
    const res = Order.findById(id)
    return res
}

module.exports = {
  createorder,findorders,findorderone
}