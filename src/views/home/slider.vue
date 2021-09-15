<template>
<swiper 
:autoplay="swiper_options.autoplay" 
:loop="swiper_options.loop" 
:speed="swiper_options.speed" 
:pagination="swiper_options.pagination"
@swiper = 'onSwiper'
@slideChange='onSlideChange'>
      <swiper-slide v-for = "(item,index) in numlist" :key=index>
        <img :src=item.url>
        <div class='saleContent'></div>
      </swiper-slide>
</swiper>

</template>

<script>
import axios from 'axios'
import { Swiper,SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import {reactive,ref} from 'vue';
import SwiperCore, {Autoplay,Pagination} from 'swiper';
import 'swiper/components/pagination/pagination.scss';
SwiperCore.use([Autoplay,Pagination]);

const U = 'https://www.jd/jd3'

export default {
  name: 'banner',
  components: {
    Swiper,
    SwiperSlide
  },

  setup() {
      // swiper相关配置属性放在swiper_options这个变量里
		let swiper_options = reactive({
			autoplay:{
				delay:3000,
				disableOnInteraction: false
			},
			loop:true,
			speed:1000,	
			pagination:{
				clickable: true
			}
		});
    const onSwiper = function (){
    
    };
    const onSlideChange = function(){
      
    };
    let numlist =ref([]);
    axios.get(U)
      .then(function (response) {
        numlist.value = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
    
                // 将swiper_options返回给模板中的swiper组件使用
		return {swiper_options,onSwiper,onSlideChange,numlist};
	},

 
}

</script>
<style lang="scss">
.swiper-container{
  width: 100%;
  border-radius: .05rem;
  .swiper-wrapper{
    width: 100%;
    .swiper-slide {
  width: 100% !important;
  height: 0;
  padding-bottom: 25.37%;
  font-size:0;

   img {
    width: 100%;
    height:.86rem;
  }
}
  }
  .swiper-pagination{
  bottom:-.19rem;
}
}

</style>
