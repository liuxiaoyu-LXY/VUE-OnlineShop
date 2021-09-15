<template>
        <div class='products'>
        <div class='products__item' v-for = "one in item" :key='one._id'>
                 <img :src="one.imgUrl"/>
            <div class='products__intro'>
                <h3 class='products__intro__title'>{{one.name}} <span class='weight'>{{one.weight}}</span></h3> 
                <p class='products__intro__sales'>月售{{one.sales}}件</p><span v-if='one.sale' class='limit'>{{(10*one.price/one.oldPrice).toFixed(2)}}折 限{{one.limit}}份</span>
                <span class='new' :class="{normal:!one.sale}">&yen;{{one.price}}</span>
                <span class='origin' v-if='one.sale'>&yen;{{one.oldPrice}}</span>
            </div>
        </div>        
    </div>
</template>

<script>
// import {useRoute} from 'vue-router';
import{reactive,toRefs,watchEffect} from 'vue';
import {get} from '../utils/request.js'
export default {
    name:'Products',
    props:['search'],
    setup(props){
   
       const {search} = toRefs(props);
 
    let data = reactive({item:{}})
    const getData = async function(){
        console.log('changeddd!!!',search.value)
            try{
               
            const result = await get("https://www.jd/products",{search:search.value});
     
            if (result.errno === 0 && result.data){
    
                data.item = result.data;

            }else{
                console.log('fail!')
            }
            }catch(e){
                console.log('error!',e)
            }
        };
        watchEffect(()=>{
        getData();
        });
        const {item} = toRefs(data)
   
        return {item,props}
}
    }

</script>
<style lang='scss' scoped>
@import '../style/_constants.scss';
@import '../style/mixins.scss';
.products{
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        // overflow-x:visible;
        overflow-y:scroll;
        padding:0 .25rem;
        color: $page-color;
        &__item{
            // margin:0 .16rem;
            overflow-x:visible;
            position:relative;
            border-bottom:.01rem solid #f3f3f3;
            width: 100%;
            display: flex;
            font-size:.12rem;
            img{
                width: 0.68rem;
                height: 0.68rem;
                margin: .12rem .16rem .12rem 0;
                position: relative;
            }
            .limit{
                font-size:.1rem;
                color:#E93B3B;
                display: inline-block;
                position:absolute;
                top: 50%;
                transform:translateY(-52%) scale(0.95);
                right: -.02rem;
                border:.01rem solid #E93B3B;
                padding: 0 .02rem;
                border-radius: .04rem;
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
                .new.normal{
                    color: #ff7700;
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
        }

    }
</style>