<template>
    <div class='searchbox'>
    <Products  :search='searchcontent'></Products>
    </div>
</template>

<script>
import Products from '../../../components/productscroll.vue'
import {useRoute} from 'vue-router'
import {ref} from 'vue'
export default {
    name:'ShopSearch',
    components:{Products},
    setup(){
        const route = useRoute();
        const searchcontent = ref(route.query.content)
        return {searchcontent}

    }
}
</script>

<style lang='scss' scoped>
.searchbox{
    position: absolute;
    top: 0.65rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index:999999;

}
</style>