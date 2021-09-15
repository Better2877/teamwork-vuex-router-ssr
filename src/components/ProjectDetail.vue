<template>
    <div class="projectDetail">
        <Banner title="项目详情" search></Banner>
        <ProjectItem class="projectItem" ref="pItem"></ProjectItem>
    </div>
</template>
<script>
import Banner from './items/Banner'
import ProjectItem from './items/ProjectItem'
export default {
    data(){
        return {
        }
    },
    components: {
        Banner,
        ProjectItem
    },
    beforeRouteEnter (to, from, next) {
        console.log('****', to);
        console.log('----', from);
        if(from.name != null){
            next(vm => {
                console.log('**********ProjectDetail.vue beforeRouteEnter');
                vm.$refs.pItem.setChoose(to.query);
                console.log('&&&&&&to.query.pId', to.query.pId);
                console.log('&&&&&&', vm.$refs.pItem.pId);
            });
        }
    },
    // beforeCreate() {
    //     console.log('ProjectDetail.vue beforeCreate');
    // },
    // created() {
    //     console.log('ProjectDetail.vue Created');
    // },
    // beforeMount() {
    //     console.log('ProjectDetail.vue beforeMount');
    // },
    mounted() {
        console.log('ProjectDetail.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('ProjectDetail.vue beforeUpdate');
    // },
    updated() {
        console.log('ProjectDetail.vue updated');
    },
    // beforeDestroy() {
    //     console.log('ProjectDetail.vue beforeDestroy');
    // },
    destroyed() {
        console.log('ProjectDetail.vue destroyed');
    },
}
</script>
<style scoped>
.projectItem{
    margin: 0 12px;
}
.timeLineWrap{
    margin: 0 12px;
}
h2{
    font-size: 0;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
}
.importantTime{
    background-position: -120px -48px;
}
.timeLine{
    margin: 0 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    font-size: 0;
}
.timeLine li{
    position: relative;
    text-align: center;
    flex: 1;
}
hr{
    width: 100%;
    position: absolute;
    top: 29px;
    z-index: 0;
    margin: 0;
}
.left hr{
    width: 50%;
    right: 0;
}
.right hr{
    width: 50%;
    left: 0;
}
.timeLineTime{
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}
.timeLineTitle{
    font-size: 14px;
    height: 20px;
    line-height: 20px;
}
.circle{
    display: inline-block;
    width: 0;
    height: 0;
    margin: 0 auto;
    border: 10px solid #4C6FB0;
    border-radius: 50%;
    z-index: 1;
}
.full{
    border-color: #FF9800;
}
.part1{
    border-color: #FF9800 #4C6FB0 #4C6FB0;
}
.part2{
    border-color: #FF9800 #FF9800 #4C6FB0 #4C6FB0;
}
.part3{
    border-color: #FF9800 #FF9800 #FF9800 #4C6FB0;
}
</style>