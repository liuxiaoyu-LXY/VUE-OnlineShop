<template>
     <div class='top'>
         <!-- <router-link :to='back'> -->
        <span class='back iconfont' @click ='router.go(-1)' >&#xe606;</span>
         <!-- </router-link> -->
        <span><slot name='title'></slot></span>
        <!-- <router-link to='/address' replace> -->
            <!-- <span class='right' @click = '()=>{handleGo(back)}'> -->

        <!-- <span class='right' @click = '()=>{handleGo(back)}'> -->
            <slot name='right'></slot>
        <!-- </router-link> -->
    </div>
</template>

<script>
import {useRouter} from 'vue-router';
const goback = ()=>{
    const router = useRouter();
    const handleBack = ()=>{
            router.back()

        }
    return {handleBack}}


export default {
    name:'Top',
    props:['path','back'],
    setup(){
        const router = useRouter();
        const{handleBack} = goback();
        const handleGo = (back)=>{
            
            if (back){
                // alert(back)
                router.push({path:back})
            }
            else{
                router.go(-1)
            }

        }
        return {handleBack,router,handleGo}
    }
}
</script>

<style lang='scss' scoped>
a{
    color: #333333;
    text-decoration:none;
}
.top{
    width: 100%;
    height: 0.5rem;
    font-size:.16rem;
    display:flex;
    padding: .15rem .18rem .11rem .18rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items:center;
    color: #333333;
    .back{
        font-size:.18rem;
        color: #B6B6B6;
    }
    .right{
        font-size:.14rem;

    }}
</style>