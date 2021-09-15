export const defaults = {

sortContent : [{
    text:'综合排序',
    index:0,
    show:true,
    iconfont:'&#xe61e;'
},{
    text:'评分最高',
    index:1,
    show:false,
    iconfont:'&#xe661;'
},{
    text:'距离最近',
    index:2,
    show:false,
    iconfont:'&#xe6c5;'
},{
    text:'起送价最低',
    index:3,
    show:false,
    iconfont:'&#xe625;'
}],

servicearr : [{
    id:0,
    text:'支持自提',
    judge:'isRange'
},{
    id:1,
    text:'减配送费',
    judge:'expressPrice'

},{
    id:2,
    text:'0元起送',
    judge:'expressLimit'

},{
    id:3,
    text:'准时保',
    judge:'time'
    
}]
}