<template>
<div class="icons" :class="{'wrap':wrap}">
   
    <div v-for = "(item,index) in iconsli" :key=index class="icons__item">
      <router-link :to="{path:'/detail',query:{id:index,content:item.class,latlng:latlng}}">
      <img
            class="icons__item__img"
            :src= "`http://www.dell-lee.com/imgs/vue3/${item.class}.png`"
          />
      <p class="icons__item__desc">{{item.desc}}</p>
      </router-link>
    </div>
    
 </div>

</template>

<script>
export default {
    name:'Sales',
    props:['wrap','latlng'],
    setup(){
      const iconsli = [{
        class:'超市',
        desc:'超市便利'
      },{
        class:'菜市场',
        desc:'菜市场'
      },{
        class:'红包',
        desc:'红包套餐'
      },{
        class:'大牌免运',
        desc:'大牌免运'
      },{
        class:'签到',
        desc:'签到打卡'
      },{
        class:'蛋糕',
        desc:'烘焙蛋糕'
      },{
        class:'家居',
        desc:'家居时尚'
      },{
        class:'医药健康',
        desc:'医药健康'
      },{
        class:'鲜花',
        desc:'鲜花绿植'
      },{
        class:'水果店',
        desc:'水果店'
      }]
      return {iconsli}
    }
}
</script>

<style lang='scss' scoped>
@import '../style/constants';
@import '../style/mixins.scss';
a{
  text-decoration: none;
  padding: 0;
  margin: 0;
}
.icons.wrap{
  flex-wrap:nowrap;
  overflow-x: scroll;
  // &__item{
  //   margin-right: 0.8rem;
  // }

}
.icons {
  padding-top: 0.16rem;
  width: 100%;
  font-size:.12rem;
  display: flex;
  flex-wrap: wrap;
  &__item{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink:0;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
    p{
      font-size:.12rem;
      color:$page-color;
      margin:.06rem 0 .16rem 0;
    }
  }
}
</style>