<template>
<div class='nearby'>
    <h3 class='nearby__title'>附近超市</h3>
    <Shopinfo :border="true" :latlng = "latlng" />
</div>
</template>

<script>

import {computed} from 'vue'
import Shopinfo from '../../components/shopinfo.vue'
import {useRoute} from 'vue-router'

export default {
    name: 'Nearby',
    components:{ Shopinfo },
    setup(){
      const route = useRoute()
      const latlng = computed(()=>{
        return route.query.latlng
      })
      return {latlng}
    }
}
</script>

<style lang='scss'>
@import '../../style/constants';
@import '../../style/mixins.scss';

.nearby{
  width: 100%;
  color:$page-color;
  &__title{
    font-weight: normal;
    font-size:0.18rem;
    margin: 0.16rem 0 0.02rem 0;
  }
  a{
    text-decoration: none;
    color:#333333;
  }
 
}
</style>