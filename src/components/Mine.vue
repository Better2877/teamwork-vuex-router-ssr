<template>
    <div class="home">
        <Banner home title="我的任务"></Banner>
        <ul id="tasks" @click="toggle">
            <li class="actived mine">我的任务</li>
            <li>我发起的任务</li>
        </ul>
        <keep-alive>
            <Task class="tasks" :tasks="tasks" :key="hash"></Task>
        </keep-alive>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Banner from './items/Banner'
import Task from './items/Task'
export default {
    components: {
        Banner,
        Task
    },
    data(){
        return {
            mineOpt: true
        }
    },
    computed: {
        ...mapState({
            taskData: 'taskData',
            ownId: 'ownId'
        }),
        tasks(){
            let myTaskTemp = this.taskData.filter(item => {
                return item.mId == this.ownId;
            })
            let temp = this.mineOpt ? this.taskData : myTaskTemp;
            return temp;
        },
        hash(){
            return this.mineOpt ? 'task' : 'myTask'
        }
    },
    methods: {
        toggle(ev){
            let e = ev || window.event;
            let target = e.target || e.srcElement;
            if(target && target.classList.contains('mine')){
                this.mineOpt = true;
            }else{
                this.mineOpt = false;
            }
            let ULChild = document.getElementById('tasks').children;
            let len = ULChild.length;
            for(let i=0; i<len; i++){
                ULChild[i].classList.toggle('actived');
            }
        }
    },
    // beforeCreate() {
    //     console.log('Mine.vue beforeCreate');
    // },
    // created() {
    //     console.log('Mine.vue Created');
    // },
    // beforeMount() {
    //     console.log('Mine.vue beforeMount');
    // },
    mounted() {
        console.log('Mine.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('Mine.vue beforeUpdate');
    // },
    updated() {
        console.log('Mine.vue updated');
    },
    // beforeDestroy() {
    //     console.log('Mine.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Mine.vue destroyed');
    },
}
</script>
<style scoped>
.home{
}
ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
li{
    flex: 1;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #4C6FB0;
}
#tasks{
    padding-top: 54px;
    margin: 0 12px;
}
.tasks{
    margin: 0 12px 55px;
}
</style>