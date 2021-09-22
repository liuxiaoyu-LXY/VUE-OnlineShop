const Users = require('../models/user')
async function register(username,password){
    const newUser =  await Users.create({
        username,
        password
    })
    return newUser
}
async function login(username,password){
    const user = await Users.findOne({
        username,
        password
    })
    if (user!=null){
        return true
    }
    return false
}
module.exports = {
    register,login
}