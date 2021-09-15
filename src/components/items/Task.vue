<template>
    <div class="task">
        <div class="undone" v-if="undone.length>0">
            <h2 @click="toggleUndoneShow"><span>{{undoneShowed}}</span>未完成的任务</h2>
            <ul v-if="undoneShow">
                <li v-for="(item,index) in undone" :key="index">
                    <TaskItem :task-item="item"></TaskItem>
                </li>
            </ul>
        </div>
        <div class="done" v-if="done.length>0">
            <h2 @click="toggleDoneShow"><span>{{doneShowed}}</span>已完成的任务</h2>
            <ul v-if="doneShow">
                <li v-for="(item,index) in done" :key="index">
                    <TaskItem :task-item="item"></TaskItem>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import TaskItem from './TaskItem'
export default {
    props: {
        tasks: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    components: {
        TaskItem
    },
    data(){
        return {
            undoneShow: true,
            undoneShowed: '隐藏',
            doneShow: false,
            doneShowed: '查看'
        }
    },
    computed: {
        middleTask() {
            let res = [], pId = '', mId = '',
                len = this.tasks.length,
                taskItem = [];
            for(let i=0; i<len; i++){
                pId = this.tasks[i].pId;
                mId = this.tasks[i].mId;
                taskItem = this.tasks[i].tasks;
                for(let j=0; j<taskItem.length; j++){
                    res.push({
                        pId: pId,
                        mId: mId,
                        task: taskItem[j]
                    });
                }
            }
            return res;
        },
        done(){
            return this.middleTask.filter(item => {
                return item.task.done;
            })
        },
        undone(){
            return this.middleTask.filter(item => {
                return !item.task.done;
            })
        }
    },
    watch: {
        'doneShow'(){
            this.doneShowed = this.doneShow ? '隐藏' : '查看';
        },
        'undoneShow'(){
            this.undoneShowed = this.undoneShow ? '隐藏' : '查看';
        }
    },
    methods: {
        toggleUndoneShow(){
            this.undoneShow = !this.undoneShow;
        },
        toggleDoneShow(){
            this.doneShow = !this.doneShow;
        }
    },
    // beforeCreate() {
    //     console.log('Task.vue beforeCreate');
    // },
    // created() {
    //     console.log('Task.vue Created');
    // },
    // beforeMount() {
    //     console.log('Task.vue beforeMount');
    // },
    mounted() {
        console.log('Task.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('Task.vue beforeUpdate');
    // },
    updated() {
        console.log('Task.vue updated');
    },
    // beforeDestroy() {
    //     console.log('Task.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Task.vue destroyed');
    },
}
</script>
<style scoped>
.task{
    
}
h2{
    padding-top: 10px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
}
</style>