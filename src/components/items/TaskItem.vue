<template>
    <div v-if="taskItem">
        <div class="taskItem" v-if="taskItem.task"
            @click="handleTaskClick(taskItem.pId,taskItem.mId,taskItem.task.tId)">
            <span :class="{'choosed':taskItem.task.done, 'noChoose':!taskItem.task.done, 'icon':true}"></span>
            <p>{{taskItem.task.tName}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        taskItem: {
            type: Object,
            default: () => {
                return null;
            }
        }
    },
    methods: {
        handleTaskClick(pId,mId,tId){
            this.$router.push({
                name: 'taskDetail',
                query: {
                    pId: pId,
                    mId: mId,
                    tId: tId
                }
            })
        }
    },
    // beforeCreate() {
    //     console.log('TaskItem.vue beforeCreate');
    // },
    // created() {
    //     console.log('TaskItem.vue Created');
    // },
    // beforeMount() {
    //     console.log('TaskItem.vue beforeMount');
    // },
    mounted() {
        console.log('TaskItem.vue mounted');
    },
    // beforeUpdate() {
    //     console.log('TaskItem.vue beforeUpdate');
    // },
    updated() {
        console.log('TaskItem.vue updated');
    },
    // beforeDestroy() {
    //     console.log('TaskItem.vue beforeDestroy');
    // },
    destroyed() {
        console.log('TaskItem.vue destroyed');
    },
}
</script>
<style scoped>
.taskItem{
    margin-top: 10px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
p{
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.choosed{
    background-position: -120px -24px;
}
.noChoose{
    background-position: -96px -24px;
}
</style>