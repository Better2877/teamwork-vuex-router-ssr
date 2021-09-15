<template>
    <div class="projectList">
        <ul v-if="projects.length>0">
            <li v-for="(item, index) in projects" class="projectListItem" @click="handleProjectClick(item.pId)">
                <span class="icon projectListIcon"></span>
                <p>{{item.pName}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            flag: false,
            proList: []
        }
    },
    computed: {
        ...mapState({
            projectData: 'projectData',
            pId: 'pId'
        }),
        myProjectData(){
            return this.projectData.filter(item => {
                return item.pId == this.pId;
            });
        },
        projects: {
            get(){
                return this.flag ? this.proList : this.projectData;
            },
            set(v){
                this.proList = v;
            }
        }
    },
    methods: {
        handleProjectClick(pId){
            this.$router.push({
                name: 'projectDetail',
                query: {
                    pId: pId
                }
            });
        },
        toggleData(val){
            this.flag = true;
            if(val == 0){
                this.projects = this.projectData;
            }else{
                this.projects = this.myProjectData;
            }
        }
    },
    // beforeCreate() {
    //     console.log('ProjectList.vue beforeCreate');
    // },
    // created() {
    //     console.log('ProjectList.vue Created');
    // },
    // beforeMount() {
    //     console.log('ProjectList.vue beforeMount');
    // },
    mounted() {
        console.log('ProjectList.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('ProjectList.vue beforeUpdate');
    // },
    updated() {
        console.log('ProjectList.vue updated');
    },
    // beforeDestroy() {
    //     console.log('ProjectList.vue beforeDestroy');
    // },
    destroyed() {
        console.log('ProjectList.vue destroyed');
    },
}
</script>
<style scoped>
.projectList{
    padding-top: 10px;
}
.projectListItem{
    height: 38px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.projectListIcon{
    background-position: -192px -24px;
}
p{
    flex: 1;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 8px;
}
</style>