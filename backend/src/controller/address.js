const Address = require('../models/address')

async function create(username,data){
    const address =  await Address.create({
        username,...data
    })
    return address
}
async function findall(username){
    const addressList = await Address.find({username}).sort({updatedAt:-1})
    return addressList
}
async function findById(id){
    const addressList = await Address.findById(id)
    return addressList

}
async function changeaddress(id,username,data){
    const address = await Address.findOneAndUpdate(
        {_id:id,username},
        data,
        {
            new:true ///返回最新数据
        }
    )
    return address
}
module.exports = {
    create,findall,findById,changeaddress
}