<template>
    <div class="banner-wrap">
        <div class="banner">
            <span class="banner-people" v-if="home"></span>
            <span class="banner-back" v-if="!home" @click="handleBack"></span>
            <h1>{{title}}</h1>
            <span class="icon banner-home" v-if="!search" @click="handleHome"></span>
            <span class="icon banner-search" v-if="search" @click="handleSearch"></span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        home: {
            type: Boolean,
            default: false
        },
        search: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleBack(){
            this.$router.back(-1);
        },
        handleHome(){
            this.$router.push({
                name: 'team'
            })
        },
        handleSearch(){
            this.$router.push({
                name: 'search'
            })
        }
    },
    // beforeCreate() {
    //     console.log('Banner.vue beforeCreate');
    // },
    // created() {
    //     console.log('Banner.vue Created');
    // },
    // beforeMount() {
    //     console.log('Banner.vue beforeMount');
    // },
    // mounted() {
    //     console.log('Banner.vue mounted');
    //     console.log(this.$route);
    // },
    // beforeUpdate() {
    //     console.log('Banner.vue beforeUpdate');
    // },
    // updated() {
    //     console.log('Banner.vue updated');
    // },
    // beforeDestroy() {
    //     console.log('Banner.vue beforeDestroy');
    // },
    // destroyed() {
    //     console.log('Banner.vue destroyed');
    // },
}
</script>
<style scoped>
.banner-wrap{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
}
.banner{
    height: 44px;
    padding: 0 12px;
    background: #4C6FB0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.banner-people{
    background: url('../../images/photo.png') no-repeat;
    background-size: contain;
    width: 40px;
    height: 40px;
}
.banner-back{
    background: url('../../images/big_img.png') no-repeat -24px -24px;
    background-size: 240px 240px;
    width: 24px;
    height: 24px;
}
.banner-search{
    background-position: -48px -24px;
}
.banner-home{
  background: url('../../images/house.png') no-repeat 0 0;
  background-size: contain;
  width: 40px;
  height: 40px;
}
</style>