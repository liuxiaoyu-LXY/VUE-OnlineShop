<template>
  <div class='header'>
    <div class='header__position' >
      <router-link to = '/position' v-show='search'>
      <span class='iconfont icon-position'></span>
      {{addressTitle}}
      </router-link>
      <!-- <div class='iconfont logo icon-fangdajing' v-show='!search'>搜索商铺或美食信息</div> -->
      <span class='iconfont icon-notice right-icon' v-show='search'></span>
    </div>
  <Searchbox ref='box' placeholder='山姆会员店搜索精彩' @focus='handlefocus' @hidehis = 'hidehis'
  @blur = 'handleblur' @setnormal='setnormal'></Searchbox>
  </div>
  <banner/>
  <Sales :wrap = 'false' :latlng = "latlng"></Sales>
  <div class='gap'></div>
</template>

<script>
import banner from './slider.vue'
import Sales from '../../components/sales.vue'
import Searchbox from '../../components/searchbox.vue'
import {useRoute} from 'vue-router'
import {computed,ref} from 'vue'

export default {
    name:'Head',
    components:{banner,Sales,Searchbox},
    setup(props,{emit}){
      const search = ref(true) 
      const box= ref(null)
      const route = useRoute()
      const latlng = computed(()=>{
        return route.query.latlng

      })
      const setnormal = ()=>{
        emit('setnormal')
      }
      const hidehis = (content)=>{
       
        emit('hidehis',content)
      }
      const handleblur = ()=>{
        emit('blur')
        search.value = true
      }
      const handlefocus=()=>{
        emit('focus')
        search.value = false

      }
      return {setnormal,hidehis,latlng,handlefocus,search,box,handleblur}

    },
    data(){
      return {
        // addresstitle:'',
      }
    },
    computed:{
      addressTitle(){
        if (this.$store.state.address == ''){return '请选择您的地址'}
        else{return this.$store.state.address}
        
      }

    },
    mounted(){
      console.log(this.$store.state.address,'hihihi')
      // this.addresstitle = this.$store.state.addressNum;
    },


}
</script>

<style lang='scss' scoped>
@import '../../style/constants';
@import '../../style/mixins.scss';

a{
  text-decoration: none;
  padding: 0;
  margin: 0;
  color: #f3f3f3;
  
}
.logo{
  text-align: center;
  font-size:.16rem !important; 
}
.header{
  width: 100%;
  height: 1.1rem;
  padding: .16rem 0 .03rem 0;
  box-sizing: border-box;
  &__position{
    font-size:.145rem;
    line-height: .16rem;
    height: 0.54rem;
    width: 100%;
    padding:0.13rem .32rem .13rem 0;
    box-sizing: border-box;
    position:relative;
    color:#f3f3f3;
    @include ellipsis;
    .iconfont{
      // color:#236d30;
      font-size:.22rem;
      position:relative;
      top:0.02rem;
      color:#f3f3f3;
     
    }
    .right-icon{
      position:absolute;
      top: 0.14rem;
      right: 0;
    }
  }

}
.slider{
  width: 100%;
  height: 0;
  padding-bottom: 25.37%;
  font-size:0;
  // background-color: red;

  &__img{
    width: 100%;
    height:auto;
  }
}

.gap{
  width: 100%;
  padding:0 .18rem;
  height: 0.1rem;
  background-color: $bg-color;
  position: relative;
  // right:-0.18rem;
  // left:-0.18rem;
  margin:0 -.18rem;
  
}
.searchbox{
  width: 100%;
  position:absolute;
  bottom: 0;
  height: 0;
  background-color:white;
  z-index:9;
  
}
.searchbox.active{
  height: 85%;
}
</style>