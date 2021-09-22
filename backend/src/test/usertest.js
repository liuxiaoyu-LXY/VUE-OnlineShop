const Users = require('../models/user')

!(async()=>{
    //register
    // await Users.create({
    //     username:'lisis',
    //     password:'123'
    // })

    //login
    const zhangsan = await Users.findOne({
        username:'zhangsan',
        password:'123'
    })
    console.log(zhangsan)
})()