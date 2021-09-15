<template>
  <!-- <router-view /> -->
  
    <!-- <keep-alive>
    <router-view></router-view>
</keep-alive> -->
<transition name='fade' mode='out-in'>
<!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
<router-view></router-view> 
</transition> 
</template>

<script>
export default {
  name: 'App',
  data(){
    return {transitionName:'fade'}
  }
}
</script>

<style lang='scss'>
.fade-enter-active,.fade-leave-active{
  transition:opacity .3s ease-in-out !important;

}
.fade-enter-from,.fade-leave-to{
  opacity:0 !important;
}
.fade-enter-to,.fade-leave-from{
  opacity: 1 !important;
}
.slideleft-enter-active,.slideleft-leave-active{
  transition:all 1s ease-in-out !important;

}
.slideleft-enter-from,.slideleft-leave-to{
  transform:translateX(-2rem);
}
.slideleft-enter-to,.slideleft-leave-from{
  transform:translateX(0);
}


</style>
