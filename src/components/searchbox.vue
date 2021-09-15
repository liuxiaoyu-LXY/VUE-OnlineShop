<template>
<!-- @focus="router.push('/search')"  -->
 <div class='cancelsearch iconfont'  v-if='isfocus'  @click = 'goblur()'>&#xe606;</div>
<div class='search' :class="{'focuscls':isfocus}" ref='box'>
      <span class='iconfont icon-fangdajing'
      ></span>
      <input type='text' class='header__input' v-model='searchcontent'
    @focus='gosearch' 
      :placeholder="placeholder">
      <span class='submit' v-if='isfocus' 
     @click='handlesearch'
      ref='input'>搜索</span>
</div>
 <!-- @click="router.push('/search')"  -->
 <!-- <div class='searchbox'
 :class="{'active':backfocus}"></div> -->
</template>

<script>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import {useStore} from 'vuex'
export default {
    name:'Searchbox',
    props:['placeholder'],
    setup(props,{emit}){
      const searching = ()=>{
        console.log('search')
      }
    //    const backfocus = ref(false)
    // const handleblur = ()=>{
    //   backfocus.value = !backfocus.value

    // }
    // const handlefocus=()=>{
    //    backfocus.value = !backfocus.value
    // }
      const box = ref(null)
      const isfocus = ref(false)
      const input = ref(null)
      const router = useRouter();
      const searchcontent = ref(null)
      
      const gosearch = ()=>{
        isfocus.value = true
          emit('focus')
          // handlefocus()
          // box.value.style.transform = 'translateY(-.3rem)'
      }
      const goblur = ()=>{
       
         isfocus.value = false
         input.value.blur()
         emit('setnormal')
        //  handleblur()

         emit('blur')
      }
      const store = useStore()
      const handlesearch = ()=>{
        if(!searchcontent.value){
          return false
        }
        console.log('wodaoyao',searchcontent.value)
   
        emit('hidehis',searchcontent)
        store.commit('addHistory',searchcontent.value)
        searchcontent.value = null


      }
      return{router,gosearch,isfocus,goblur,box,input,searching,handlesearch,searchcontent}

    }



}

</script>

<style lang='scss' scoped>
@import '../style/constants';
@import '../style/mixins.scss';
.cancelsearch{
  height: 20px;
  width: 20px;
  font-size:.15rem;
  color: white;
  position:absolute;
  left: 0.05rem;
  top: 0.15rem;
}
 .search{
    position:relative;
    top:-0.03rem;
    width: 100%;
    background: #F5F5F5;
    border-radius: .16rem;
    border:.01rem solid #0c82db;
    transition:all .3s ease-in-out;
    // box-shadow: .0rem 0rem .03rem rgba(0,0,0,0.4);
    font-size:0;
    height: 0.25rem;
    display: flex;
    align-items: center;
    @include placeholder;
    .header__input{
      font-size:.14rem;
      height: 0.16rem;
      line-height: .16rem;
      width: 90%;
      outline:None;
      border:none;
      background:none;
      color: #3f3f3f;
    }

   
    .text{
      color:$holder-color;
    }
    .iconfont{
      font-size:16px;
      margin:0 .12rem 0 .16rem;
      color: $holder-color;
      
    }
  }
   .submit{
      color:white;
      height: 100%;
      border:.01rem solid $blue-color;
      border-radius:.16rem;
      width: 0.5rem;
      line-height :0.25rem;
      top:-.01rem;
      left: 0;
      font-size:.12rem;
      display: inline-block;
      background-color: $blue-color;
      text-align: center;
      
      
    }
  .search.focuscls{
    // border:.02rem solid rgb(142, 206, 255);    
    box-shadow: 0px 0px .04rem rgb(114, 177, 245);
    transform:translateY(-.3rem);
    height: 0.3rem;
  }
</style>
