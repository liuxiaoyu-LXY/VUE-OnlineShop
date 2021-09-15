<template>
    <div class='bottom'>
    <div class='left'>实付金额<span>&yen;{{price}}</span></div>
    <div class='right' @click = 'changeshow'>提交订单</div>
</div>
</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router';
import {computed} from 'vue';
const calprice = ()=>{
        const store = useStore();
        const Route = useRoute();
        const shopid = Route.params.id;
        const cartList = store.state.cartList;
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
        })
        return {price}
}

export default {
    name:'Bottom',
    props:['changeshow'],
    setup(){
        const {price}= calprice()
        return {price}
    }
}

</script>

<style lang='scss' scoped>
.bottom{
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.49rem;
    border-top:.01rem solid #f3f3f3;
    font-size:.14rem;
    background-color:white;
    display: flex;
    .left{
        flex:1;
        line-height: .49rem;
        box-sizing: border-box;
        padding-left: 0.24rem;
        color: #333333;
        span{
            font-size:.16rem;
            margin-left: 0.05rem;
            font-weight:600;
        }
    }
    .right{
        width: 0.98rem;
        background: #4FB0F9;
        color:white;
        display: flex;
        justify-content: center;
        align-items: center;

    }
}</style>