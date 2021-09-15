<template>
    <div class='wrapper'>
       
        <div class='wrapper__icon'>
            <img src="http://www.dell-lee.com/imgs/vue3/user.png">
        </div>
        <div class='wrapper__input'>
            <input type='text' class='username' placeholder='请输入登录名'
            v-model='username'>
        </div>
        <div class='wrapper__input'>
            <input type='password' class='psw' placeholder='请输入密码'
            v-model='password'>
        </div>
        <div class='wrapper__input'>
            <input type='password' class='pswC' placeholder='请确认密码'
            v-model='confirm'>
        </div>
        <div class='wrapper__register--button' @click = setRegister>注册</div>
        <div class='wrapper__bottom'>
            <a href="/#/login">已有账号去登陆</a>
        </div>
        <Toast v-show = 'toastshow' :content='toastmsg'/>
</div>
</template>

<script>
import{useRouter} from 'vue-router'
import {reactive,provide,toRefs} from 'vue'
//自定义import
import toast,{controlToast} from '../../components/toast.vue'
import {post} from '../../utils/request.js'
const registerEffect = (setdata)=>{
    const router = useRouter();
    let data = reactive({
            username:'',
            password:'',
            confirm:''
    });
    const {username,password,confirm} = toRefs(data);
    const setRegister = async ()=>{
            try{
           
            if (username.value == '' || password.value == ''){
                const msg = '用户名及密码不能为空';
                setdata(msg);
                return 
            }
            else if (confirm.value!=password.value){
                const msg = '两次输入密码不一致';
                setdata(msg);
                return 
            }

            const result = await post('/api/user/register', {
            username: username,
            password: password,
            confirm:confirm
        })
            if (result?.errno === 0){
                router.push({ name: 'Login' })
            }
            else{
                const msg = '注册错误';
                setdata(msg)
            }
            } catch(e){
                const msg = `注册发送post错误:${e}`;
                setdata(msg)      
            }
        }
    return {username,password,confirm,setRegister}
}
export default({
    name:'Register',
    components:{ Toast:toast },
    setup(){
        const {toastshow,toastmsg,closeItem,setdata} = controlToast();
        provide('closeItem',closeItem)
        const {username,password,confirm,setRegister} = registerEffect(setdata);

        return {setRegister,confirm,username,password,toastshow,toastmsg,closeItem,setdata}
    },
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
    &__register--button{
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
        
        }
        
    }
    

    
}
</style>
