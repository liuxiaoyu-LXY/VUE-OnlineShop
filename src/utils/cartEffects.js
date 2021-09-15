import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import {computed} from 'vue';

export const callength = ()=>{
    const store = useStore()
    const cartList = store.state.cartList;
    const alllength = computed(()=>{
        let result = {}
        for (let id in cartList){
        let productlist = cartList[id].productList;
        let res = 0
        for (let i in productlist){
            if (productlist[i].count>0 && productlist[i].check){
                res+=1
            }
            // console.log(res)
        }
        result[id]=res
        }
        
    return result
    })
    return {alllength}
}

export const computedHandler = ()=>{
    const store = useStore();
    const Route = useRoute();
    const shopid = Route.params.id;
    const cartList = store.state.cartList;
    // console.log('ss',cartList)
    const shopname = store?.state?.cartList?.[shopid]?.shopName || '';


    const item = computed(()=>{
        let productlist = cartList[shopid].productList;
        // console.log('sdsds',productlist)
        return productlist

    })
    
    const products = computed(()=>{
        let productlist = cartList[shopid].productList;
        let res = []
        for (let i in productlist){
            if (productlist[i].count>0 && productlist[i].check){
                res.push(productlist[i])
            }
        }
        // console.log(res.length,'hihihi22')
        return res
       });
       const product_len = computed(()=>{
        let productlist = cartList[shopid].productList;
        let res = []
        for (let i in productlist){
            if (productlist[i].count>0 && productlist[i].check){
                res.push(productlist[i])
            }
        }
        
        return res.length
       })

       const total = computed(()=>{
           let productlist = cartList?.[shopid]?.productList;
           let count = 0;
        //    console.log(productlist)
           // if (productlist){
               for (let i in productlist){
                   let product = productlist[i];
                   count += product.count;
               
               // }
       }
       return count

       });

       const allchecked = computed(()=>{
           let productlist = cartList[shopid].productList;
           let res = true;
           
           // if (productlist){
               for (let i in productlist){
                   let product = productlist[i];
                   if(product.count>0 && !product.check){
                       res = false
                   }
               
               // }
       }
       return res

       });
      
           const price = computed(()=>{
           let productlist = cartList?.[shopid]?.productList;
           let count = 0;
           if (productlist){
               for (let i in productlist){
                   let product = productlist[i];
                   if (product.check){
                       count += product.count*product.price;
                   }
                   
               
               }
       }
       return count.toFixed(2)
       });
       
    //    const {addItemCart} = handleCart();
       const changecheck =  (shopid,productid)=>{
           store.commit('changecheck',{shopid,productid,})

       };
       const clearall = (shopid)=>{
           store.commit('clearall',{shopid})
       };
       const allcheck = (shopid)=>{
            store.commit('allcheck',{shopid})
       }
       
       return {product_len,shopname,products,total,price,item,changecheck,clearall,allchecked,allcheck,cartList,shopid}
}