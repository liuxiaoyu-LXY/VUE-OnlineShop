import axios from 'axios'
const instance = axios.create({
    baseURL:'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
    // baseURL:'https://www.jd',
    timeout: 10000,
})
export const post = (url, data={})=>{
    return new Promise((resolve,reject)=>{
        instance.post(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    }).then((response)=>{
        
        resolve(response.data)
    },err=>{
        reject(err)
    })
})
}


export const get = (url, params={})=>{
    return new Promise((resolve,reject)=>{
        instance.get(url,{params}).then((response)=>{
    //   console.log(response,'rr')
    // console.log('get 'params)
        resolve(response.data)
    },err=>{
        reject(err)
    })
})
}

export const getCategoryData = (url, params={})=>{
    return new Promise((resolve,reject)=>{
        instance.get(url,{params}).then((response)=>{
            const ind = params.category;
            const dataarr = response.data.data;
            let data = []
            // console.log(dataarr,ind)
            for (let item of dataarr){
                if (item.category == ind){
                    data .push(item)
                    
                }
            }
            if (data.length>0){
                response.data.data = data
            }

        resolve(response.data)
    },err=>{
        reject(err)
    })
})
}

export const getsortData = (url, params={})=>{
    return new Promise((resolve,reject)=>{
        instance.get(url,{params}).then((response)=>{
            const {sale,supporter} = params;
            
            const dataarr = response.data.data;
            let data = []

            // console.log(dataarr,ind)
            for (let item of dataarr){

                if (! sale || item.sale && sale){
                    // console.log(supporter)
                    let judge = true
        
                    for (let key in supporter){
                        
                        if (key==0 && !item.isRange){
                            judge = false
                            break

                        }
                        else if (key == 1 && item.expressPrice){
                            judge = false
                            break
                        }
                        else if (key == 2 && item.expressLimit){
                            judge = false
                            break
                        }
                       
                    }
                    if (judge){
                        data.push(item)
                    }

                
                    
                }
            }
            // console.log(data)
            if (data.length>0){
                response.data.data = data
            }
            
            // console.log(response.data)

        resolve(response.data)
    },err=>{
        reject(err)
    })
})
}
// export const getsearch = (url,params={})=>{

// }
export const getProduct = (url, params={})=>{
    return new Promise((resolve,reject)=>{
        instance.get(url,{params}).then((response)=>{
        const {Tab} = params;
        const dataarr = response.data.data;
        let arr = []
        if (Tab!='all'){
        for (let item of dataarr){
            if (Tab == 'seckill' && item.sale){
                arr.push(item)
                
            }
            else{
                if (item.tab == Tab){
                    arr.push(item)
                }
            }

        }
        // console.log(arr)
        response.data.data = arr
    }
        
        resolve(response.data)
    },err=>{
        reject(err)
    })
})
}
