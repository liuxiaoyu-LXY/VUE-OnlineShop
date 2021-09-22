const mongoose = require('../db/db')
const Schema = mongoose.Schema({
    name:String,
    imgUrl:String,
    sales:Number,
    expressLimit:{
        type:Number,
        default:0
    },
    expressPrice:Number,
    slogan:String,
    sale:{
        type:Boolean,
        default:false
    },
    category:Number,
    distance:Number,
    time:Number,
    inRange:Boolean,
},{timestamps:true})

const Shop = mongoose.model('shop',Schema)
module.exports = Shop