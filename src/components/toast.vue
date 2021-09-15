<template>
    <div class='toast'>
        <!-- <div class='close' @click = 'close'>x</div> -->
        <p>{{content}}</p>
    </div>
</template>

<script>
import {inject,reactive,toRefs} from 'vue';
export default {
    name:'toast',
    props:['content'],
    setup(){
        const closeitem = inject('closeItem');
        const close = ()=>{
            console.log('bye')
            closeitem()
        }
        return {close}
    }
}
export const controlToast = ()=>{
    let toastdata = reactive({
        toastshow:false,
        toastmsg:''
    });
    const closeItem = ()=>{
    toastdata.toastshow = !toastdata.toastshow
    };
    const setdata = function (msg) {
        toastdata.toastmsg = msg;
        toastdata.toastshow = true;
        const timer = setTimeout(()=>{
            toastdata.toastshow = !toastdata.toastshow
            clearTimeout(timer)
        },1500)

    }
    const {toastshow,toastmsg} = toRefs(toastdata)
    return {toastshow,toastmsg,closeItem,setdata}

}
</script>

<style lang='scss' scoped>
.tos2{
    width: 100%;
    height: 100%;
    background-color: red;
}
.toast{
    width: 1.5rem;
    // height: 0.35rem;
    line-height: .2rem;
    background-color: black;
    color:white;
    border:.01rem solid white;
    box-shadow: .02rem .02rem .02rem gray;
    border-radius:.05rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    opacity:0.6;
    padding: 0;
    display: flex;
    align-items: center;
    font-size:.13rem;
    z-index:999;

    .close{
        position: absolute;
        left: 0.04rem;
        top: 0.01rem;
    }
    p{
        width: 100%;
        // height: .35rem;
        text-align: center;
        // line-height:.35rem;
        
        

    }
}
</style>