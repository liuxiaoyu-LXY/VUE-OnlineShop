<template>
   <Top :path = 'path' :back='back' >
       <template v-slot:title>管理收货地址</template>
       
       <template v-slot:right>
         <router-link to='/address/add'>
            <!-- <span class='right' @click = '()=>{handleGo(back)}'> -->
        <span class='right'>新建</span>
         </router-link>
       </template>
      
   </Top>
    <div class='wrapper'>
      
        
        <p class='subtitle'>我的收货地址</p>
        <div class='outer'  v-for = "item in addressli" :key=item._id :class="{'outerline':item._id == xuhao}">

        <Addbox :item = "item" @click = '()=>{changeAddNum(item._id)}'></Addbox>
        </div>


    </div>
</template>

<script>
import Top from './commonTop.vue'
import Addbox from './addBox.vue'
import {get} from '../../utils/request.js'
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
// import{useRoute} from 'vue-router'

export default {
  
    name:'Address',
    components:{Top,Addbox},
    setup(){
      const store = useStore();
      // const name = 'Order';
     
      const back ='/address/add'
      // alert(back)
      const path = '/address/add'
      // const param = {'id':route.params.id};
      const xuhao = computed(()=>{
        const storeid = store.state.addressNum

        return storeid
      })
      
      // let outerline = ref(false)
      // const store = useStore()
      const storeid = store.state.addressNum
      
      const changeAddNum = (num)=>{
        
        store.commit('changeAdd',{num})

      }

        let addressli = ref([]);
      const setdatali = async function(){
        try{
          // alert('faqingqii')
          // const result = await get('/api/shop/hot-list')
          const result = await get('https://www.jd/address')
        //    console.log(result.data)
          
          if (result?.errno === 0 && result.data.length){
            addressli.value = result.data
            // console.log(addressli.value)
          }
          else{console.log('e')}
        }catch(e){
          console.log('error,',e)
        }
      }
      setdatali();
      return {addressli,changeAddNum,storeid,xuhao,path,back}
    },
    // watch:{
    //   '$route'(to,from,next){
    //     if (to.path)
    //     console.log('to',to,'from',from,next)
    //     alert('change',to,from)
    //   }
    // }
}
</script>

<style lang='scss' scoped>
a{
  margin: 0;
  padding: 0;
  color:#333333;
  text-decoration: none;
}
.wrapper{
    position:absolute;
    top: 0.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#f3f3f3;
    padding: .16rem .18rem .16rem .18rem;
    .outer{
      width: 100%;
      height: 1.04rem;
      margin-bottom: .16rem;
    }
    .outerline{
      // background-color:red;
       border-radius: .04rem;
      // border:.02rem solid #36a0f1bb;
      box-shadow: 0 0 .04rem #1689e1dd
      
    }

}
.subtitle{
    font-size: .14rem;
    color: #333333; 
    margin: 0 0 .12rem 0;
}







</style>