
import {useStore} from 'vuex';
import {controlToast} from '../../components/toast.vue'

export const handleCart = function(){
    const store = useStore();
    const cartList = store.state.cartList;
    const {toastshow,toastmsg,closeItem,setdata} = controlToast();
    // const {cartList} = toRefs(store.state);
    
    const addItemCart =(shopid,productid,productinfo,num,shopname,index,sale,limit)=>{
           
        if (num>0 && sale && cartList?.[shopid]?.productList?.[productid]?.count == limit ){
            const msg = `超值商品限购${limit}件，超出将恢复原价`
            setdata(msg)
        }
        //     console.log(cartList[shopid].productList[productid].count)
        // }
    // console.log('sd',$event.target,'ssss')
   
    store.commit('addItem',{shopid,productid,productinfo,num,shopname})
}
    return {cartList,addItemCart,toastshow,toastmsg,closeItem}
    
}
export const Content = {
    menulist:[
        { name:'全部商品', tab:'all',id:1 },

        {name:'秒杀折扣', tab:'seckill', id:3 },
        { name:'新鲜水果', tab:'fruit', id:2 },
        {
            name:'肉禽蛋奶',tab:'food',id:4
        },{
            name:'时令蔬菜',tab:'veg',id:5
        },{
            name:'美妆服饰',tab:'makeup',id:6
        },{
            name:'零食饮料',tab:'beverage',id:7
        },{
            name:'宠物用品',tab:'pets',id:8
        },{
            name:'非处方药',tab:'medicine',id:9
        }]
    }