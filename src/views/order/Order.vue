<template>
<div class='outer'>
<div class='mask' v-if = 'showfinal' @click = 'changeshow'>
    <div class='content' @click.stop>
        <p class='title'>确认要离开收银台？</p>
        <p class='instruct'>请尽快完成支付，否则将被取消</p>
        <div class='control'>
            <button class='cancel' @click='()=>{handleOrder(true)}'>取消订单</button>
            <button class='confirm' @click='()=>{handleOrder(false)}'>确认支付</button>
        </div>
    </div>

</div>

<OrderTop />
<Product />
<Bottom :changeshow = 'changeshow'/>
<Toast v-show = 'toastshow' :content='toastmsg'/>
</div>

</template>

<script>
import OrderTop from './top.vue';
import Product from './product.vue'
import Bottom from './bottom.vue'

import {post} from '../../utils/request.js'
import toast,{controlToast} from '../../components/toast.vue'


import {provide,ref} from 'vue'
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
import {computedHandler} from '../../utils/cartEffects.js'


const handleEffect = (shopid,shopname,products,setdata,clearall)=>{

    const router = useRouter();

    const handleOrder = async (isCanceled)=>{
        try{
            const result = await post('/api/order', {
            addressId:'1',
            shopId:shopid,
            shopName:shopname,
            isCanceled,
            products:products.value
            
        })
            if (result?.errno === 0){
                console.log(result)
                router.push({name:'History'})
                clearall(shopid)
            }
            else{
                const msg = '请求错误';
                setdata(msg)
            }
            } catch(e){
                const msg = `发送post错误:${e}`;     
                setdata(msg)
            }
        }
    return {handleOrder}
}
export default {
    name:'Order',
    components:{OrderTop,Product,Bottom,Toast:toast},
    setup(){
        const store = useStore();
        const showfinal = ref(false);
        const changeshow = ()=>{
            showfinal.value = !showfinal.value
        };
        

        const{shopid,products,shopname,clearall} = computedHandler();
        const handleshopId  = (id = shopid)=>{

            store.commit('handleShopInd',{orderShop:id})

        };
        handleshopId();
   
        const {toastshow,toastmsg,closeItem,setdata} = controlToast();
        provide('closeItem',closeItem)
        
        const {handleOrder} = handleEffect(shopid,shopname,products,setdata,clearall)
        
        return {handleOrder,toastshow,toastmsg,showfinal,changeshow,handleshopId}
    },
    methods:{
        // handleshopId(shopid){
        //     this.$store.commit('handleShopInd',{orderShop:shopid})

        // },
    
    },
    mounted(){
        // alert('hi')
        // this.handleshopId(this.shopid);
    }
}
</script>

<style lang='scss' scoped>
.outer{
    overflow-y: scroll;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#eee;
}
.mask{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    z-index:11;
    .content{
        background-color: white;
        width: 3.01rem;
        height: 1.57rem;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        border-radius: .04rem;
        .title{
            padding:.24rem 0 0 0;
            font-size: .18rem;
            color: #333333;
            line-height: 0.25rem;
            text-align: center;
            margin: 0;
        }
        .instruct{
            margin: 0;
            padding:.08rem 0 0 0;
            font-size: .14rem;
            color: #666666;
            line-height: 0.20rem;
            text-align: center;
        }
        .control{
            padding: .24rem 0 0 0;
            height: 0.34rem;
            font-size: .14rem;
            display: flex;
            justify-content: center;
            button{
                border: .01rem solid #4FB0F9;
                border-radius: .16rem;
                width: 0.8rem;
                padding: 0;
            }
            .cancel{
                margin-right: 0.12rem;
                color: #0091FF;
                background-color: white;

            }
            .confirm{
                margin-left: 0.12rem;
                background: #4FB0F9;
                color:white

            }
        }

    }
}

</style>