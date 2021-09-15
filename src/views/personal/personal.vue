<template>

<div class='info' ref="info">
    <img src="https://himg.bdimg.com/sys/portrait/item/pp.1.c3894224.APFSdWzhdjMp8UoDqP0yLA?_t=1630444397720">
    <div class='self'>
    <span class='name'>{{user}}</span>
    <span class='personinfo'>个人信息 ></span>
    </div>
    <div class='icons'>
        <span class='iconfont set'>&#xe60b;</span>
        <span class='chat iconfont'>&#xe638;</span>
    </div>
</div>
<div class='wrapper'>
<div class='benefit item'>
    <div class='beneitem jifen'>
        <span class='num'>159</span>
        <span class='title'>积分 ></span>
    </div>
    <router-link to='/benefit'>
    <div class='beneitem bene'>
        <span class='num'>2</span><span class='unit'>张</span>
        <span class='title'>卡券 ></span>
    </div>
    </router-link>
    <div class='beneitem love'>
        <span class='num'>2</span>
        <span class='title'>收藏 ></span>
    </div>
</div>
<div class='economy item'>
    <div class='beneitem getn'>
        <span class='num iconfont'>&#xe61f;</span>
        <span class='title'>赚积分</span>
    </div>
    <div class='beneitem judge'>
        <span class='num iconfont'>&#xe8cd;</span>
        <span class='title'>我的评价</span>
    </div>
    <div class='beneitem add'>
        <span class='num iconfont'>&#xe8d3;</span>
        <span class='title'>收货地址</span>
    </div>
    <div class='beneitem card'>
        <span class='num iconfont'>&#xe8d1;</span>
        <span class='title'>银行卡</span>
    </div>
</div>
<div class='other'>
    <div class='box' v-for="(item,index) in arr" :key=index>
        <span class='left'>{{item.name}}</span>
        <span class='right'>{{item.intro}}</span>
      
    </div>
     <div class='box'>
        <span class='left'>语言</span>
        <span class='right'>客服在线时间 ></span>
      
    </div>
</div>
<div class='logout' @click='goout'>退出登录</div>
</div>
<Docker num='3'></Docker>
</template>

<script>
import Docker from '../../components/docker.vue'
import {useRouter} from 'vue-router'

export default {
    name:'Personal',
    components:{Docker},
    setup(){
        const user = localStorage.username;
        const router = useRouter()
        const arr = [{name:'联系客服',intro:`客服在线时间  >`},
        {name:'积分商城',intro:`兑换积分服务  >`},
        {name:'语言',intro:`中文/EN  >`},
       { name:'商家入驻',intro:`期待加入我们  >`},
        ]
        const goout = ()=>{
             localStorage.removeItem('isLogin');
              localStorage.removeItem('username');
            router.push('/login')

        }
       return {arr,goout,user}
    }
}
</script>

<style lang='scss' scoped>
a{
    text-decoration: none;
    flex:1;
}
.wrapper{
    background-color: #eee;
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    top: 1.4rem;
    padding: 0 .18rem .2rem .18rem;
    overflow: scroll;
    // height: 5rem;
    
    
}
.info{
    // position: absolute;
    // left: 0;
    background-color: white;
    width: 100vw;
    box-sizing: border-box;
    font-size:.14rem;
    padding:.3rem .18rem .3rem .18rem;
    display: flex;
    img {
        width:.8rem;
        border-radius: .8rem;
    }
    .self{
        flex:1;
        display:flex;
        flex-direction: column;
        padding:.06rem .09rem;
        .name{
            font-size:.2rem;
            font-weight: bold;
            margin-bottom: 0.06rem;
        }
        .personinfo{
            font-size:.13rem;
            color:#666;
        }

    }
    .icons{
        
        span{
        font-size:.18rem;
        }
        .set{
            margin-right: 0.07rem;
        }
        
    }
   
}
.item{
    width: 100%;
    font-size:.12rem;
    background-color: white;
    margin-top: 0.15rem;
    border-radius: .06rem;
    box-shadow:0 0 .03rem rgba(0,0,0,0.2);
    display:flex;
    .beneitem{
        height: .8rem;
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .num{
            font-size:.25rem;
        }
        .title{
            font-size:.1rem;
            color:#333;
            margin-top: 0.04rem;
            position: relative;
            left: 0.025rem;
        }
        .unit{
            position: absolute;
            left: 52%;
            display: inline-block;
            transform:scale(0.8);
            color:rgb(225, 91, 91);
        }
    }
    .bene .num{
        color:rgb(225, 91, 91);
    }
     .jifen .num{
        color:orange;
    }
     .love .num{
        color:rgb(235, 154, 167);
    }
    .bene::before{
        content:'';
        background-color: #eee;
        height: 0.6rem;
        position:absolute;
        left: 35%;
        width: 0.01rem;
    }
    .bene::after{
        content:'';
        background-color: #eee;
        height: 0.6rem;
        position:absolute;
        left: 68%;
        width: 0.01rem;
    }
    
    
    
}
.economy .getn .iconfont{
    color:rgb(198, 175, 76)
}
.economy .judge .iconfont{
    color:rgb(142, 116, 184)
}
.economy .add .iconfont{
    color:rgb(76, 149, 198)
}
.economy .card .iconfont{
    color:rgb(113, 198, 76)
}
.other{
    background-color: white;
     border-radius: .06rem;
     font-size:.14rem;
      margin-top: 0.15rem;
      box-shadow:0 0 0.02rem rgba(0,0,0,0.3);
    //   height: 300px;
      .box{
          display: flex;
          justify-content: space-between;
          color:#333;
          height: 0.5rem;
          padding: 0 .12rem;
          position: relative;
          align-items: center;
          .right{
              color:#999;
          }
         
          
      }
      .box::after{
          
          width: 3rem;
          height:.01rem;
          position: absolute;
          left: .2rem;
          bottom: 0;;
          background-color:#ddd;
          content:'';
        //   z-index:999;

      }
      
}
.logout{
    width: 100%;
    height: 0.3rem;
    background-color: rgb(78, 180, 223);
    color:white;
    font-size:.18rem;
    margin-top: 0.3rem;
    text-align: center;
    line-height: .3rem;
    border-radius: .08rem;
    
}

</style>