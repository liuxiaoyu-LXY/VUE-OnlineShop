<template>
    <div class='content' >
    <div class='category'>
        <div v-for = "item in menulist" :key="item.id" 
        :class="{'category__item':true,'category__item--active':item.tab === curTab}"
        @click = "()=>{handleclickMenu(item.tab)}">{{item.name}}</div>
    </div>
    <div class='products'>
        <div class='products__item' v-for = "(one,index) in item" :key='one._id'>
                 <img v-scroll='one.imgUrl'/>
            <div class='products__intro'>
                <h3 class='products__intro__title'>{{one.name}}    <span class='weight'>{{one.weight}}</span></h3> 
                <p class='products__intro__sales'>月售{{one.sales}}件</p><span v-if='one.sale' class='limit'>{{(10*one.price/one.oldPrice).toFixed(2)}}折 限{{one.limit}}份</span>
                <span class='new' :class="{normal:!one.sale}">&yen;{{one.price}}</span>
                <span class='origin' v-if='one.sale'>&yen;{{one.oldPrice}}</span>
            </div>
            <div class='count'>
                <div class='minus'  @click = '()=>{addItemCart(pageid,one._id,one,-1,shopname,index)}'><span class='iconfont'>&#xe906;</span></div>
                <span class='counttext'>{{cartList?.[pageid]?.productList?.[one._id]?.count || 0}}</span>
               
                 <div class='plus'
                 @click = '()=>{addItemCart(pageid,one._id,one,1,shopname,index,one.sale,one.limit)}'>
                 <span class='iconfont'  
                
                 >&#xe734;</span>

                  <transition-group 
                  v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="(e)=>{afterEnter(e,index)}">
                     <div class='outer' id='outer' v-for="i in balllist[index]" :key= i >
                 <span class='iconfont throw' ref='ball' id='throw'>&#xe734;</span>
                 </div>
                 </transition-group>
                 </div>
                 
            </div>
        </div>
        
        
    </div>
  
</div> 
<Toast v-show = 'toastshow' :content='toastmsg'/>
</template>

<script>
import {getProduct} from "../../utils/request.js"
import {useRoute} from 'vue-router';
import {reactive,toRefs,ref,watchEffect} from 'vue';
import {handleCart,Content} from './commonHandlers.js'
import toast,{controlToast} from '../../components/toast.vue'
import {useStore} from 'vuex';
import {provide} from 'vue';
import {scrollParent,debounce,Listener} from '../../utils/lazyload.js'
const handleTabValue = ()=>{
    //初始化
    const {menulist} = Content;
    let curTab = ref(menulist[0].tab);
    const handleclickMenu = function(tab){
            curTab.value = tab;
        }
    return{curTab,handleclickMenu,menulist}
}

const handledata = function (curTab){
    const Route = useRoute();
    const pageid = Route.params.id;
    const data = reactive({item:{}})
    const getData = async function(){
            try{
            const result = await getProduct("https://www.jd/products",{ Tab:curTab.value,shop:pageid});
           
            if (result.errno === 0 && result.data){
                data.item = result.data;
             

            }else{
                console.log('fail!')
            }
            }catch(e){
                console.log('error!',e)
            }
        };
    watchEffect(()=>{
        getData();
        })
    const {item} = toRefs(data);
    return {item,getData,pageid}

}

const bind = function(el,binding){
        let src = binding.value;
        let parent = scrollParent(el);
        el.src =require('../../assets/loading.gif');
        let listener = new Listener({el,src,parent})
       
        let deps = target.get(parent)
        if(!deps){
            target.set(parent,deps=new Set());
            deps.add(listener)
            parent.addEventListener('scroll',fn,false)
        }
        else{deps.add(listener)}
        bindEvent(parent)
    }
    
const bindEvent = function(parent){
                let deps = target.get(parent);
                if(deps){
                deps.forEach((listener)=>{
                    if (!listener.load && listener.getsize(parent)){
                        listener.update()
                    }
                })}
    }
    
const fn = function(){
       let parent = this
       return debounce(bindEvent(parent))
    }
let target = new Map();

