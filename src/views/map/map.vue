<template>
  <div class='wrapper' ref="scrollel">
    
    <div class='back' >
    </div>

        <div class='header'>
     <h3 class='title'><span class='daohang iconfont'>&#xe9db;</span>新建收货地址</h3>

 <span class='backbutton iconfont' @click ='handleBack'>&#xe606;</span>
 </div>
 

  <div class="box" style='font-size:.12rem'>
    <div id="container"></div>
  <div class='searchItem'>
      <span class='iconfont'>&#xe694;</span>
   <input id="addressItem" class="controls inputbox" type="text" placeholder="请选择地址">
</div>
      <div class="form">
          <div class='formItem'>
            所在城市:<input type="text" name="city" id="city" v-model = "city" class="inputbox" placeholder='如北京市' />
          </div>
          <div class='formItem'>
            具体地址:<input type="text" name="detail" id="address" v-model="address" class="inputbox" />
          </div>
          <div class='formItem'>
            楼号-门牌号:<input type="text" name="apart" id="apart" v-model = "apartment" placeholder='如A号楼3层' class="inputbox" />
          </div>
          <div class='formItem'>
            收货人:<input type="text" name="name" v-model = "name" placeholder='请填写收货人姓名' class="inputbox" />
          </div>
          <div class='formItem'>
            联系电话:<input type="text" name="tel" v-model = "telephone" placeholder='请填写收货人手机号' class="inputbox" />
          </div>
          <div class='submit' @click = 'handlesubmit'>保存地址</div>
    </div>
    
    </div>
    </div>
</template>

<script>
// import AMap from 'AMap' // 引入高德地图
import google from 'google'
import {get,post} from '../../utils/request.js'
import {initAutocomplete} from './position.js'
function handleLocationError(browserHasGeolocation, infoWindow, pos,map) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: !The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
const URL = 'https://maps.googleapis.com/maps/api/geocode/json'
const params = {
latlng:'39.958339,116.313740',
key:'AIzaSyA6R1wf4P5viLnCs8jNuxRIXPGr9OQfHAQ'}

import {useRouter} from 'vue-router'

export default {
    data() {
        return {
            // 高德地图获取当前位置
            location: '',
            lat: 39.958339,
            lng: 116.313740,
            address:'',
            apartment:'',
            city:'',
            name:'',
            telephone:'',
      }
  },
  setup(){
      const router = useRouter()
       const handleBack = ()=>{
            router.back()

        }
      return {handleBack,router}


  },
  mounted () {
      this.initialPos();
    //   const map,marker;
     const map = this.initMaps({lat:Number(this.lat),lng:Number(this.lng)})
      initAutocomplete(map,this)
    // // this.findposition(map)
    // console.log(initAutocomplete,map)
    
    // console.log(params)
    params.latlng = this.lat+','+this.lng;
    this.getdata(params)
    // console.log(result)
  },
  methods: {
      initialPos(){
          if (this.$route.query.latlng){
          const [lat,lng] = this.$route.query.latlng.split(',')
          this.lat = lat;
          this.lng = lng;   
          }
      },
      async getdata (params){
            try{
                
                const result = await get(URL,params);
                
                if (result.status === 'OK' && result.results){
                    // console.log(result)
                    // {address_components,formatted_address} = result.results[0]
                    this.address = result.results[1].formatted_address
                    this.city = result.results[1].address_components[2].long_name;

                }
                else{
                    console.log('get nothing!')
                } 
            } catch(e){
                console.log('error,', e)
            }
        },
      
    initMaps(center) {
      const option = {
        zoom: 18,
        center,
        // center: { lng: 113.323037, lat: 23.092661 },
        disableDefaultUI: false,
        mapTypeId: 'roadmap'
      }
      const map = new google.maps.Map(document.getElementById('container'), option)
      new google.maps.Marker({
                position: center,
                map: map,
                title: "Current position",
                 label: "Now",
                animation: google.maps.Animation.DROP
                });
      return map
    },
    findposition(map){
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(pos,'pos')
                let marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: "Current position",
                 label: "Now",
                animation: google.maps.Animation.DROP
                });
                marker.addListener("click", function() {
                console.log('hi')
            });
                infoWindow.setPosition(pos);
                map.setCenter(pos);

            }, function () {
                console.log("callback error");
                handleLocationError(true, infoWindow,  map.getCenter(),map);
            });
        } else {
            console.log("callback False");
            handleLocationError(false, infoWindow,  map.getCenter(),map);
        }
        
},
async handlesubmit (){

        try{
            const result = await post('http://jd/address', {
            address:this.address,
            city:this.city,
            apartment:this.apartment,
            name:this.name,
            telephone:this.telephone,
            
        })
    

            if (result?.status === 200){
                // console.log(result)
                const latlng = this.lat+','+this.lng
                this.$store.state.address = this.address
                this.$router.push({path:'/',query:{latlng}})
                // this.$router.push({name:'Home',query:{latlng:this.lat+','+this.lng,})
                // clearall(shopid)
            }
            else{
                const msg = '请求错误';
                console.log(msg)
                // setdata(msg)
            }
            } catch(e){
                console.log(e)
                // const msg = `发送post错误:${e}`;     
                // setdata(msg)
            }
        }
   
  },
  watch : {
    '$route' (to, from) {
        console.log(from,to)
        // from 对象中要 router 来源信息.
        // do your want
    }
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
    height:.8rem;
    // margin-left: -.18rem;
    background: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0c8cee 45%);
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
               font-size:.17rem;
               margin-right: 0.06rem;
    
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
       .backbutton {
          position: absolute;
          left: 0.16rem;
          color:#f3f3f3;
          top: 50%;
          transform:translateY(-50%);
          font-size:.16rem;
          font-weight: bold;

      }
}
  .box{
      width: 100%;
  
      margin-top:.75rem;
    //   background-color: red;
      #container{
          width: 96%;
          margin:0 auto;
          height: 1.5rem;
          font-size:.12rem;
          border-radius: .1rem;
      }
      .searchItem{
        // background-color: yellow;
        padding: .2rem .18rem;
        font-size:.14rem;
        position: relative;
        #addressItem{
            border:.01rem solid #4e9be3;
            width: 100%;
            padding: 0 .3rem;
            box-sizing: border-box;
            height: 0.3rem;
            color:#4e9be3;
            outline:none;
            border-radius: .15rem;
            &::placeholder{
                color:#4e9be3;
            }
        }
            .iconfont{
                position: absolute;
                left: .25rem;
                top: .25rem;
                color:#4e9be3;
            }
          
      }
      .form{
          margin-top: 0;
          width: 100%;
          padding: 0.02rem .18rem;
          font-size:.14rem;
          box-sizing: border-box;
          .submit{
              background-color: #4e9be3;
              width: 90%;
              height: 0.36rem;
              margin: 0 auto;
              line-height: 0.36rem;
              font-size:.16rem;
              color:white;
              text-align: center;
              box-shadow:0 0 0.05rem rgba(0,0,0,0.5)
          }
          .formItem{
              height: 0.25rem;
              width: 100%;
              font-size:.12rem;
              margin-bottom: .25rem;
              color:#666;
              padding-right: 0.05rem;
              display:flex;
              line-height: 0.25rem;
            //   border-bottom: .01rem solid #999;
              input{
                  margin-top: 0.02rem;
                  outline:none;
                  border:none;
                padding-left: .2rem;

                  border-bottom: .01rem solid #f3f3f3;
                //   width: 100%;
                flex:1;
                  height: 0.25rem;
                  font-size:.14rem;
                  box-sizing: border-box;
                  color:#333;
              }
          }
      }
  }
}


</style>