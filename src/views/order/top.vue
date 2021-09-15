<template>
        <div class='order__header'>
        <div class='title'>
            
            <!-- <router-link :to="{path:`/shop/${shopid}`}"> -->
            <span 
            @click = 'handleback'
            class='iconfont icon-back title__back'></span>
            <!-- </router-link> -->
            <span class='title__content'>确认订单</span>
        </div>
       <template v-for="items in addressli" :key="items._id">
        <template v-if = "items._id == idNum">
        <Addbox :item = "items" v-if = "items._id == idNum" @click = 'handleGoDetail'></Addbox>
        <!-- <div class='address'>
            <h3>收货地址</h3>
            <p>北京理工大学科技园2号楼1层</p>
            <span class='name'>李哲</span><span class='gender'>(先生)</span>
            <span class='tel'>13862779211</span>
            <span class='next iconfont'>&#xe606;</span>
        </div> -->
        </template>
        </template>

    </div>
</template>


<script>
import {useRouter,useRoute} from 'vue-router';
import Addbox from '../address/addBox.vue'
import {get} from '../../utils/request.js'
import {ref,computed} from 'vue'
import {useStore} from 'vuex';


export default {
    name:'OrderTop',
    components:{Addbox},
    setup(){
        const route = useRoute();
        const pageid = route.params.id;
        // console.log(pageid,'assidd')
        const store = useStore();
        const id = store.state.addressNum;
        let addressli = ref([]);
        const idNum = computed(()=>{
            
            const id = store.state.addressNum;
            // alert('here',store.state.addressNum)
            if (id>0){
                // alert('heres',id)
                return id
            }
            else{

                // alert('heresww',id)
                return 1}

        })
        const setdatali = async function(){
        try{
          // const result = await get('/api/shop/hot-list')
          const result = await get('https://www.jd/address')
        //    console.log(result.data)
          
          if (result?.errno === 0 && result.data.length){
            addressli.value = result.data
            // console.log(addressli.value[0])
          }
          else{console.log('e')}
        }catch(e){
          console.log('error,',e)
        }
      }
      setdatali();
      const item = computed(()=>{
          console.log('id',id)
          let item;
          for (let i of addressli.value){
              console.log(i)
              if (i._id == id){

                  
                  item = i
              }
          }
          console.log(item)
          return item
      })

    //   const item = addressli[id];
    //   console.log(addressli.value)
    //   for (let i in addressli){
    //       console.log(i)
    //   }
        const Router = useRouter();
        const handleGoDetail = ()=>{
           
            Router.push({name:'Address'})
        }
    
        // const id = ref(1);
        const handleback = ()=>{
            Router.back()

        }
        return {handleback,id,idNum,addressli,item,pageid,handleGoDetail}

    }
}
</script>
<style lang='scss' scoped>
a{
    text-decoration: none;
    color: #333333;
}
.order__header{
   
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-repeat: no-repeat;
    height: 1.96rem;
    
    font-size:.12rem;
    width: 100%;
    padding:0 .185rem;
    box-sizing: border-box;

    .title{
        padding:.41rem 0 0 0;
        color:white;
        font-size: .16rem;
        line-height: .22rem;
        text-align: center;
        position: relative;
        margin-bottom: 0.22rem;
        &__back{
            position: absolute;
            left: 0;
            font-size:.20rem;
            bottom: 0;
        }
    }
    a{
            text-decoration: none;
        }
    .address {
        
        width: 100%;
  
        border-radius: .04rem;
        background-color: white;
        box-sizing: border-box;
        padding: 0.16rem;
        position:relative;
        color: #333333;
        left: 0;
        h3{
            padding: 0;
            margin: 0;
            font-weight: normal;
            font-size:.16rem;
            margin-bottom: .14rem;
        }
        p{
            font-size:.14rem;
            height: 0.2rem;
            line-height: .2rem;
            margin-bottom: 0.06rem;
        }
        span{
            font-size: .12rem;
            color: #666666;
            height: 0.17rem;
            line-height: .17rem;
            margin-right: 0.06rem;
        }
        .next
        {
            transform:rotate(180deg) translateY(50%);
            display: inline-block;
           color:#666;
           font-size:.15rem;
           position:absolute;
           right:0.16rem;
           top:50%;
           margin: 0;
           
           
        }



    }


}</style>