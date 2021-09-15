<template>
<div class='outer'>
<div class='wrapper'>
    <div class='search'>
        <div class='search__back' @click='()=>{handleBack()}'><span class='iconfont icon-back'></span></div>
        <div class='search__box'>
            <router-link :to='{path:goparams,query:{input}}'>
            <span class='iconfont icon-fangdajing'></span>
            </router-link>
            <input type='text' v-model = 'input' placeholder='请输入商品名称搜索'>
        </div>
    </div>

<Topshop @setshopName="handleshop($event)" :item='item' :shopname= 'item.name'></Topshop>
    <!-- <Shopinfo :item= 'item' :border='false' v-if = 'item.imgUrl'/> -->
</div>
<Content :shopname= 'item.name' @carton = 'handlecarton' />
<div class='block'>
    <Cart :carton = "carton" :limit = 'item.expressLimit' @changecarton = 'closeecarton'/>
</div>
<router-view></router-view>
</div>
</template>

<script>
// import Shopinfo from '../../components/shopinfo.vue'
import Topshop from './shopTop.vue'
import {useRouter,useRoute} from 'vue-router';
import { get } from '../../utils/request.js';
import {reactive,ref,toRefs, watchEffect,computed} from 'vue';
import Content from './Content.vue';
import Cart from './Cart.vue'


// const goback = ()=>{
//     const router = useRouter();
//     const handleBack = ()=>{
       
            
//             router.back()

//         }
//     return {handleBack}

// }

export default ({
    name:'Shop',

    components:{ Content,Topshop,Cart},
    setup(){
        
        const handleshop = (params)=>{
     
            console.log('chuancanshu',params)
        } 
        const input = ref(null)
        const route = useRoute()
        const goparams = computed(()=>{
            let st = '/shop/'+route.params.id+'/search';
            return st
        })
        
        const closeecarton = ()=>{
            if(carton.value){
                carton.value=!carton.value
            }
        }
        const carton = ref(false)
       
        const handlecarton = ()=>{
            if (!carton.value){
                carton.value = !carton.value
            }
            
            // console.log(carton.value)

        }
       const a = 2;
        const router = useRouter();
    const handleBack = ()=>{
            console.log('====',window.history.state.back)
            input.value = null;
            const cur = window.history.state.current
            console.log(cur)

            if (cur.indexOf('search')>-1){
                console.log('ss',cur.split('/search')[0])
                router.push(cur.split('/search')[0])

            }
            else{router.push('/')}
            
            

        }
        let data = reactive({item:''})
        //  let item = reactive({})
        const setdatali = async function (){
            const route = useRoute()
        try{
          const result = await get('https://www.jd/jd2',
          )
          if (result?.errno === 0 && result.data.length){
             data.item = (result.data[route.params.id-1])
            // let name = result.data[route.params.id-1].name
            //  console.log('sdsdsds',data.item)
            //  console.log(data.item,'===')
          }
          else{console.log('e')}
        }catch(e){
          console.log('error,',e)
        }
      }
      watchEffect(()=>{
          setdatali()
      })
        const {item} = toRefs(data)
        // console.log('www',data.item)
    return {goparams,input,a,handleshop,handleBack,handlecarton,item,carton,closeecarton}
    }
})
</script>

<style lang='scss' scoped>
.wrapper{
    width: 100%;
    padding: 0 .18rem;
    box-sizing: border-box;
    color:#333333;
    .search{
        width: 100%;
        padding-top: 0.19rem;
        font-size:.13rem;
        display: flex;
        margin-bottom: 0.04rem;
        &__back{
            height: 0.32rem;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            margin-right: 0.1rem;
        }
        .iconfont{
            color: #B6B6B6;
            font-size:.2rem;
        }
        &__box{
            flex:1;
            background: #F5F5F5;
            height: 0.32rem;
            padding-right: .12rem;
            border-radius: .15rem;
            display: flex;
            .iconfont{
                font-size:0.18rem;
                width: 0.16rem;
                margin-right: 0.16rem;
                position: relative;
                top:.06rem;
                left:.1rem;
            }
            input{
                background: none;
                border:none;
                outline:none;
                flex:1;
                &::placeholder{
                    color:#B7B7B7;
                }
            }
        }


    }
}
.c{
    height: 2000px;
    width: 100%;
    background-color: salmon;
}

.block{
    width: 100%;
    height: 0.50rem;
    padding:0;
    position:absolute;
    bottom: 0;
    left: 0;
    background-color: red;

}
</style>
