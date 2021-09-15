<template>
    <div class="project">
        <Banner home title="我的项目"></Banner>
        <ul id="projects">
            <li class="actived">我的项目</li>
            <li>我负责的项目</li>
        </ul> 
        <ProjectList ref="pList" class="pList" :key="flag"></ProjectList>
    </div>
</template>
<script>
import Banner from './items/Banner'
import ProjectList from './items/ProjectList'
export default {
    data(){
        return {
            flag: 0
        }
    },
    components: {
        Banner,
        ProjectList
    },
    methods: {
        handleProject(ref) {
            let oUl = document.getElementById('projects');
            if(oUl){
                oUl.addEventListener('click', function(ev){
                    let e = ev || window.event;
                    let target = e.target || e.srcElement;
                    if(target && target.nodeName=='LI'){
                        let child = this.children;
                        for(let i=0;i<child.length;i++){
                            if(child[i]==target){
                                if(i != this.flag ){
                                    child[i].className = 'actived';
                                    this.flag = i;
                                    ref['toggleData'](i);
                                }
                            }else{
                                child[i].className = '';
                            }
                        }
                    }
                })
            }
        }
    },
    // beforeCreate() {
    //     console.log('Project.vue beforeCreate');
    // },
    // created() {
    //     console.log('Project.vue Created');
    // },
    // beforeMount() {
    //     console.log('Project.vue beforeMount');
    // },
    mounted() {
        console.log('Project.vue mounted');
        console.log(this.$route);
        this.handleProject(this.$refs.pList);
    },
    // beforeUpdate() {
    //     console.log('Project.vue beforeUpdate');
    // },
    updated() {
        console.log('Project.vue updated');
    },
    // beforeDestroy() {
    //     console.log('Project.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Project.vue destroyed');
    },
}
</script>
<style scoped>
.project{
}
ul{
    padding-top: 54px;
    margin: 0 12px;
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
.pList{
    margin: 0 12px;
}
</style>