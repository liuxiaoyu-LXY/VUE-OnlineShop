<template>

<div class='headercommon'>
     <h3 class='h3title'>{{titlehead}}</h3>
    <span class='back iconfont' @click = "()=>{handleback(back,params)}">&#xe606;</span>
</div>


</template>

<script>
import {useRouter,useRoute} from 'vue-router'
import {computed} from 'vue'
export default {
    name:'Header',
    props:['Title','back','params'],
    setup(){
        const router = useRouter();
        const route = useRoute();
        const titlehead = computed(()=>{
            return route.query.content
        })
        
        const handleback = (back,params)=>{
            if (back){
                router.push({path:back,query:params})
            }
            else{
                router.go(-1)
            }
        }
       
        return {router,handleback,titlehead};

    },
    
    
}
</script>


<style lang='scss' scoped>

.headercommon{
    box-sizing: border-box;
    width:100%;
    height: .55rem;
    background-color: #0c8cee;
    font-size:0;
    color:white;
    position:relative;
    .back{
        position:absolute;
        font-size:.2rem;
        left: 0.18em;
        top: 50%;
        transform:translateY(-50%);
    }
    .h3title{
        font-size:.18rem;
        text-align: center;
        font-weight: normal;
        height: 0.55rem;
        line-height: .55rem;
        margin: 0;
    }
    
}

</style>
