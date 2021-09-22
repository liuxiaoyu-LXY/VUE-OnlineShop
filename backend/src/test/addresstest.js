const Address = require('../models/Address.js')

!(async()=>{
    const data=[{
        username:'lisis',
        name:'李丽',
        tel:15901276187,
        city:'青岛市',
        address:'青岛市市北区威海路 2号院 10号楼 清河公园一楼网点',
        houseNumber:'303',
        latlng:'22.12,112.2345',
        department:'清河公园一楼网点',

    },{ username:'lisis',
        name:'张华',
        tel:18801276187,
        city:'北京市',
        address:'北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 13层',
        houseNumber:'1303',
        latlng:'22.1033,19.2',
        department:'国防科技园2号楼',

    },
    { username:'lisis',
        name:'张华',
        tel:18801276187,
        city:'北京市',
        address:'北京市紫竹桥路3号 华泰花园B区 3号楼5单元1680室',
        houseNumber:'3号楼5单元1680室',
        department:'华泰花园B区',
        latlng:'33.9827,102.2233'

    }]
    //add address
    for (let key of data){
        await Address.create(key)
    }
    // await Address.create({
    //     name:{
    //         type:String,
    //         require:true,
    //     },
    //     city:String,
    //     address:String,
    //     department:String,
    //     houseNumber:String,
    //     latlng:String,

    // })

    //get address
    // const addressList = await Address.find({username:'lisis'}).sort({updatedAt:-1})
    // console.log(addressList)
    //get address by ID
    // let id = '6147da1c2349619dd99494f4'
    // const addressList = await Address.findById(id)
    // console.log(addressList)

    //upadate
    // const newd = {
    //     city:'北京w市',
    //     department:'xxx小w区',
    //     houseNumber:'5201',

    // }
    // const address = await Address.findOneAndUpdate(
    //     {_id:id,username:'lisis'},
    //     newd,
    //     {
    //         new:true ///返回最新数据
    //     }
    // )
})()