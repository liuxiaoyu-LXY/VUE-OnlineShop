import Mock from 'mockjs'

function nearbyShopData(){
    const data = Mock.mock({
        errno:0,
        data:[{
        expressLimit: 0,
        expressPrice: 0,
        inRange:true,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/near.png",
        name: "沃尔玛",
        sales: 10000,
        slogan: "免费配送到家",
        sale:true,
        time:'33分钟',
        distance:'1.6km',
        category:0,
        _id:1},
        {expressLimit: 0,
        expressPrice: 0,
        inRange:true,
        imgUrl: "https://img0.baidu.com/it/u=1536161290,3696252438&fm=26&fmt=auto&gp=0.jpg",
        name: "山姆会员商店",
        sales: 10000,
        slogan: "联合利华洗护满10减5",
        sale:false,
        time:'25分钟',
        category:3,
        distance:'1.2km',
        _id:2},
        {expressLimit: 0,
        expressPrice: 10,
        inRange:true,
        imgUrl: "https://img1.baidu.com/it/u=2129282477,2664464421&fm=26&fmt=auto&gp=0.jpg",
        name: "家乐福",
        sales: 5000,
        slogan: "阳山水蜜桃买一箱送一箱",
        category:3,
        time:'45分钟',
        distance:'3km',
        sale:true,
        _id:3},
        {expressLimit: 15,
            expressPrice: 0,
            imgUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180721%2F6221a51a72d64d448c4e83ff3790362c.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632433919&t=c8a8ae5c5113e17d7240d5df4bd7efac",
            name: "苏宁易购",
            inRange:true,
            sales: 5000,
            slogan: "免费配送到家",
            time:'53分钟',
            distance:'3.5km',
            category:0,
            sale:true,
            _id:4},
        {expressLimit: 20,
        expressPrice: 10,
        imgUrl: "https://img2.baidu.com/it/u=2144952532,3605231324&fm=26&fmt=auto&gp=0.jpg",
        name: "丝芙兰",
        inRange:true,
        sales: 5000,
        slogan: "线上美妆满5000送LAMER小样",
        sale:false,
        time:'55分钟',
        category:3,
        distance:'4.5km',
        _id:5},
        {expressLimit: 20,
            expressPrice: 15,
            imgUrl: "https://img1.baidu.com/it/u=1205643086,3596737680&fm=26&fmt=auto&gp=0.jpg",
            name: "大统华",
            inRange:false,
            sales: 3000,
            category:0,
            slogan: "香港美心月饼开始预定",
            sale:false,
            time:'33分钟',
            distance:'1.6km',
            _id:6},
        {expressLimit: 50,
                expressPrice: 35,
                imgUrl: "https://img2.baidu.com/it/u=1732035019,2947824014&fm=26&fmt=auto&gp=0.jpg",
                name: "H&M",
                inRange:false,
                sales: 2000,
                slogan: "秋季新品开始上市",
                sale:false,
                category:3,
                time:'33分钟',
                distance:'1.6km',
                _id:7},]
    
})
    return data
}


function bannerData (){
    const data = Mock.mock({
        errno:0,
        data:[
            {url:"https://www.tntsupermarket.com/media/mageplaza/bannerslider/banner/image/p/c/pc-home-bnr-east-cn3.jpg",
            _id:6},
            {url:"https://www.tntsupermarket.com/media/mageplaza/bannerslider/banner/image/e/-/e-hm-tc2.jpg",
        _id:1},
        {
            url:"https://www.tntsupermarket.com/media/mageplaza/bannerslider/banner/image/a/r/artboard_1_9.jpg",
            _id:2
        }
        ]
    })
    return data
}
export {nearbyShopData,bannerData}