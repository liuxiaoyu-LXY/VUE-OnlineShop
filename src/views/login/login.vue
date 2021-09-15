<template>
    <div class='wrapper'>
       
        <div class='wrapper__icon'>
            <img src="http://www.dell-lee.com/imgs/vue3/user.png">
        </div>
        <div class='wrapper__input'>
            <input type='text' class='username' v-model = 'username' placeholder='请输入登录名'>
        </div>
        <div class='wrapper__input'>
            <input type='password' class='psw' v-model = 'password' placeholder='请输入密码' autocomplete="new-password">
        </div>
        <div class='wrapper__login--button' @click = setlogin>登陆</div>
        <div class='wrapper__bottom'>
            <a href="/#/register">立即注册</a>
            <a href="">忘记密码</a>
        </div>
        <Toast v-show = 'toastshow' :content='toastmsg'/>
</div>
</template>

<script>
// 系统import
import{useRouter} from 'vue-router'
import {reactive,provide,toRefs} from 'vue'
//自定义import
import toast,{controlToast} from '../../components/toast.vue'
import {post} from '../../utils/request.js'

const loginEffect = (setdata)=>{
    const router = useRouter();
    let data = reactive({
            username:'',
            password:''
    });
    const {username,password} = toRefs(data);
    const setlogin = async ()=>{
            try{
            const {username,password} = toRefs(data);
            if (username.value == '' || password.value == ''){
                const msg = '用户名及密码不能为空';
                setdata(msg);
                return 
            }

            const result = await post('http://jd/login', {
            username: username,
            password: password
        })
        console.log(result)
            if (result?.status === 200){
                localStorage.isLogin = true
                localStorage.username = username.value;
                router.push({ name: 'Home' })
            }
            else{
                const msg = '请求错误';
                setdata(msg)
            }
            } catch(e){
                const msg = `发送post错误:${e}`;
                setdata(msg)      
            }
        }
    return {username,password,setlogin}
}
export default({
    name:'Login',
    components:{ Toast:toast },
    setup(){

        const {toastshow,toastmsg,closeItem,setdata} = controlToast();
        provide('closeItem',closeItem)
        const {username,password,setlogin} = loginEffect(setdata);

        return {setlogin,username,password,toastshow,toastmsg,closeItem,setdata}
    }
})
</script>

<style lang='scss' scoped>


.wrapper{
    width: 2.95rem;
    margin: 0 auto;
    font-size:.16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.4rem;
    box-sizing: border-box;
    img{
        width: 0.66rem;
        height: 0.66rem;
        margin-bottom: 0.4rem;

    }
    &__input{
        width: 2.95rem;
        height: 0.48rem;
        background: #F9F9F9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: .06rem;
        margin-bottom: 0.16rem;
        input{
            border:none;
            outline:none;
            height: 100%;
            background: none;
            width: 100%;
            box-sizing: border-box;
            padding-left: 0.16rem;
            &::placeholder{
                color: rgba(0,0,0,0.5);
            }
        }
    }
    &__login--button{
        margin-top: 0.16rem;
        width: 100%;
        background: #0091FF;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        height: 0.48rem;
        line-height: .48rem;
        text-align:center;
        color:white;
        font-size:.16rem;
        margin-bottom: 0.16rem;

    }
    &__bottom{
        a{
            text-decoration: none;
            font-size: .14rem;
            color: rgba(0,0,0,0.50);
            letter-spacing: 0;
            padding: 0 .12rem;
            box-sizing: border-box;
            &:first-child{
                border-right:1px solid rgba(0,0,0,0.30);

            }
        }
        
    }
    

    
}
</style>
