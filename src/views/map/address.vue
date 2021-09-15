<template>
  <div class='wrapper' ref="scrollel">
    
    <div class='back'>
    </div>
    <div class='header'>
     <h3 class='title'><span class='daohang iconfont'>&#xe609;</span>{{currentcity}}<span class='iconfont choose'>&#xe642;</span></h3>
 <router-link to='/'>
 <span class='backbutton iconfont'>&#xe606;</span>
 </router-link>
 <span class='newAdd'
    @click = 'handlenew'
 >创建地址</span>
    <div class='searchbox'>
    <div class='header__search'>
      <span class='iconfont icon-fangdajing'></span>
       <!-- <input id="pac-input" class="controls" type="text" placeholder="Search Box"> -->
      <input type='text' class='header__input' id='pac-input' placeholder="请输入您的收货地址">
    </div>
    </div>
    <div class='curaddress'>
      <p class='addresstitle'><span class='iconfont'>&#xe607;</span>当前位置</p>
      <div @click = '()=>{storeaddress(0,currentaddress,params.latlng)}'
      class='currentad'>{{currentaddress}}</div>
      <span @click='handlelocate'
      class='locate'><span class='iconfont'>&#xe6fd;</span>定位</span>
    </div>
    <div class='addressList'>
        <p class='addresstitle'><span class='iconfont'>&#xe62a;</span>我的收货地址</p>
        <ul class='addressul'>
            <li class='addressitem' v-for = 'item in addressli' 
            :key = item._id
            @click='()=>{storeaddress(item._id,item.address,item.latlng)}'>
                <p class='content'>{{item.address}}</p>
                <span class='name'>{{item.name}}</span>
                <span class='tel'>{{item.tel}}</span>
            </li>
        </ul>
    </div>
    
</div>
    
  </div>
</template>

<script>
import {get} from '../../utils/request.js'
import google from 'google'

const URL = 'https://maps.googleapis.com/maps/api/geocode/json'
const params_default = {
latlng:'39.958339,116.313740',
key:'AIzaSyA6R1wf4P5viLnCs8jNuxRIXPGr9OQfHAQ'}
const att = function(that){
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);

searchBox.addListener('places_changed', function() {
        
		var places = searchBox.getPlaces();
    const latlng=places[0].geometry.location.lat()+','+places[0].geometry.location.lng()
    //  console.log(that.address)
     that.city = `${places[0].address_components[3].long_name}  ${places[0].address_components[2].long_name}`
        that.address = places[0].formatted_address
        that.storeaddress(0,that.address,latlng)
        // that.$router.push('/')
        // console.log(that.address)
        })
}


export default {
    name:'AddressChoose',
    data(){
        return {
            addressli:[],
            address:'',
            city:'北京市',
            currentcity:'',
            currentaddress:'',
            params:params_default,
        }
    },
    // computed(){
    //   addid(()=>{
    //     return this.$store.addressNum;
    //   })
    // },
    methods:{
      handlenew(){
        // console.log('gomap',this.params.latlng)
        this.$router.push({path:'/map',query:{latlng:this.params.latlng}})

      },
        async setdatali (){
        try{
          const result = await get('https://www.jd/address')
          // console.log(result)

          if (result?.errno === 0 && result.data.length){
            this.addressli = result.data
            // console.log(this.addressli.value)
          }
          else{console.log('e')}
        }catch(e){
          console.log('error,',e)
        }
      },
      async getdata (params = params_default){
            try{
                const result = await get(URL,params);
                
                if (result.status === 'OK' && result.results){
                    console.log('!!!!!',result)
                    // {address_components,formatted_address} = result.results[0]
                    this.currentaddress = result.results[1].formatted_address
                    this.currentcity = result.results[1].address_components[2].long_name;
                    // console.log(this.currentcity)
                }
                else{
                    console.log('get nothing!')
                } 
            } catch(e){
                console.log('error,', e)
            }
        },
      storeaddress(num,addr,latlng){
        // console.log(addr)
        // console.log(this.$store.state.addressNum)
        this.$store.commit('changeAdd',{num})
        this.$store.commit('addresswrite',{addr})
        this.address = addr
        // console.log(this.address)
        // alert(latlng)
        this.$router.push({path:'/',query:{latlng}})
      },
      getposition(that){
        navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                console.log(pos,'pos')   
                that.params = {
                      latlng:pos.lat+','+pos.lng,
                      key:'AIzaSyA6R1wf4P5viLnCs8jNuxRIXPGr9OQfHAQ'}
                  
                    // console.log(that.params,'ss')
                      // console.log('cc',params)
                     
                
                // const params = 
                      

            }, function () {
                console.log("callback error");
            });
      },
      handlelocate(){
        this.getposition(this);
        this.getdata(this.params);
      }
     
    },
    created(){
      this.getposition(this);
      
    },
    mounted(){
         this.setdatali();
         const that = this;
         att(that);
         this.getdata();
        console.log(this.params)
    }

   
}
</script>


