import { createRouter, createWebHistory } from 'vue-router'
// createWebHashHistory,createWebHistory
const UserHome = { template: '' }
const routes = [
  {
    path:'/',
    name:'Home',
    component:()=>import(/* webpackChunkName:"home" */ '../views/home/Home.vue'),
  
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import(/* webpackChunkName:"Login" */ '../views/login/login.vue'),
  
    beforeEnter(to,from,next){
      (localStorage.isLogin)? next({name:'Home'}):next()
    }
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import(/* webpackChunkName:"Register" */ '../views/register/register.vue'),
   
    beforeEnter(to,from,next){
      (localStorage.isLogin)? next({name:'Home'}):next()
    }
  },
  {
    path:'/order/:id',
    name:'Order',
    component:()=>import(/* webpackChunkName:"Order" */ '../views/order/Order.vue'),
  
  
  },
  {
    path:'/history',
    name:'History',
    component:()=>import(/* webpackChunkName:"History" */ '../views/history/History.vue'),
  
  },
  {
    path:'/shop/:id',
    name:'Shop',
    component:()=>import(/* webpackChunkName:"Shop" */ '../views/shop/Shop.vue'),
   
    children: [
      { path: '', component: UserHome },

      { path: 'search', component:
      ()=>import(/* webpackChunkName:"Shop" */ '../views/shop/children/search.vue')}]
  },
  {
    path:'/cartlist',
    name:'Cart',
    component:()=>import(/* webpackChunkName:"Cart" */ '../views/cartlist/Cart.vue')
    
  },
  {
    path:'/address',
    name:'Address',
    component:()=>import(/* webpackChunkName:"Cart" */ '../views/address/address.vue'),
   

  },

{
  path:'/address/add',
  name:'AddressAdd',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/address/addNew.vue'),
  
},

{
  path:'/detail',
  name:'Detail',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/details/details.vue'),
  
},{
  path:'/map',
  name:'Map',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/map/map.vue'),
},
{
  path:'/position',
  name:'AddressChoose',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/map/address.vue'),
},
{
  path:'/search',
  name:'Search',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/search/search.vue'),
},
{
  path:'/personal',
  name:'Person',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/personal/personal.vue'),
},
{
  path:'/benefit',
  name:'Benefit',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/personal/benefit.vue'),
},
{
  path:'/orderhistory/:id',
  name:'OrderHistory',
  component:()=>import(/* webpackChunkName:"Cart" */ '../views/history/historyItem.vue'),
}




]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  (localStorage.isLogin || to.name == 'Login'||to.name == 'Register') ? next():next({name:'Login'})
  
})

export default router
