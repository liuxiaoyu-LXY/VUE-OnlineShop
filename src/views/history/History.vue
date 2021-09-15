<template>
<div class='top'>
  <p>我的订单</p> 
</div>
<div class='container'>
 
    <div class='orderItem' v-for = "(item,indx) in data" :key="indx">
           <router-link :to="'/orderhistory/'+item.shopId">
        <div class='text'>
        <h3 class='title'>{{item.shopName}}</h3>
        <span class='status'>{{item.isCanceled?'已取消':'已下单'}}</span>
        
        </div>
        <div class='time'>下单时间：{{item.time}}</div>
        <div class='box'>

            <div class='imgbox'>
        <template  v-for="(one,index) in item.products" :key="index" >
        <img :src="one.product.img" v-if = "index<=3"/></template>
         
        </div>
        <div class='tast'>
        <p class='price'>&yen;{{item.sumprice}}</p>
        <p class='sum'>共{{item.sumall}}件</p>
        </div>
        </div>
        <!-- <div class='go'>进店逛逛</div> -->
</router-link>
    </div>
</div>
<Docker :num='2'/>
</template>

<script>
import Docker from '../../components/docker.vue'
import { get } from '../../utils/request.js';
import {reactive,toRefs} from 'vue';
const getOrderData = ()=>{
    let list = reactive({data:[]});
    const getinfo = async ()=>{
            try{
                const result = await get("https://www.jd/history");
                if (result.errno === 0 && result.data){
                    console.log(result.data,'----dsd')
            
                    list.data = result.data;
                    console.log(list.data,'dsds')
                }
                else{
                    console.log('get nothing!')
                } 
            } catch(e){
                console.log('error,', e)
            }
            
        }
        
        return {list,getinfo}


}  

export default {
    name:'History',
    components:{Docker},
    setup(){
        const {list,getinfo} = getOrderData();
        getinfo();
        let {data} = toRefs(list)
        console.log(data,'hehehe')
        // console.log(list)
        
        return {data}
    }
}
</script>

<style lang='scss' scoped>
a{
    text-decoration: none;
    color:#333;
}
.top{
    width: 100%;
    height: 0.54rem;
    box-sizing: border-box;
    background-color: white;
    text-align: center;
    padding-top: .17rem;
    font-size: .16rem;
    color: #333333;
    p{
        margin: 0;
        padding: 0;
        line-height: .22rem;
    }
}
.container{
    position: absolute;
    top: 0.54rem;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    background-color: #f3f3f3;
    .orderItem{
        height: 1.4rem;
        width: 3.39rem;
        margin:0 auto;
        border-radius: .04rem;
        margin-top: 0.16rem;
        font-size:.14rem;
        background-color: white;
        padding: 0.16rem;
        color: #333333;
        box-sizing: border-box;
        .text{
            width: 100%;
            display: flex;
            height: 0.22rem;
            align-items: center;
            justify-content: space-between;


        }
        .time{
            font-size:.12rem;
            color:#888;
            margin: .06rem 0;
        }
        .title{
            margin: 0;
            padding: 0;
            font-weight: normal;
            font-size: .16rem;

        }
        .status{
            font-size: .14rem;
            color: #999999;
            

        }
        .box{
            padding-top: 0.16rem;
            width: 100%;
            height: 0.4rem;
            display: flex;
            border-top: .01rem solid rgba(215, 215, 215, 0.495);
            .imgbox{
                flex:1;
                img{
                height: 0.4rem;
                width: 0.4rem;
                margin-right: 0.12rem;

            }
            }
            .tast{
                height: 0.4rem;
                p{
                    margin: 0;
                    padding: 0;
                }
                .price{
                    font-size: .14rem;
                    color: #E93B3B;
                    text-align: right;
                
                }
                .sum{
                    font-size: .12rem;
                    color: #333333;
                    line-height: .14rem;
                    margin-top: 0.04rem;
                    text-align: right;
                }
                
            }
            
        }

    }
}
</style>