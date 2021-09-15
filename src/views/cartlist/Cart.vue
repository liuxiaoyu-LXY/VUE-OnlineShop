<template>
    <!-- <div class='test' @click='show'>23232</div> -->
    <div class='header'>我的全部购物车</div>
<div class='wrapper'>
    <template v-for = "(list,index) in cartList" :key = "index">
        <!-- <router-link :to="'/shop/'+index"> -->
        <ShopCart :ind = "index" @click=router.push(url(index))
        :items = 'cartList[index]' :showother = 'alllength[index]>2' :len="alllength[index]" v-if = "alllength[index]>0"/>
  <!-- </router-link> -->
    </template>
 

</div> 
<Docker :num="page" />
</template>

<script>
import {useStore} from 'vuex';
import Docker from '../../components/docker.vue'
import ShopCart from '../../components/cartShop.vue'
import {callength} from '../../utils/cartEffects.js'
import {useRouter} from 'vue-router'

export default {
    name:'Cart',
    components:{Docker,ShopCart},
    
    setup(){
        const url =(ind)=>{
            return '/shop/'+ind

        }
        const store = useStore();
        const router = useRouter();
        const {alllength} = callength();
        // console.log(alllength.value)
        const page = 1;
        const cartList = store.state.cartList;
        const show = ()=>{
           console.log('22test',cartList||{})
        };
        
        return {show,cartList,page,alllength,router,url}

    }
}

</script>
<style lang='scss' scoped>
.test{
    font-size:.12rem;
    position: absolute;
    top:0;
    left:0;
    background-color: pink;
}
.header{
    width: 100%;
    height: 0.54rem;
    box-sizing: border-box;
    padding-top:.21rem;
    font-size: .16rem;
    color: #333333;
    text-align: center;
    span{
        margin: 0 .05rem;
    }
}
.wrapper{
    width: 100%;
    position:absolute;
    top:.54rem;
    bottom: .50rem;
    background-color:#F5F5F5;
    overflow-y: scroll;
    font-size:0;
    box-sizing: border-box;
    padding:.16rem .18rem 0 .18rem;
}
//     .shopper{
//         width: 100%;
//         background-color: white;
//         border-radius: .02rem;
//         padding: 0.16rem;
//         box-sizing: border-box;
//         margin-bottom: .16rem;
//         &__title{
//             padding: 0 0 .16rem 0;
//             margin: 0;
//             font-size: .16rem;
//             color: #333333;
//             font-weight: normal;
//         }
//         .product{
//             width: 100%;
//             display: flex;
//             margin-bottom: .16rem;
//             height: 0.46rem;
//             font-size: .14rem;
//             color: #333333;
//             img{
//                 width: 0.46rem;
//                 height: 0.46rem;
//                 margin-right: 0.16rem;
//             }
//             &__content{
//                 flex:1;
//                 font-size:.13rem;
//                 &__title{
//                     margin: 0 0 .06rem 0;
//                     padding: 0;
//                     line-height: .2rem;
//                     height: 0.2rem;
//                 }
//                 &__money{
//                     display: flex;
//                     justify-content: space-between;
//                     .calmoney{
//                         color: #E93B3B;
//                     }
//                 }
//             }
//         }
//     }
    
// }
</style>