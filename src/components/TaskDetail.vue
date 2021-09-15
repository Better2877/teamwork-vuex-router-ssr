<template>
    <div class="taskDetail">
        <Banner title="任务详情" search></Banner>
        <ProjectItem class="opt" ref="tpItem"></ProjectItem>
        <div>
            <hr/>
            <h3>
                <span class="icon taskDynamic"></span>
                <p>任务动态</p>
            </h3>
            <Operation class="opt" :operations="operations"></Operation>
        </div>
    </div>
</template>
<script>
import Banner from './items/Banner'
import ProjectItem from './items/ProjectItem'
import Operation from './items/Operation'
import {mapState} from 'vuex'
export default {
    components: {
        Banner,
        ProjectItem,
        Operation
    },
    computed: {
        ...mapState({
            operations: 'dynamicData'
        })
    },
    beforeRouteEnter (to, from, next) {
        console.log('****', to);
        console.log('----', from);
        if(from.name != null){
            next(vm => {
                console.log('**********TaskDetail.vue beforeRouteEnter');
                console.log('*&*&*&*& to.query', to.query);
                vm.$refs.tpItem.setChoose(to.query, true);
            });
        }
    },
    // beforeCreate() {
    //     console.log('TaskDetail.vue beforeCreate');
    // },
    // created() {
    //     console.log('TaskDetail.vue Created');
    // },
    // beforeMount() {
    //     console.log('TaskDetail.vue beforeMount');
    // },
    mounted() {
        console.log('TaskDetail.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('TaskDetail.vue beforeUpdate');
    // },
    updated() {
        console.log('TaskDetail.vue updated');
    },
    // beforeDestroy() {
    //     console.log('TaskDetail.vue beforeDestroy');
    // },
    destroyed() {
        console.log('TaskDetail.vue destroyed');
    },
}
</script>
<style scoped>
.taskDetail {
    
}
h3{
    margin: 10px 12px 0px;
    height: 30px;
    line-height: 30px;
    font-size: 0;
}
p{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    vertical-align: middle;
    margin-left: 8px;
}
.taskDynamic{
    background-position: -144px -48px;
}
.opt{
    margin: 0 12px;
}
</style>