<template>
 <!-- :class="{'outwrap':true,'outnormal':shownormal}" -->
        <!-- <div class='shopper' v-for = "(item,index) in cartList" :key="index"> -->
        <div class='shopper'>
            <h3 class='shopper__title'>{{items.shopName}}</h3>
            <!-- <div class='outwrap '> -->
                <!-- <router-link :to="'/shop/'+ ind"> -->
                <!-- <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter"> -->
            <div class='outwrap' ref='boxmove'>
            <div ref='boxref'>
                <template v-for = "(one,ind) in items.productList" :key="ind">
                <div class='product' v-if = "one.count>0 && one.check">
                    <!-- <div class='product' v-if = "checkshow(one,item)"> -->
                    <img class='product__img' :src="one.imgUrl">
                    <div class='product__content'>
                        <p class='product__content__title'>{{one.name}}</p>
                        <p class='product__content__money'>
                        <span class='calmoney'>&yen; {{one.price}}  x  {{one.count}}</span>
                        <span class='allmoney'>&yen; {{(one.price*one.count).toFixed(2)}}</span>
                        </p>
                    </div>
                </div>
                </template>
                </div>
                
            </div>
                <!-- </transition> -->
                <!-- </router-link> -->
            <div class='down' v-if = 'showother' @click.stop = 'changenormal'>
                共计{{len}}件
                <span :class="{'iconfont':true,'icon-back':true,'iconfont--change':!shownormal}"></span>
            </div>
        </div>

</template> 
x
<script>
// import {ref} from 'vue'
// import {computedHandler} from '../../utils/cartEffects.js'
export default {
    name:'ShopCart',
    props:['items','showother','len','ind'],
    setup(){
        
        // let shownormal = ref(true);
        // const {alllength} = computedHandler();
        
        // return {shownormal}
    },
    data(){
        return {shownormal:true}

    },
    methods:{
        changenormal (){
            if(this.shownormal){
                // this.shownormal = !this.shownormal;
               this.$refs.boxmove.style.maxHeight = this.$refs.boxref.offsetHeight*0.01+0.4+'rem'
                this.$refs.boxmove.style.height = this.$refs.boxref.offsetHeight*0.01+0.4+'rem'
            }
            else{
                this.$refs.boxmove.style.maxHeight = '1.24rem';
                 this.$refs.boxmove.style.height = '1.24rem'
            }
            // alert('h')
            this.shownormal = !this.shownormal;
            // this.$refs.boxmove.offsetHeight
             console.log( this.$refs.boxref.offsetHeight)
        }
    }
}
</script>

<style lang='scss' scoped>
@keyframes getlong {
    0%{
        height: 1.24rem;
    }
    80%{
        height: 2.0rem;
    }
    
    100%{height: auto;}
}

    .move {
        animation:getlong .5s ease-in;
    }
    .shopper{
        width: 100%;
        background-color: white;
        border-radius: .02rem;
        padding: 0.16rem 0rem;
        box-sizing: border-box;
        margin-bottom: .16rem;
        position:relative;
        &__title{
            padding: 0 0 .1rem 0.16rem;
            margin: 0;
            font-size: .16rem;
            color: #333333;
            font-weight: normal;
        }
        .outwrap{
            padding:0.1rem .16rem 0 .16rem;
            box-sizing: border-box;
            width: 100%;
            // height: 1.24rem;
            // background-color:red;
            overflow: hidden;
            // max-height: 5rem;
            max-height: 1.24rem;
            transition:all 0.5s ease-in-out;


        }
    
        .product{
            width: 100%;
            display: flex;
            margin-bottom: .16rem;
            height: 0.46rem;
            font-size: .14rem;
            color: #333333;
            img{
                width: 0.46rem;
                height: 0.46rem;
                margin-right: 0.16rem;
            }
            &__content{
                flex:1;
                font-size:.13rem;
                &__title{
                    margin: 0 0 .06rem 0;
                    padding: 0;
                    line-height: .2rem;
                    height: 0.2rem;
                }
                &__money{
                    display: flex;
                    justify-content: space-between;
                    .calmoney{
                        color: #E93B3B;
                    }
                }
            }
        }
        .down{
            height: .28rem;
            width: 3.07rem;
            background: #F5F5F5;
            margin: 0 auto;
            font-size:.14rem;
            color: #999999;
            text-align: center;
            line-height: .28rem;
            .iconfont{
                display: inline-block;
                transform:rotate(-90deg);
                margin-left: 0.03rem;
                
            }
            .iconfont--change{
                transform:rotate(90deg) !important;

            }


            
            


        }
    }
    

</style>