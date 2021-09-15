<template>
<div class='block'>
  
    <div v-for="(item,index) in docker_list" :key=index 
    :class="{'block__item':true, 'block__item--active': index == num}"
     >
      <router-link :to = "item.to">
      <div :class="{'iconfont':true, [item.iconclass]:true}"></div>
      <div class='block__title'>{{item.text}}</div>
      </router-link>
    </div>
    
</div>
</template>
<script>

export default ({
    name: 'Docker',
    props:['num'],
    setup(){
      
     
      const docker_list = [{
        iconclass:'icon-Homehomepagemenu',
        text:'首页',
        to:{name:'Home'}
      },{
        iconclass:'icon-cart',
        text:'购物车',
        to:{name:'Cart'}
      },{
        iconclass:'icon-emaxcitygerenxinxitubiaoji03',
        text:'订单',
        to:{name:'History'}
      },{
        iconclass:'icon-custom-my',
        text:'我的',
        to:{name:'Person'}
      }]
      return {docker_list}
    }
})
</script>

<style lang='scss'>
@import '../style/constants';
@import '../style/mixins.scss';
.block{
  position:absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.49rem;
  background-color: #FFFFFF;
  display: flex;
  box-sizing: border-box;
  padding: 0 .18rem;
  border-top:.01rem solid #f3f3f3;
  &__item{
    flex:1;
    text-align: center;
    color:$page-color;
    a{
      color:$page-color;
      text-decoration: none;

    }
    
    &--active{
      a{
        color:#1FA4FC;  
      }
      color:#1FA4FC;
    }
  }
  &__title{
    width: 100%;
    font-size:.12rem;
  }
  .iconfont{
    width: 100%;
    font-size:.20rem;
    margin:.07rem 0 .02rem 0;
  }
}
</style>