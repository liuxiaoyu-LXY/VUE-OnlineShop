<template>
    <div class='back' :class="{'search':focus}">
    </div>
</template>

<script>
export default {
    name:'Back',
    props:['focus']
}
</script>

<style lang='scss' scoped>
@import '../style/constants';
.back{
    position:absolute;
    width: 100%;
    height:1rem;
    margin-left: -.18rem;
    background: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, $blue-color 40%);
    background-repeat: no-repeat;
    transition:height .3s ease-in-out
  }

.back.search{
    height: .7rem;
}
</style>