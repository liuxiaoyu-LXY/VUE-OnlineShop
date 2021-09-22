const mongoose = require('../db/db')
console.log('hi2')
const Schema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:String
},{timestamps:true})

const Users = mongoose.model('users',Schema)
module.exports = Users