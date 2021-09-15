<template>
<div class='mask' v-if = 'cartshow&&total>0' @click = 'changeCartShow'></div>
<div class='cartbox' v-if = 'cartshow&&total>0'>
    <div class='products'>
        <div class='header' >
            <div class='all'>
                <span class='iconfont'
                v-html = "allchecked ? '&#xe70f;':'&#xe6f7;'"
                @click = '()=>{allcheck(pageid)}'></span>
                全选
            </div>
            <div class='clear' @click = '()=>{clearall(pageid)}'>清空购物车</div>
        </div>
        <template v-for = "one in item" :key='one._id'>
            
            <div class='products__item' v-if = 'one.count>0'>
                <span @click ="()=>{changecheck(pageid,one._id)}" class='check iconfont' v-html = "one.check? '&#xe70f;':'&#xe6f7;' "></span>
                <img :src="one.imgUrl"/>
                <div class='products__intro'>
                    <h3 class='products__intro__title'>{{one.name}}</h3> 
                    <span class='saletag' v-if='one.sale'
                    >{{(10*one.price/one.oldPrice).toFixed(2)}}折,限{{one.limit}}份</span>
                    <!-- <p class='products__intro__sales'>月售{{one.sales}}件</p> -->
                    <span class='weight'>约{{(parseInt(one.weight)*one.count).toFixed(0)}}g</span>
                    <span class='new'>&yen;{{itemprice(one.price,one.limit,one.count,one.sale,one.oldPrice)}}</span>
                     <span class='oldp' v-if='one.sale'
                     >&yen;{{(one.count*one.oldPrice).toFixed(2)}}</span>
                    <!-- <span class='origin'>&yen;{{one.oldPrice}}</span> -->
                </div>
                <div class='count'>
                    <div class='minus' @click = '()=>{addItemCart(pageid,one._id,one,-1)}'><span class='iconfont'>&#xe906;</span></div>
                    <!-- {{cartList?.[pageid]?.[one._id]?.count || 0}} -->
                   <span class='counttext'>{{one.count}}</span>
                    <div class='plus' @click = '()=>{addItemCart(pageid,one._id,one,1)}'><span class='iconfont'>&#xe734;</span></div>
                </div>
            </div>
            <Toast v-show = 'toastshow' :content='toastmsg'/>
        </template>
        
    </div>
</div>
    <div class='cart' >
        <div class='cart__icon' id='iconbox' ref=att :class="{move_in_cart:carton}">
            <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="cart__icon__img"
          
          @click = 'changeCartShow'/>
          <div class='count'>{{total}}</div>
        </div>
        <div class='cart__info'>总计: <span>&yen;{{price}}</span></div>
        <router-link :to = "{path:`/order/${pageid}`}">
        <span class='noup' v-if = "price<limit&&price>0">差&yen;{{(limit-price).toFixed(2)}}起送</span>
        <span class='noup' v-if = "price==0">&yen;{{limit}}起送</span>
        <div class='cart__btn' v-show="price>=limit">去结算</div>  
        </router-link>  
    </div>
</template>

<script>

import {ref,onMounted,provide} from 'vue';
import toast from '../../components/toast.vue'
import {handleCart} from './commonHandlers.js'
import {computedHandler} from '../../utils/cartEffects.js'
const carthandlers=()=>{
    let cartshow = ref(false);
    const changeCartShow = ()=>{
            cartshow.value = !cartshow.value;
        }
        
    const {addItemCart,toastshow,toastmsg,closeItem} = handleCart();
    provide('closeItem',closeItem)
    return {addItemCart,changeCartShow,cartshow,toastshow,toastmsg,closeItem}

}
export default {
    name:'Cart',
    props:['carton','limit'],
    components:{Toast:toast},
    setup(props,{emit}){
        const endadd = ref(true);
        const att = ref(null)
        

        const {total,price,item,changecheck,clearall,allchecked,allcheck,shopid} = computedHandler()
        
        const pageid = shopid;
        const {addItemCart,changeCartShow,cartshow} = carthandlers()

        const itemprice = (price,limit,count,sale,oldPrice)=>{
        
                if (sale && count>limit){
                    return (limit*price+(count-limit)*oldPrice).toFixed(2)
                }
               
                else{return count*price.toFixed(2)}
            
        }
        
        onMounted(()=>{
            
            att.value.addEventListener('animationend',()=>{
        
                emit('changecarton')
            })
        })
        
       return {itemprice,att,endadd,total,price,item,addItemCart,pageid,changecheck,clearall,allchecked,allcheck,cartshow,changeCartShow}
       
    },

}
</script>

<style lang='scss' scoped>
@import '../../style/_constants.scss';
@import '../../style/mixins.scss';
@keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
@-moz-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
@-webkit-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
@-o-keyframes mymove{
       0%   { transform: scale(1) }
       25%  { transform: scale(.8) }
       50%  { transform: scale(1.1) }
       75%  { transform: scale(.9) }
       100% { transform: scale(1) }
    }
.move_in_cart{
        animation: mymove .5s ease-in-out;
            }
.mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    z-index:999;
}
.cartbox{
    position:absolute;
    z-index:11;
    bottom: 0.5rem;
    background-color: white;
    width: 100%;
    z-index:9999;
    left: 0;
        .products{
        // flex:1;
        height: 100%;
        overflow-y:scroll;
        padding:0 .16rem;
        color: $page-color;
        .header{
            width: 100%;
            height: 0.52rem;
            font-size: .14rem;
            color: #333333;
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: .01rem solid #f3f3f3;
            
            .all{
                line-height: .2rem;
                height: 0.2rem;
                vertical-align: middle;
                .iconfont{
                height: 0.2rem;
                color:#0091FF;
                font-size:.19rem;
                line-height: .2rem;
                vertical-align: middle;
                margin-right: 0.05rem;
            }

            }
            
        }
        &__item{
            // margin:0 .16rem;
            position:relative;
            // border-bottom:.01rem solid #f3f3f3;
            width: 100%;
            display: flex;
            height: 0.7rem;
            font-size:.12rem;
            .check{
                margin-right: 0.16rem;
                display: flex;
                text-align: center;
                width: 0.22rem;
                height: 0.7rem;
                line-height: .7rem;
                font-size:.19rem;
                color:#0091FF; 
            }
        
            
            img{
                width: 0.46rem;
                height: 0.46rem;
                margin: .12rem .16rem .12rem 0;
            }
            .products__intro{
                overflow-x: hidden;
                h3{
                @include ellipsis;
                margin: .12rem 0 0 0;
                padding: 0;
                width: 100%;
                font-size: .14rem;
                font-weight: normal;
                line-height: .2rem;
                
                }
                .saletag{
                    // display: none;
                    position: absolute;
                    left: 45%;
                    top: .15rem;
                    font-size:.1rem;
                    border-radius: .02rem;
                    border:none;
                    color:white;
                    padding: 0.02em;
                    display: inline-block;
                    background-color: rgb(226, 59, 30);

                }
                p{
                    margin: .06rem 0;
                    line-height: .16rem;
                }
                .new{
                    font-size: .14rem;
                    color: #E93B3B;
                    line-height: .20rem;
                    margin-right: 0.12rem;
                }
                .oldp{
                    text-decoration: line-through;
                    color:#777;
                }
                .weight{
                    display:block;
                    font-size:.1rem;
                    margin: 0.02rem 0;
                    position:relative;
                    left:-0.02rem;
                    color:#999;
                    transform:scale(0.9);
                }
                .origin{
                    display: inline-block;
                    transform-origin: left top;
                    position:relative;
                    top:.07rem;
                    text-decoration: line-through;
                    font-size: .2rem;
                    transform:scale(0.5);
                    color: #999999;
                    line-height: .20rem;
                }
            }
            .count{
                position:absolute;
                bottom: .12rem;
                right: 0;
                width: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size:.12rem;
                height: 0.22rem;
                // padding: 0 .07rem;
                .counttext{
                        font-size:.14rem;
                        line-height: 0.22rem;
                        height: 0.22rem;
                        position: relative;
                        top:.02rem;
                    }
                .minus, .plus{
                    width: 0.22rem;
                    height: 0.22rem;
                    border-radius: .22rem;
                    font-size:.22rem;
                    // display: flex;
                    // align-items: center;
                    
                    text-align: center;
                    // justify-content: center;
                    .iconfont{
                        
                    }
                    
                }
                .minus{
                    span{
                        color:#333;
                        font-size:.22rem;
                    }
                    // margin-right: 0.1rem;
                //     border:.01rem solid #666666;
                // }}}
                }
                .plus{
                    span{
                        color:#0091FF;
                        font-size:.2rem;
                    }
                    // margin-left: 0.1rem;
                    // background-color: #0091FF;
                    // border:.01rem solid #0091FF;
                    // color:white;
                }
            }
        }

    }
  
}
.cart{
    position:absolute;
    z-index:999999;
    // bottom: 0;
    border-top:.01rem solid rgb(237, 233, 233);
    background-color: white;
    z-index:999999;
    width: 100%;
    height: .49rem;
    display: flex;
    font-size: .12rem;
    a{
        text-decoration: none;
    }
    &__icon{
        width: 0.70rem;
        height: .70rem;
        bottom: 0.3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content:center;
        position: relative;
        margin-right: 0.15rem;
        left: 0.1rem;
        background-color: rgb(191, 227, 247);
        border: .04rem solid #f3f3f3;
        z-index:9999;
        img{
            width: 0.4rem;
            height: 0.4rem;
        }
        .count{
            background-color: #E93B3B;
            // width: 0.2rem;
            height: 0.2rem;
            padding:0 .06rem;
            border-radius: .1rem;
            color:white;
            font-size: .2rem;
            text-align: center;
            line-height: .2rem;
            transform:scale(0.5);
            transform-origin:left center;
            position:absolute;
            top: 0.01rem;
            left: 0.44rem;


        }
    }
    &__btn{
        display: flex;
        align-items: center;
        justify-content:center;
        width: 0.98rem;
        height: .5rem;
        font-size: .14rem;
        color: #FFFFFF;
        background: #4FB0F9;
        position: relative;
        top:-0.01rem;
        
    }
    .noup{
        color:#666;
        font-size:.15rem;
        margin-right: 0.18rem;
        height: 0.5rem;
        line-height: .5rem;
    }
    &__info{
        display: flex;
        align-items: center;
        justify-content:start;
        flex:1;
        font-size: .12rem;
        color: #333333;
        span{
            margin-left: 0.05rem;
            font-size: .18rem;
            color: #E93B3B;
        }
    }
}

</style>
