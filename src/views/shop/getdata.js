import {useRoute,reactive} from 'vue'
import {getProduct,toRefs,watchEffect} from "../../utils/request.js"

export const handledata = function (curTab){
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