<style lang='scss' scoped>
@import '../../style/constants';
@import '../../style/mixins.scss';
div{
    font-size:.12rem
}
.wrapper{
  width: 100%;
  position:absolute;
  top:0;
  bottom:0;
  overflow: scroll;
//   padding: 0 .18rem 0 .18rem;
  box-sizing: border-box;
  background-size: 100% .78rem;
  // background-color:blue;
  transition:background-color .3s;
  .back{
    position:absolute;
    width: 100%;
    height:1rem;
    // margin-left: -.18rem;
    background: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0c8cee 40%);
    background-repeat: no-repeat;
    z-index:9;

  }
  .header{
    // background-color: red;
      position:absolute;
      top: 0;
      z-index:99;
      width: 100%;
      height: .7rem;
    //   height: .8 rem;
      .title{
          padding: 0 0.8rem 0 .8rem;
          box-sizing: border-box;
          @include ellipsis;
          margin: 0;
          text-align: center;
          height: 0.7rem;
          line-height: .7rem;
           color:#f3f3f3;
           font-size: 0.15rem;
           font-weight: normal;
           .daohang{
               font-size:.18rem;
               margin-right: 0.04rem;
    
           }
           .choose{
               margin-left: 0.06rem;
               font-size:.1rem;
               position: relative;
               top:-.01rem;
               display: inline-block;
               transform:scale(0.8)

           }
      }
      .newAdd{
        // background-color: red;
        position: absolute;
        right: 0.18rem;
        top: 50%;
        transform:translateY(-40%);
        color:white;
        font-size:.12rem;

      }
      .backbutton {
          position: absolute;
          left: 0.16rem;
          color:#f3f3f3;
          top: 50%;
          transform:translateY(-50%);
          font-size:.16rem;
          font-weight: bold;

      }
      .searchbox{
          width: 100%;
          box-sizing: border-box;
          padding: 0 .16rem;
      }
       &__search{
    position:relative;
    top:-.1rem;
    width: 100%;
    background: none;
    border-radius: .16rem;
    // border:.01rem solid #0c82db;
    // box-shadow: .0rem 0rem .03rem rgba(0,0,0,0.4);
    font-size:0;
    height: 0.25rem;
    display: flex;
    align-items: center;
    @include placeholder;
    .header__input{
      font-size:.14rem;
      // width: 100%;
      height: 0.26rem;
      border-radius: .16rem;
      line-height: .16rem;
      width: 100%;
      outline:None;
      background-color: white;
      // border:none;
       border:.01rem solid #0c82db;
    box-shadow: .0rem 0rem .03rem rgba(72, 71, 71, 0.4);
    padding: 0 0.2rem 0 .4rem;
      // background:none;
      
    }
    .header__input#pac-input{
      background-color: white;
      color: #3f3f3f;
    }
    
    .text{
      color:#B7B7B7;
    }
    .iconfont{
      position:absolute;
      font-size:16px;
      margin:0 .12rem 0 .16rem;
      color: #B7B7B7;
      
    }
       }
  }
  .addressList{
  width: 100%;
    padding: .3rem .16rem;
    box-sizing: border-box;
    .addresstitle{
      color:rgb(134, 132, 132);
      padding: 0 0 0.1rem 0;
      margin: 0;
      // font-size :0.16rem;
      font-weight: normal;
      font-size:.14rem;
      border-bottom: .01rem solid #f3f3f3;
      .iconfont{
        margin-right: 0.05rem;
      }
    }
    .addressul{
      list-style: none;
      padding: 0;
      margin: 0;
      .addressitem{
        width: 100%;
        box-sizing: border-box;
        border-bottom: .01rem solid #f3f3f3;
        padding:.1rem 0.16rem;
        font-size:.14rem;
        .content{
          // overflow: hidden;
          @include ellipsis
        }
        span{
          font-size:.12rem;
          color:rgb(134, 132, 132);
          margin-right: 0.2rem;
        }
      }
    }
  }
  .curaddress{
    width: 100%;
    padding: .3rem .16rem;
    box-sizing: border-box;
    position: relative;
    .locate{
      // border:.01rem solid rgb(17, 104, 20);
      // color:rgb(17, 104, 20);
      position: absolute;
      right: 0.16rem;
      top: .6rem;
      display: inline-block;
      height: 0.2rem;
      line-height: .2rem;
      padding: .03rem .05rem ;
      border-radius: .1rem;
      color:#09812b;
      .iconfont{
        font-size:.17rem;
        color:#09812b;
        position: relative;
        top:.02rem;
      }
    }
    .addresstitle{
      color:rgb(134, 132, 132);
      padding: 0 0 0.1rem 0;
      margin: 0;
      // font-size :0.16rem;
      font-weight: normal;
      font-size:.14rem;
      border-bottom: .01rem solid #f3f3f3;
      .iconfont{
        margin-right: 0.05rem;
        color:#09812b;
      }
    }
    .currentad{
        width: 100%;
        box-sizing: border-box;
        // border-bottom: .01rem solid #f3f3f3;
        padding:.1rem 0.16rem;
        font-size:.14rem;
  }

}
}


</style>