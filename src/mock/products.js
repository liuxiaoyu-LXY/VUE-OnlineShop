import Mock from 'mockjs'

function ProductList(){
    const data = Mock.mock({
        errno:0,
        data:[{
            imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
            name: "番茄",
            weight:'250g/份',
            oldPrice: 3.6,
            price: 1.6,
            sales: 10,
            _id: "1",
            tab:'fruit',
            sale:true,
            limit:2,
            // disc:2.54
            
        },{
            imgUrl: "http://www.dell-lee.com/imgs/vue3/cherry.png",
            name: "车厘子",
            weight:'500g/份',
            oldPrice: 119.6,
            price: 99.6,
            sales: 10,
            _id: "2",
            tab:'fruit',
            sale:false,
            limit:2,
        },
        {
            imgUrl: "http://www.dell-lee.com/imgs/vue3/orange.png",
            name: "橙子",
            weight:'500g/份',
            oldPrice: 12.6,
            price: 5.6,
            sales: 110,
            id:"3",
            tab:'fruit',
            sale:false,
            limit:5,
        },{
            imgUrl: "http://www.dell-lee.com/imgs/vue3/crab.png",
            name: "帝王蟹",
            oldPrice: 299.9,
            weight:'250g/份',
            price: 199.9,
            sales: 10,
            _id: "4",
            tab:'food',
            sale:true,
            limit:2,
        },{
            imgUrl: "https://img0.baidu.com/it/u=2479153658,2981847674&fm=26&fmt=auto&gp=0.jpg",
            name: "水蜜桃",
            oldPrice: 25.9,
            weight:'300g/份',
            price: 19.9,
            sales: 12,
            _id: "5",
            tab:'fruit',
            sale:true,
            limit:3,

        },{
            imgUrl: "https://img2.baidu.com/it/u=3688294774,3362737247&fm=26&fmt=auto&gp=0.jpg",
            name: "苹果",
            oldPrice: 5.9,
            weight:'500g/份',
            price: 4.9,
            sales: 120,
            _id: "6",
            tab:'fruit',
            sale:true,
            limit:2,
        },
        {
            imgUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0819%252F83db1387j00qy2idp000zc000hs00eac.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632880145&t=e71fdcaf2b9ba0a5bb7c9b125ff36087",
            name: "鸡蛋",
            oldPrice: 3.9,
            weight:'100g/份',
            price: 1.9,
            sales: 120,
            _id: "6",
            tab:'food',
            sale:false,
            limit:2,
        },
        {
            imgUrl: "https://img2.baidu.com/it/u=3002263688,2633686600&fm=26&fmt=auto&gp=0.jpg",
            name: "肥牛",
            oldPrice: 55.9,
            weight:'500g/袋',
            price: 53.9,
            sales: 110,
            _id: "7",
            tab:'food',
            sale:false,
            limit:3,
        }]
    })

    return data

}

export {ProductList}