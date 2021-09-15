<template>
    <div class="notice">
        <Banner home title="相关通知"></Banner>
        <ul id="notices" @click="toggle">
            <a class="nav actived danger" tag="li">紧急通知</a>
            <a class="nav" tag="li">所有通知</a>
        </ul>
        <keep-alive>
            <Operation class="opt" :operations="operations" :key="hash"></Operation>
        </keep-alive>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Banner from './items/Banner'
import Operation from './items/Operation'
export default {
    data(){
        return {
            dangerOpt: true
        }
    },
    components: {
        Banner,
        Operation
    },
    computed: {
        ...mapState({
            dynamicData: 'dynamicData'
        }),
        dangerDynamicData(){
            return this.dynamicData.filter(item => {
                return item.danger == true;
            })
        },
        operations(){
            return this.dangerOpt ? this.dangerDynamicData : this.dynamicData;
        },
        hash(){
            return this.dangerOpt ? 'danger' : 'normal';
        }
    },
    methods: {
        toggle(ev){
            let e = ev || window.event;
            let target = e.target || e.srcElement;
            if(target && target.classList.contains('danger')){
                this.dangerOpt = true;
            }else{
                this.dangerOpt = false;
            }
            let ULChild = document.getElementById('notices').children;
            let len = ULChild.length;
            for(let i=0; i<len; i++){
                ULChild[i].classList.toggle('actived');
            }
        }
    },
    // beforeCreate() {
    //     console.log('Notice.vue beforeCreate');
    // },
    // created() {
    //     console.log('Notice.vue Created');
    // },
    // beforeMount() {
    //     console.log('Notice.vue beforeMount');
    // },
    mounted() {
        console.log('Notice.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('Notice.vue beforeUpdate');
    // },
    updated() {
        console.log('Notice.vue updated');
    },
    // beforeDestroy() {
    //     console.log('Notice.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Notice.vue destroyed');
    },
}
</script>
<style scoped>
#notices{
    margin: 54px 12px 0;
}
ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.nav{
    flex: 1;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #4C6FB0;
}
.opt{
    margin: 0 12px 55px;
}
</style>