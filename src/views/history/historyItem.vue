<template>
<div class='top'>
    
  <p>
      <router-link to= '/history'>
      <span class='iconfont'>&#xe606;</span>
      </router-link>
      订单{{item.isCanceled?'已取消':'已完成'}}</p> 
</div>
<div class='container'>
    <div class='orderItem'>
           <!-- <router-link :to="'/orderhistory/'+item.shopId"> -->
        <div class='text'>
        <h3 class='title'>{{item.shopName}}<span class='iconfont next'>&#xe606;</span></h3>
        <!-- <span class='status'>{{item.isCanceled?'已取消':'已下单'}}</span> -->
        </div>
        <div class='time'>下单时间：{{item.time}}</div>
        <div class='box'>
        <template  v-for="(one,index) in item.products" :key="index" >
        <div class='productItem'>
        <img :src="one.product.img" v-if = "index<=3"/>
        <div class='proinfo'>
         <div class='producttitle'>{{one.product.name}}</div>
         <span class='productnum'>x {{one.orderSales}}</span>
         <span class='productprice'>&yen;{{one.product.price}}</span>
        </div>
        </div>
        </template>
        <div class='delivery'>配送费：&yen;{{item.delivery}}</div>
       <div class='sum'>
       <span class='sale'>已优惠<span class='num'>&yen;10</span></span>
       <span class='all'>合计:<span class='shuzi'>&yen;{{item.sumprice}}</span></span>
    </div>
</div> 
    </div>
        <div class='orderItem'>
<div class='addressbox'>
<p class='addtitle'>配送信息</p>
<div class='tableitem'>
    <span class='left'>期望时间</span>
    <span class='right'>立即配送</span>
    </div>
    <div class='tableitem'>
    <span class='left'>配送地址</span>
    <span class='right'>{{item.address.city+item.address.department+item.address.houseNumber}}</span>
    </div>
<div class='tableitem'>
    <span class='left'>联系电话</span>
    <span class='right'>{{item.address.phone}}</span>
    </div>
    <div class='tableitem'>
    <span class='left'>收货人</span>
    <span class='right'>{{item.address.name}}</span>
    </div>

</div>
</div>
</div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRoute} from 'vue-router'
import {get} from '../../utils/request.js'
export default {
    name:'HistoryItem',
    setup(){
        const route = useRoute();
        const shopid = route.params.id;
        let list = reactive({item:[]});
        const getinfo = async ()=>{
            try{
                const result = await get("https://www.jd/history",{id:shopid});
                if (result.errno === 0 && result.data){
                    for (let item of result.data){
                        if (item.shopId==shopid){
                        list.item = item;
                        break
                        }
                    }
                    
                }
                else{
                    console.log('get nothing!')
                } 
            } catch(e){
                console.log('error,', e)
            }
        }
        getinfo()
        
        const {item} = toRefs(list)
        console.log(item)
        return {item}
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
    padding-top: .26rem;
    font-size: .16rem;
    color: #333333;
    p{
        margin: 0;
        padding: 0;
        line-height: .22rem;
        position: relative;
        .iconfont{
            position: absolute;
            left: 0.18rem;
        }
    }
}
.container{
    position: absolute;
    top: 0.64rem;
    left: 0;
    right: 0;
    bottom: 0rem;
    background-color: #f3f3f3;
    .orderItem{
        // height: 1.4rem;
        width: 100%;
        margin:0 auto;
        border-radius: .04rem;
        margin-top: 0.16rem;
        font-size:.14rem;
        background-color: white;
        padding: 0.08rem 0.16rem;
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
            .next{
                display: inline-block;
                transform:rotate(180deg);
                font-size:.12rem;
                position:relative;
                top:-0.025rem;
                left:.06rem;
            }

        }
        .status{
            font-size: .14rem;
            color: #999999;

        }
        .box{
            padding-top: 0.16rem;
            width: 100%;
            border-top: .01rem solid rgba(215, 215, 215, 0.495);
            .productItem{
                width: 100%;
                display: flex;
                padding-top: 0.03rem;
                // flex:1;
                img{
                height: 0.6rem;
                width: 0.6rem;
                margin-right: 0.12rem;
                border-radius: .1rem;
                margin-bottom: 0.1rem;
            }
            .proinfo{
                flex:1;
                position:relative;
                // border-bottom: .01rem solid #999;
                .productnum {
                    position:absolute;
                    left: 0;
                    bottom: 0.1rem;
                    color:#555;
                    font-size:.12rem;

                }
                .productprice{
                    position: absolute;
                    right: 0.05rem;
                    top: 0.02rem;
                }

            }
            }
            .delivery{
                text-align: right;
                font-size:.13rem;
                color:#444;
                border-top:.01rem solid #eee;
                padding-top: 0.09rem;
            }
            .sum{
                text-align: right;
                margin-top: 0.2rem;
                
                .sale{
                    font-size:.13rem;
                    margin-right: 0.08rem;
                  
                    .num{
                        color:red;
                    }

                }
                .all{
                    
                    // top: 0.01rem;
        
                    .shuzi{
                        margin-left: 0.06rem;
                        font-weight: bold;
                        font-size:.14rem;
                    }

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
    .addressbox{
        width: 100%;
        .addtitle{
            font-size:.16rem;
            padding-bottom: 0.07rem;
            border-bottom: .01rem solid #ddd;
            position: relative;
            top:-.07rem;
           
            
        }
        .tableitem{
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.07rem;
            font-size:.13rem;
            .left{
                color:#777;
            }
        }

    }
}
</style>