export default {
    name:'Content',
    props:['shopname'],
    components:{Toast:toast},
    directives: {
    scroll:{
        mounted(el,binding){
            bind(el,binding)
        },
        }},
    setup(props,{emit}){
    
        const {toastshow,toastmsg,closeItem,setdata} = controlToast();
        provide('closeItem',closeItem)
        const store = useStore()
        const hello = ref(null);
        const balllist=reactive({})
        let arr = []
        const {curTab,handleclickMenu,menulist} = handleTabValue();
        for (let i = 0;i<menulist.length;i++){
            balllist[i] = []
        }
        const throwstart = reactive(arr)
        const plsli = reactive(arr)
        const addItemCart =(shopid,productid,productinfo,num,shopname,index,sale,limit)=>{
           
            if (num>0 && sale && cartList?.[shopid]?.productList?.[productid]?.count == limit ){
                const msg = `超值商品限购${limit}件，超出将恢复原价`
                setdata(msg)
            }

        if (num>0){
                balllist[index].push(true)
            }
        store.commit('addItem',{shopid,productid,productinfo,num,shopname})
    }
  
        const  {item,getData,pageid} = handledata(curTab);
        const {cartList} = handleCart();

        const beforeEnter = (el)=>{
            el.style.transform ='translate(0,0)'
        }
       
            // 进入后
        const afterEnter=function(e,index){

            e.addEventListener('transitionend', () => {
                balllist[index].pop()
                emit('carton')
                    })
            };
            
        return {toastshow,toastmsg,closeItem,setdata,
            hello,plsli,balllist,throwstart,beforeEnter,afterEnter,
        item,getData,curTab,handleclickMenu,menulist,pageid,cartList,addItemCart}
    },
    methods:{
         enter(el, done){
             const inel = this.$refs.ball
                el.offsetWidth
                inel.offsetWidth
			//h5新api--getBoundingClientRect，可以获取自身一个矩形的坐标（上下左右）
            const ballPosition = inel.getBoundingClientRect();
           const objcart = document.getElementById("iconbox");
			// //目标元素位置
            const iconBoxPosition = document
                .getElementById("iconbox")
                .getBoundingClientRect();

            const xDist = iconBoxPosition.left - ballPosition.left;
            const yDist = iconBoxPosition.top - ballPosition.top;
            el.style.transform=`translateX(${xDist/100}rem`
            inel.style.transform=`translateY(${yDist/100+0.3}rem`

            el.style.transition = "all .5s linear";
            objcart.style.transition = "all .5s linear";
            inel.style.transition = "all .5s cubic-bezier(.4,-0.5,.8,1)";
            done();
            }
    },

    beforeUnmount(){
            for(let [item] of target){
                 item.removeEventListener('scroll',fn)
            }
    }
}

</script>

<style lang='scss' scoped>
@import '../../style/_constants.scss';
@import '../../style/mixins.scss';
.content{
    position:absolute;
    width: 100%;
    bottom: 0.5rem;
    top: 1.64rem;
    .category{
        // display: none;
        width: 0.76rem;
        height: 100%;
        overflow-y:scroll;
        background: #F5F5F5;
        position: absolute;
        left: 0;
        // z-index:9;
        &__item{
            height: 0.4rem;
            font-size:.14rem;
            line-height: .16rem;
            justify-content: center;
            display: flex;
            align-items: center;
            color: $page-color;
            &--active{
                background-color: rgb(255, 255, 255);
                border-left:.06rem solid $blue-color;
                box-sizing: border-box;
            }

        }
    }
    .products{

        width: 100%;
        box-sizing: border-box;
        // width: 0.2rem;
        // z-index:9;
        height: 100%;
        // overflow-x:visible;
        overflow-y:scroll;
        padding:0 .16rem 0 .88rem;
        color: $page-color;
        &__item{
            // margin:0 .16rem;
            overflow-x:visible;
            position:relative;
            border-bottom:.01rem solid #f3f3f3;
            width: 100%;
            display: flex;
            font-size:.12rem;
            
            img{
                width: 0.68rem;
                height: 0.68rem;
                margin: .12rem .16rem .12rem 0;
                position: relative;
                // z-index:9;
            }
            .outer{
                        background-color:none;
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                    .throw{
                        position: absolute;
                        right: 0;
                        top: 0;
                        z-index:9999;
                        
                        color:#0091FF;
                        font-size:.20rem;
                    }
            .limit{
                font-size:.1rem;
                color:#E93B3B;
                display: inline-block;
                position:absolute;
                top: 50%;
                transform:translateY(-52%) scale(0.95);
                right: -.02rem;
                border:.01rem solid #E93B3B;
                padding: 0 .02rem;
                border-radius: .04rem;
            }
            .products__intro{
                overflow-x: hidden;
                h3{
                @include ellipsis;
                margin: .12rem 0 0 0;
                padding: 0;
                width: 100%;
                font-size: .14rem;
                font-weight: normal;
                line-height: .2rem;
                
                }
                p{
                    margin: .06rem 0;
                    line-height: .16rem;
                }
                .new{
                    font-size: .14rem;
                    color: #E93B3B;
                    line-height: .20rem;
                    margin-right: 0.12rem;
                }
                .new.normal{
                    color: #ff7700;
                }
                .origin{
                    display: inline-block;
                    transform-origin: left top;
                    position:relative;
                    top:.07rem;
                    text-decoration: line-through;
                    font-size: .2rem;
                    transform:scale(0.5);
                    color: #999999;
                    line-height: .20rem;
                }
            }
            .count{
                position:absolute;
                bottom: .12rem;
                right: 0;
                width: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size:.12rem;
                height: 0.22rem;
                z-index:9;
                 .counttext{
                        font-size:.14rem;
                        line-height: .22rem;
                        height: 0.22rem;
                        position: relative;
                        top:.02rem;
                    }
                .minus, .plus{
                    width: 0.22rem;
                    height: 0.22rem;
                    border-radius: .22rem;
                    font-size:.22rem;
                    position: relative;
                    // display: flex;
                    // align-items: center;
               
                    text-align: center;
                    // justify-content: center;
                    
                }
                .minus{
                    span{
                        color:#333;
                        font-size:.22rem;
                    }
                }
                .plus{
                   span{
                        color:#0091FF;
                        font-size:.20rem;
                    }
                    
                }
            }
        }

    }


}</style>