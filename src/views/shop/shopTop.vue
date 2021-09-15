<template>

<router-link :to="`/shop/${item._id}`">
        <div class='shop'>
      <div class='imgbox'>
      <span v-if = "item.sale" class='onsale'>促销</span>
      <img :src="item.imgUrl">
      </div>
      <div :class = "{'shop_content': true,'shop_content--border': border?true:false}">
        
        <p class='title'>{{item.name}}</p>
        <div class='peisong'>
          <span class='time'><span class='iconfont'>&#xe87a;</span>{{item.time}}</span>
          <span class='distance'>距您{{item.distance}}</span>
        </div>
        <div class='tags'>
           <p>已售{{item.sales}}</p>
          <span>最低起送{{item.expressLimit}}¥</span>
          <span :class="{'high':item.expressPrice == 0}">{{item.expressPrice == 0? '免配送费':'配送费'+item.expressPrice+'¥' }}</span>
         
        </div>
        <span class='shop_highlight'><span class='iconfont'>&#xe68c;</span>{{item.slogan}}</span>
      </div>
    </div>
</router-link>
</template>

<script>
// import {get} from '../../utils/request.js'
// import {useRoute} from 'vue-router'
// import {reactive,toRefs} from 'vue';
export default {
    name:'Topshop',
    props:['item','shopname'],
    setup(){
      

        // let data = reactive({item:{}})
        // let name = '';
      //   const setdatali = async function (){
      //       const route = useRoute()
            
      //   try{
      //     const result = await get('https://www.jd/jd2',
      //     )
      //     if (result?.errno === 0 && result.data.length){
              
      //        data.item = (result.data[route.params.id-1])
      //        name = result.data[route.params.id-1].name
      //        console.log('sdsdsds',name)
      //       //  console.log(data.item,'===')
      //     }
      //     else{console.log('e')}
      //   }catch(e){
      //     console.log('error,',e)
      //   }
      // }
      // setdatali()
      // const {item} = toRefs(data)
      // console.log('sdad',name)
      // const{name} = toRefs(item)
      // console.log('sdhuishdi',item.value)
      // emit('setshopName',name)

      // return {item}
    }

}

</script>

<style lang='scss'>

@import '../../style/constants';
@import '../../style/mixins.scss';
a{
  text-decoration: none;
  color:#333;
}
.shop{
    padding-top: .12rem;
    width: 100%;
    display: flex;
    font-size:.13rem;
    position:relative;
    .imgbox{
      position:relative;
      .onsale{
        font-size:.1rem;
        position:absolute;
        padding: 0 .015rem;
        top: 0;
        left: -0.02rem;
        // width: 0.rem;
        display: inline-block;
        height: 0.18rem;
        line-height: .18rem;
        background-color: rgb(250, 195, 16);
    
        border-radius: .01rem;
        margin-right: 0.04rem;
      }
    }
    img{
      width: 0.56rem;
      height: 0.56rem;
      margin-right: 0.16rem;
    }
    .shop_content{
      flex:1;
      
      &--border{
        border-bottom: 0.01rem solid $bg-color;
      }
      
      .title{
        margin: 0 0 .08rem 0;
        font-size:.16rem;
      }
      .peisong{
        position:absolute;
        right: 0.2rem;
        top: 0.13rem;
        display: flex;
        flex-direction: column;

        span{
          font-size:.1rem;
          margin-bottom: 0.04rem;
          text-align:right;
          
        }
        .time{
          background-color:rgb(250, 195, 16);
          padding:.01rem .02rem;
          transform:scale(0.9);
          transform-origin: right center;
          border-radius: .02rem;
          
        }
      }
      .tags{
        margin-bottom: 0.04rem;
        color:#747474;
        font-size:.12rem;
        
        span{
          margin-right: 0.16rem;
        }
        .high{
          color:#ff9900 !important;
        }
        p{
          margin: 0 0 .05rem 0;
          padding: 0;
        }
        span:last-child{
          margin-right: 0;
        }
      }
      .shop_highlight{
        display:inline-block;

        background-color: #eee3d7;
        color:#685d40;
        margin: 0.02rem 0 .08rem 0;
        padding:0rem .08rem .02rem .04rem;
        border-radius: .02rem;
        .iconfont{
          font-size:.15rem;
          padding: 0;
          margin: 0;
        }
        
      }
    }
  }

</style>