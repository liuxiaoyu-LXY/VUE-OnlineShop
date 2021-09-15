<template>
<div class='outer'>

  <div class='wrapper' ref="scrollel">
    <Back :focus="backfocus"></Back>
    <Head @focus='handlefocus' @blur = 'handleblur' @hidehis = 'hidehis'
    @setnormal = 'setnormal'/>
    
    <Nearby />
    <transition>
     <div v-if = 'nobk' class='backTop' @click = '()=>{backtoTop(scrollel)}'>
       <span class='iconfont'>&#xe617;</span>
     </div>
    </transition>
  </div>
 <div class='searchbox' :class="{'active':backfocus}">
 <div class='searchhistory' v-if='hisnum>0 && showhis'>
   <p class='titlesearch'>搜索历史</p>
<div class='clear' @click='clearallhis'><span class='iconfont'>&#xe62d;</span>删除历史</div>
   <p class='historyItem' v-for="ite in history" :key="ite" @click='()=>{gobackHistory(ite)}'>
     <span class='iconfont'>&#xe60e;</span>{{ite}}<span class='iconfont del' @click='()=>{deleteItem(ite)}'>&#xe7e2;</span></p>


 </div>
    <Products v-if='showres' :search='searchcontent'></Products>
 </div>
  <Docker :num = "page"/>
  </div>
</template>

<script>
// sub components
import Docker from '../../components/docker.vue'
import Back from '../../components/back.vue'
import Head from './head.vue'
import Nearby from './nearby.vue'
import Products from '../../components/products.vue'
import axios from 'axios'

import {ref,onMounted,computed} from 'vue'
// import {get} from '../../utils/request.js'
import {useStore} from 'vuex';
function handleScrollTop (el,nobk){
  const bindEvent = ()=>{
      const a  = el.value
      a.addEventListener('scroll', ()=>{handleScroll(a)})
      a.addEventListener('touchmove', ()=>{
        // alert('ha')
        handleScroll(a)})
    }
  const handleScroll = (a)=>{
      
      let scrollTop = a.pageYOffset || a.scrollTop 
      // console.log(scrollTop)
      if (scrollTop > 0){
        nobk.value = true
      }
      else{
        nobk.value = false
      }
  };
  return {bindEvent}
}

export default {
  name: 'Home',
  components:{ Docker, Head, Nearby,Back,Products },
  setup(){
    // const testdata = ref(345);
    const U = '/test'
     axios.get(U)
      .then(function (response) {
        console.log(response,'sdsds')
      })
      .catch(function (error) {
        console.log(error,'axiostesterror')
      })
    const gobackHistory = (content)=>{
      searchcontent.value = content;
      // console.log(searchcontent.value)
      showhis.value = false
      showres.value = true
      // console.log(content,'content')
      // searchcontent.value = content.value
      
    }
    const showhis = ref(true)
    const showres = ref(false)
    let searchcontent = ref('');
    const store = useStore();
    const deleteItem = (id)=>{
      store.commit('delhisItem',id)
    }
    const backfocus = ref(false)
     const clearallhis=()=>{
      store.commit('clearhis')
    }
    const handleblur = ()=>{
      backfocus.value = false

    }
    const hidehis = (content)=>{
      showhis.value = false
      showres.value = true
      // console.log(content,'content')
      searchcontent.value = content.value
      // console.log(searchcontent,'sc')

    }
    const setnormal = ()=>{
       showhis.value = true
      showres.value = false
    }
    //  let history = reactive({item:{}})
    const handlefocus=()=>{
       backfocus.value = true
     
    }
   const history = computed(()=>{
     const cont = store.state.searchHistory
     return cont
   })
    const hisnum = computed(()=>{
      let num = 0
      const cont = store.state.searchHistory
      
      for(var i in cont){
       if(i)
        {num+=1}
      }
      
      return num
    })
    const page = 0;
    let nobk = ref(false);
    const scrollel = ref(null);
    const backtoTop = (a)=>{
    a.scrollTo({top:0,
            left:0,
        behavior:'smooth'})
  }

 
    onMounted(
      ()=>{
        const{bindEvent} = handleScrollTop(scrollel,nobk);
        bindEvent()
      }
    );
    return {gobackHistory,searchcontent,setnormal,showres,hidehis,showhis,clearallhis,hisnum,deleteItem,page,nobk,scrollel,backtoTop,handlefocus,handleblur,backfocus,history}
  },
 
}
</script>

<style lang="scss" scoped>
.test{
  color:red;
  width:200px;
  height:300px;
  position:absolute;
  top:50%;
  left:50%;
  z-index:9999;
}
.wrapper{
  width: 100%;
  position:absolute;
  top:0;
  bottom:.5rem;
  overflow: scroll;
  padding: 0 .18rem 0 .18rem;
  box-sizing: border-box;
  background-size: 100% .78rem;
  transition:background-color .3s;
  
}
.searchbox{
  width: 100%;
  position:absolute;
  bottom: 0;
  height: 0;
  background-color:white;
  z-index:9;
  .searchhistory{
    font-size:.16rem;
    padding: 0.05rem .18rem;
    position:relative;
    .titlesearch{
      font-size:.14rem;
      margin-bottom: .2rem;
      // display:inline-block;
   
    }
    .historyItem{
      margin:.1rem 0 0 0;
      color:#444;
      background:#efefef;
      padding: 0 .05rem;
      height:.3rem;
      font-size:.14rem;
      border-radius:.05rem;
      line-height:.3rem;
      position:relative;
      // background-color: red;
      .iconfont{
        font-size:.15rem;
        margin-right:.07rem;
      }
      .iconfont.del{
        position: absolute;
        right: 0;
        font-size:.12rem;
        color:#999;
      }
      
    }
    .clear{
      font-size:.12rem;
      color:#666;
      position:absolute;
      top:.2rem;
      right:0.18rem;
      text-align:right;
      display:inline-block;
      .iconfont{
        font-size:.12rem;
        margin-right:.02rem;
      }

    }
  }
  
}
.searchbox.active{
  height: 85%;
}
.v-enter-from, .v-leave-to{
  opacity:0
}
.v-enter-active, .v-leave-active{
  transition:opacity 2s ease-out
}
.v-enter-to, .v-leave-from{
  opacity:1
}

.backTop{
  position:fixed;
  width: 0.3em;
  height: 0.3rem;
  border-radius: .15rem;
  background-color:white;
  right: 0.3em;
  bottom: 0.7rem;
  transition:all .2s;
  
  .iconfont{
    display: block;
    color:#0c8cee;
    font-size:.3rem;
    position:relative;
    z-index:999;
    margin:0;
    padding:0;
  }
}
</style>
