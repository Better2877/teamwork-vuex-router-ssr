<template>
    <div class="detail">
        <router-view class="content"></router-view>
    </div>
</template>
<script>
export default {
    methods: {
    },
    beforeCreate() {
        console.log('Detail.vue beforeCreate');
    },
    created() {
        console.log('Detail.vue Created');
    },
    beforeMount() {
        console.log('Detail.vue beforeMount');
    },
    mounted() {
        console.log('Detail.vue mounted');
        console.log(this.$route);
    },
    beforeUpdate() {
        console.log('Detail.vue beforeUpdate');
    },
    updated() {
        console.log('Detail.vue updated');
    },
    beforeDestroy() {
        console.log('Detail.vue beforeDestroy');
    },
    destroyed() {
        console.log('Detail.vue destroyed');
    },
}
</script>
<style scoped>
.detail{

}
.content{
    padding-top: 44px;
}
</style>