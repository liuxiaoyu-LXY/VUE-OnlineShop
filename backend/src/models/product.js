const mongoose = require('../db/db')
const Schema = mongoose.Schema({
    // shopId:{
    //     type:String,
    //     require:true
    // },
    name:String,
    imgUrl:String,
    sales:Number,
    weight:String,
    price:Number,
    oldPrice:Number,
    sales:Number,
    sale:Boolean,
    limit:Number,
    tab:String,
    tabs:[String]
},{timestamps:true})

const Product = mongoose.model('product',Schema)
module.exports = Product