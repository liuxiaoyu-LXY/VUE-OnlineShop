<template>
<div class='outer'>
<Header :back='back' :params='params' ></Header>
<div class='saleswrapper'>
    <Sales :wrap='true' :latlng ='latlng'></Sales>
</div>
<transition name = 'mask'>
<div class='mask' v-if = 'choose!=0' @click = '()=>{choose = 0}'></div>
</transition>
<div class='wrapper'>
<div class='funcs'  >
    <div class='zhedang'>
    <span class='sort' @click = 'handlesort'
    >排序<span class='iconfont'>&#xe606;</span></span>
    <span class='choose'
    @click = 'handlechoose'
    >筛选<span class='iconfont'>&#xe606;</span></span>
    </div>
    
    <ul class='sortItem' :class="{'sortdown':choose == 1}"  >
            <template v-for = 'item in sortContent' 
            :key = 'item.index'>
            <li 
            class='sortli'
            :class="{'active-li':item.index == sortid}"
            @click = '()=>{handleSortfunc(item.index)}'
            >{{item.text}}</li></template>
        </ul>
         
    <div class='chooseItem'
        :class="{'choosein':choose == 2}" >
             <h3 class='title'>优惠活动</h3>
             <div class='onsale' :class="{'active':sale}" @click = '()=>{sale = !sale}'>正在促销</div>

             <h3 class='title'>商家服务</h3>
             <div v-for = 'item in servicearr' :key="item.id"
             class='serviceItem'
             :class = "{'active':item.id in attr}"
             @click = '()=>{handleservice(item.id)}'>
             {{item.text}}
            </div>
            <div class='controler'>
                <div class='clear' @click = 'handleclear'> 清空</div>
                <div class='confirm' @click = 'handleon'>提交</div>
            </div>



</div>
</div>  
   <Shopinfo :categoryID = "classid" :sortby = 'sortid' :confirm='confirmstatus'
   :supporter = 'attr'
   :sale = 'sale' border = 'true' 
    ></Shopinfo>
</div>
</div>
</template>

<script>
import Shopinfo from '../../components/shopinfo.vue'
import Header from '../../components/header.vue'
import Sales from '../../components/sales.vue'
import {defaults} from './constants.js'
import {ref,computed,reactive} from 'vue'
import {useRoute} from 'vue-router'
export default {
    name:'Detail',
    components:{Shopinfo,Header,Sales},

    setup(){
        const route = useRoute()
        const {sortContent,servicearr} = defaults;
        const num = ref(0);
        const back = '/';
        const params = computed(()=>{
            return {latlng:route.query.latlng+''}
        })
        let confirmstatus = ref(false);
        const sale = ref(false);
        let attr = reactive({})
        const choose = ref(0)
        const sortid = ref(0);

        const classid = computed(()=>{
            return route.query.id;
        })
        const classcontent = ref(route.query.content);
        const latlng = computed(()=>{
            return route.query.latlng;
        })

//以下全部都是筛选与排序的逻辑函数
        const handlesort = ()=>{
            if (choose.value!=1){choose.value = 1}
            else{
                choose.value = 0
            }
        }
        const handlechoose = ()=>{
            if (choose.value!=2){choose.value = 2}
            else{
                choose.value = 0
            }
        }
        const handleservice = (id)=>{
            if (id in attr && attr[id]>0){
                delete attr[id]
                num.value -=1
            }
            else{
                attr[id] = 1
                num.value+=1
            }
        }
        const handleSortfunc = (ind)=>{
            sortid.value = ind;
            choose.value = 0;
        }
        const handleon = ()=>{
            if (!sale.value && !num.value ){
                return false
            }
            else{
              confirmstatus.value = !confirmstatus.value; 
              choose.value = 0;
            }
        }
        const handleclear = ()=>{
            for (let key in attr){
                delete attr[key]
            }
            sale.value = false
            num.value = 0
        }
        
        return {sortContent,servicearr,handleon,handleclear,handleservice,attr,sale,handlechoose,choose,classid,
        classcontent,handlesort,latlng,back,params,
        sortid,handleSortfunc,confirmstatus}

    }
}
</script>

<style lang='scss' scoped>

