<template>
    <div class="search">
        <Banner title="查找"></Banner>
        <div class="search-wrap">
            <form class="search-form" action="">
                <span class="icon search-icon"></span>
                <input class="search-text" type="text" name="" id="" :placeholder="pHolder">
                <input class="search-button" type="button" value="查找">
            </form>
        </div>
    </div>
</template>
<script>
import Banner from '../components/items/Banner.vue'
export default {
    data(){
        return {
            pHolder: '请输入筛选内容'
        }
    },
    components: {
        Banner
    },
    beforeCreate() {
        console.log('Search.vue beforeCreate');
    },
    created() {
        console.log('Search.vue Created');
    },
    beforeMount() {
        console.log('Search.vue beforeMount');
    },
    mounted() {
        console.log('Search.vue mounted');
        console.log(this.$route);
    },
    beforeUpdate() {
        console.log('Search.vue beforeUpdate');
    },
    updated() {
        console.log('Search.vue updated');
    },
    beforeDestroy() {
        console.log('Search.vue beforeDestroy');
    },
    destroyed() {
        console.log('Search.vue destroyed');
    },
}
</script>
<style scoped>
input{
    border: none;
    padding: 0 4px;
}
.search{
    width: 100%;
}
h1{
    width: 100%;
    height: 44px;
    background: #4C6FB0;
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
}
.search-wrap{
    margin: 44px 0 0;
}
.search-form{
    background: #4C6FB0;
    position: relative;
    height: 50px;
    padding: 0 8px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-icon{
    position: absolute;
    left: 12px;
}
.search-text{
    height: 30px;
    line-height: 30px;
    flex: 1;
    border-radius: 10px;
    text-indent: 28px;
    margin-right: 8px;
}
.search-button{
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
}
</style>