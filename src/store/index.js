import { createStore } from 'vuex'
const setLocalStorage = function(cartList,attr='cartList'){
  const cartJSON = JSON.stringify(cartList);
  // console.log(cartJSON);
  localStorage[attr] = cartJSON;

}
const getLocalStorage = function(content='cartList'){
  try{
    return JSON.parse(localStorage[content]) || {}
  }catch{
    return {}
  }

}

export default createStore({
  state: {
    cartList:getLocalStorage(),
    address:'',
    addressNum:1,
    orderShop:'',
    searchHistory:getLocalStorage('history'),

    
      // shopId:{
      //   shopName:'',
      //   productList:{
      //     productId:{
      //       _id:,
      //       name:
      //       count:
      //     }
      //   },
      //  price:
      // }

      // history:{
      //   id:{text:xxx}
      // }
  },
  mutations: {
    addHistory(state,text){

      state.searchHistory[text] = text;
      setLocalStorage(state.searchHistory,'history')

    },
    delhisItem(state,key){
      const content = state.searchHistory;
      delete content[key]
      // content.delete(key)
      console.log(content)
      state.searchHistory = content;
      setLocalStorage(state.searchHistory,'history')
    },
    clearhis(state){
      state.searchHistory = {};
      setLocalStorage(state.searchHistory,'history')
    },
    handleShopInd(state,payload){
      const {orderShop} = payload;
      state.orderShop = orderShop;
      console.log('addok!',state.orderShop)

    },
    changeAdd(state,payload){
      
      const{num} = payload;
      state.addressNum = num;
      console.log(state.addressNum,'change address ID')
    },
    addresswrite(state,payload){
      const{addr} = payload;
      state.address= addr;
      console.log(state.address,'change address content')

    },
    
    addItem(state,payload){
      const {shopid,productid,productinfo,num,shopname} = payload;

      let shop = state.cartList[shopid];
      if (!shop){
      shop = {shopName:shopname,productList:{}}
      }
      let product = shop.productList[productid];
      if(!product){
        product = productinfo;
        product.count = 0
        product.check=false;
      }
      product.count+=num
      if (num>0){
        product.check = true;
        // console.log(product.check,'ss')
      }
      if (product.count<0){product.count=0}
      shop.productList[productid] = product;
      state.cartList[shopid] = shop;
      setLocalStorage(state.cartList);
      
    
    },
    changecheck(state,payload){
      const {shopid,productid} = payload;
      let shop = state.cartList[shopid].productList;
      let product = shop[productid];
      product.check = !product.check;
      setLocalStorage(state.cartList);

      // console.log(shopid,productid,'here');

    },
    clearall(state,payload){
      const {shopid} = payload;
      state.cartList[shopid].productList = {};
      setLocalStorage(state.cartList);
      

    },
    allcheck(state,payload){
      const {shopid} = payload;
      let shop = state.cartList[shopid].productList;
      if (shop){
        for (let i in shop){
          if (shop[i].count>0){
            shop[i].check = true
          }
        }
      }
      setLocalStorage(state.cartList);

    }
  },
  actions: {
  },
  modules: {
  }
})
