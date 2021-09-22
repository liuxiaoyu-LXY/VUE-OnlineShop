const Shop = require('../models/shop')
const Product = require('../models/product')

async function getshop(category,sortby,sale,supporter){
    let sort = '_id'
    if (sortby == 2){
        sort = 'distance'
    }
    let findobj = {}
    if (category!==null){
        findobj.category = category
    }
    if(sale == true){
        findobj.sale = sale
    }
    if (supporter){
        supporter = JSON.parse(supporter)
        console.log(supporter)
        
        for (let key in supporter){
            console.log(key)
            if (key == "0"){
                findobj.inRange = true
            }
            else if (key=="1"){
                findobj.expressPrice = 0

            }
            else if (key=="2"){
                findobj.expressLimit = 0

            }
        }
      
    }
    const res = await Shop.find(findobj).sort({[sort]:1})
    console.log(res)
    return res
    // if (category == null){
    //     if (sortby == 2){
    //         let sort = 'distance'
    //         const res = await Shop.find().sort({[sort]:1})
    //         return res
    //     }
    //     else{
    //         const res = await Shop.find().sort({_id:1})
    //         return res
    //     }
        
        
    // }
    // else{
    //     if (sortby == 2){
    //         let sort = 'distance'
    //         const res = await Shop.find({category}).sort({[sort]:1})
    //         return res
    //     }
    //     else{
    //     const res = await Shop.find({category}).sort({_id:1})
    //     return res
    //     }
    // }
    

}

async function getshopInfo(id){
    const res = await Shop.findById(id)
    return res

}
async function getproducts(shopId,tab='all'){
    // const list = await Product.find({
    //     shopId,
    //     tabs:{
    //         $in:tab
    //     }
    // })
    let list;
    if (tab == 'all'){
        list = await Product.find().sort({_id:1})
    }
    else if (tab == 'seckill'){
        list = await Product.find({sale:true}).sort({_id:1})
    }
    else{
        list = await Product.find({tab}).sort({_id:1})
    }
   
    return list
}
module.exports = {getshop,getshopInfo,getproducts}