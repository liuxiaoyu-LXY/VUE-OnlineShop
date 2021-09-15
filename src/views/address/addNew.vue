<template>
      <Top path = '/order/1' >
       <template v-slot:title>新建收货地址</template>
       <template v-slot:right> 
           <!-- <router-link to='/address' replace> -->
            <!-- <span class='right' @click = '()=>{handleGo(back)}'> -->
        <span class='right' @click = 'router.go(-1)'>保存</span>
        <!-- </router-link> -->
        </template>
   </Top>
    <div class='wrapper'>
        <div class='form'>
            <div class='formItem' v-for = "(item,index) in content" :key = "index">
                <span class='title'>{{item.tag}}:</span>
                <input type='text' :placeholder="item.ph">

            </div>
            
        </div>
    </div>
</template>

<script>
import Top from './commonTop.vue'
import {useRouter} from 'vue-router'
export default {
  
    name:'AddAddress',
    components:{Top},
    setup(){
          const router = useRouter()
        const path = '/address'
        const content = [
            {
                tag:'所在城市',
                ph:'如北京市'
            },{
                tag:'小区/大厦/学校',
                ph:'如人民大学科技园'
            },
            {
                tag:'楼号-门牌号',
                ph:'A号楼3层'
            },
            {
                tag:'收货人',
                ph:'请填写收货人姓名'
            },
            {
                tag:'联系电话',
                ph:'请填写收货人手机号'
            }
        ]
        return {content,path,router}
    },
    
}

</script>

<style lang='scss' scoped>

.wrapper{
    position:absolute;
    top: 0.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#f3f3f3;
    padding-top:.12rem;

    .form{
        width: 100%;
        background-color:white;
        height: 2.25rem;
        border-top:.01rem solid #f3f3f3;
 
        .formItem{
            height: 0.45rem;
            padding: 0 .18rem;
            box-sizing: border-box;
            width: 100%;
            border-bottom: .01rem solid #f3f3f3;
            font-size: .14rem;
            color: #666666;
            display: flex;
            line-height: .44rem;
            
            input{
                border:none;
                outline:none;
                flex:1;
                padding:0 .1rem;
                &::placeholder{
                    font-size: .14rem;
                    color: #999999;
                    line-height: 20px;

                }

            }

        }

    }
}
</style>