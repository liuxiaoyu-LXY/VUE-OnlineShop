<template>
        <div class=adbox>
            <span class='name'>{{item.name}}</span>
            <span class='tel'>{{item.tel}}</span>
            <p class='address'>{{item.address}}</p>
            <span class='iconfont next'>&#xe606;</span>
        </div>
</template>

<script>
export default {
    name:'Addbox',
    props:['item']

}
</script>

<style lang='scss' scoped>
.adbox{
    width: 100%;
    position:relative;
    height: 1.04rem;
    background: #FFFFFF;
    border-radius: .04rem;
    font-size: .14rem;
    box-sizing: border-box;
    padding: .18rem .16rem .18rem .2rem;
    margin-bottom: 0.16rem;
    span{
        color: #999999;
    }
    .name{
        margin-right: 0.66rem;
    }
    .address{
        width: 2.6rem;
        line-height: .2rem;
    }
    .next{
        display: block;
        transform:rotate(180deg);
        position:absolute;
        right: .05rem;
        top: 0.44rem;


    }
}
</style>