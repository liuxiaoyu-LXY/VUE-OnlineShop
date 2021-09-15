<template>
<div class='wrapper'>
    <ShopCart :items="cartList" :showother = "showother" :len="product_len" />
</div>
</template>
<script>
import ShopCart from '../../components/cartShop.vue'
import {useStore} from 'vuex'
import{ref} from 'vue';
import {useRoute} from 'vue-router';
import {computedHandler} from '../../utils/cartEffects.js'
export default {
    name:'Product',
    components:{ShopCart},
    setup(){
        const store = useStore();
        const Route = useRoute();
        const {product_len} = computedHandler()
        
        const showother = ref(product_len.value>2)
        // const shownormal = ref(product_len.value>2)
        // console.log(product_len.value,showother.value,'tete')
        
        const shopid = Route.params.id;
        const cartList = store.state.cartList[shopid];
        console.log(cartList,'pong')
        return {cartList,showother,product_len}
    }
}
</script>

<style lang='scss' scoped>
.wrapper{
    width: 100%;
    padding: 0 .18rem;
    box-sizing: border-box;
    margin-top: 0.12rem;
    
}</style>