.header{
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
        height: 100%;
        line-height: .55rem;
        margin: 0;
    }
    
}
.saleswrapper{
    padding: 0rem .18rem;
    background-color: #f6f6f6;

    // border-radius: .05rem;

}
.mask{
    position:absolute;
    z-index:9999;
    background-color:rgba(0,0,0,0.5);
    top: 1.41rem;
    right: 0;
    bottom: 0;
    left: 0;

}
.mask-leave-active,.mask-enter-active{
    transition:opacity .9s;
}
.mask-leave-from,.mask-enter-to{
    opacity:1
}
.mask-leave-to,.mask-enter-from{
    opacity: 0;
}
.wrapper{
    // border-top:.01rem solid rgba(148, 147, 147, 0.2);
    position:absolute;
    background-color:white;
    top: 1.41rem;
    right: 0;
    bottom: 0;
    left: 0;
    font-size:0;
    padding: 0.2rem .18rem .2rem .18rem;
    overflow: scroll;
    .funcsout{
        height: .14rem;

        // background-color: red;

    }
    .funcs{
        
        left: 0;
        right: 0;
        
        // padding:0 .16rem 0 .16rem;
    
        // background-color: red;
        color:#444;
        position:absolute;
        top: 0rem;
        z-index:99999;
        ;
        box-sizing: border-box;
        .zhedang{
            padding:0 .16rem;
            box-sizing: border-box;
            width: 100%;
            height: 0.26rem;
            background-color: white;
            position: absolute;
            // left: -.16rem;
            // right: -.16rem;
            z-index:999;
            // top: -.2rem;

        }
        // margin-left: -.09rem;
        // padding:0 .09rem ;
        .sort{
        padding: 0.05rem 0 0 0;
        margin: 0;
        font-size:.12rem;
        float:left;
        // position:absolute;
    }
    .choose{
        padding:0.05rem 0 0 0;
        margin: 0;
        font-size:.12rem;
        float:right;

    }
    .iconfont{
        display: inline-block;
        font-size:.1rem;
        margin-left: 0.02rem;
        transform:scale(0.6) rotate(270deg)
        }
    .sortItem.sortdown{
         transform:translateY(0);
    }
    .sortItem{
        transform:translateY(-1.85rem);
       
        transition: all .9s;
        width: 100%;
        // background-color: yellow;
        font-size:.12rem;
        list-style: none;
        padding: 0.2rem 0 0 0;
        margin: 0;
        background-color: white;
        .sortli{
            width: 100%;
            font-size:.13rem;
    
            padding:0.07rem .16rem;
        box-sizing: border-box;
        }
        .active-li{
            color:orange;
        }
    }
    .chooseItem.choosein{
        transform:translateY(0);
        

    }
    .chooseItem{
        width: 100%;
        position:absolute;
        top: 0.17rem;
        right: 0;
        left: 0;
        transform:translateY(-1.85rem);
        
        background-color: white;
       
        font-size:.12rem;
        padding: 0.06rem 0 0 0;
        margin: 0;
        transition:transform .9s;
    
        
        overflow:hidden;
        div{
            
            display:inline-block;
            margin: 0 .14rem;
            padding:0;
            font-size:.12rem;
            margin-bottom: .1rem;
            background-color: #e0e7f0;
            // box-shadow: 0.01rem 0.01rem .02rem rgba(25, 126, 220, 0.699);
            height: 0.27rem;
            line-height: .27rem;
            text-align: center;
            width: 0.62rem;
            border-radius: .04rem;
            
            
        }
        div.active{
            box-shadow: 0.01rem 0.01rem .02rem rgba(85, 172, 254, 0.699);
            background-color: #0c8cee;
            color:white;
        }
        h3{
            margin: 0;
            margin-top: .1rem;
            padding:0 .16rem;
            font-size:.13rem;
            margin-bottom: .08rem;
            color:#3f3f3f;
            
            
            
        }
        .controler{
            width: 100%;
            height: .5rem;
            box-shadow:none;
            background-color:#f3f3f3;
            box-sizing: border-box;
            margin: 0;
            padding: 0.07rem 0;
            .confirm,.clear{
                box-shadow:none;
                height: 0.3rem;
                line-height: .3rem;
                font-size:.14em;
                background-color: white;
                width: 1.5rem;
                padding: 0;
                margin:0.02rem .09rem;
                color: #0c8cee;
                border:.01rem solid #0c8cee;
            }
            .confirm{
                background-color: #0c8cee;
                color:white;
                // border:.01rem solid white;
            }
        }
        // background-color: red;
        // height: 200px;

    }

    }
    
    
}

</style>