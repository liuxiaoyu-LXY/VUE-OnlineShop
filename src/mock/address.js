import Mock from 'mockjs'

function addressList(){
    const data = Mock.mock({
        errno:0,
        data:[{
            name:'李丽',
            tel:15901276187,
            address:'青岛市市北区威海路 2号院 10号楼 清河公园一楼网点',
            _id:1,
            latlng:'22.12,112.2345'

        },{
            name:'张华',
            tel:18801276187,
            address:'北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 13层',
            _id:2,
            latlng:'22.1033,19.2'

        },
        {
            name:'张华',
            tel:18801276187,
            address:'北京市紫竹桥路3号 华泰花园B区 3号楼5单元1680室',
            _id:3,
            latlng:'33.9827,102.2233'

        }]
    })

    return data

}

export {addressList}