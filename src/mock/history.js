import Mock from 'mockjs'

function history (){
    const data = Mock.mock({
        errno:0,
        data:[
            { address: {city: "北京", department: "山水家园小区", 
                        houseNumber: "503户", name: "李丽", phone: "18611112222"},
            isCanceled: true,
            products: [ {orderSales: 5,
                        product:{
                                img: "http://www.dell-lee.com/imgs/vue3/tomato.png",
                                name: "番茄 250g / 份",
                                price: 33.6,
                                sales: 6,
                                }
                        },
                        {orderSales: 10,
                        product:{
                                img: "http://www.dell-lee.com/imgs/vue3/cherry.png",
                                name: "车厘子 500g / 份",
                                price: 33.6,
                                sales: 6,  
                                 }
                        }
                    ],
            shopId: "1",
            shopName: "沃尔玛",
            sumall: 15,
            sumprice: "504.00",
            time:'2021-11-04 12:25',
            delivery:5},

            { address: {city: "青岛", department: "九水东路38号", 
            houseNumber: "2401户", name: "张三", phone: "18611112222"},
            isCanceled: false,
            products: [ {orderSales: 1,
                        product:{
                                img: "http://www.dell-lee.com/imgs/vue3/crab.png",
                                name: "帝王蟹 250g / 份",
                                price: 199.6,
                                sales: 6,
                                }
                        },
            {orderSales: 2,
            product:{
                    img: "http://www.dell-lee.com/imgs/vue3/orange.png",
                    name: "橙子 500g / 份",
                    price: 5.6,
                    sales: 6,  
                     }
            },
            {orderSales: 5,
                product:{
                        img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0819%252F83db1387j00qy2idp000zc000hs00eac.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632880145&t=e71fdcaf2b9ba0a5bb7c9b125ff36087",
                        name: "鸡蛋 100g / 份",
                        price: 2.6,
                        sales: 6,  
                         }
                        }
                    ],
shopId: "2",
shopName: "山姆会员商店",
sumall: 4,
sumprice: "784.20",
time:'2021-09-04 17:25',
delivery:2},

            
        ]
    })
    return data
}
export {history}
// Mock.mock(RegExp("https://www.jd/searchhistory" + ".*"), 'get', searchhistory)