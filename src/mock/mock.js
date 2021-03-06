import Mock from 'mockjs'
import {nearbyShopData,bannerData} from './shop.js'
import { addressList } from './address.js'
import {ProductList} from './products.js'
import {history} from './history.js'
const Random = Mock.Random
Mock.setup({
  timeout: '100' 
})
Mock.mock(RegExp("https://www.jd/history" + ".*"), 'get', history)
Mock.mock(RegExp("https://www.jd/jd2" + ".*"), 'get', nearbyShopData)
// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock('https://www.jd/jd3', 'get', bannerData)
Mock.mock('https://www.jd/address', 'get', addressList)
Mock.mock(RegExp("https://www.jd/products" + ".*"), 'get', ProductList)
Mock.mock('http://sss', 'get', () => {
  let citys = []
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: i+1,
      city: Random.city(),
      color: Random.color()
    }
    citys.push(obj)
  }
  return {cityList: citys}
})
// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://localhost:8081/test/cityInfo', 'post', (data) => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  const info= JSON.parse(data.body)
  return {
    img: Random.image('200x100', '#4A7BF7', info.name)
  }
})
// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://jd/address', 'post', (data) => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  const info= JSON.parse(data.body)
  // console.log(info)
  return {
    
      status:200,
      msg:'send okay!',
      content:info

    // img: Random.image('200x100', '#4A7BF7', info.name)
  }
})
Mock.mock('http://jd/login', 'post', (data) => {
  // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
  const info= JSON.parse(data.body)
  // console.log(info)
  return {
    
      status:200,
      msg:'send okay!',
      content:info

    // img: Random.image('200x100', '#4A7BF7', info.name)
  }
})

