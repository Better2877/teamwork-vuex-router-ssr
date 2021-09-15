<template>
    <div class="projectMember">
        <h2>
            <span class="icon member"></span>
            <p class="title">参与人员</p>
        </h2>
        <MemberItem :members="memberData"></MemberItem>
        <ul class="docs" v-if="docs.length>0">
            <h2>
                <span class="icon doc"></span>
                <p class="title">相关文档</p>
            </h2>
            <li v-for="(item,index) in docs">
                <a class="files" :href="item.docURL">
                    <span class="icon file"></span>
                    <p class="text">
                        <span>{{item.docName}}</span>
                        <span>{{item.docMsg.operate}}</span>
                        <span>{{item.docMsg.controller}}</span>
                        <span>{{item.docMsg.recent}}</span>
                    </p>
                    <span class="icon more"></span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import MemberItem from './MemberItem'
import {mapState} from 'vuex'
export default {
    components: {
        MemberItem
    },
    props: {
        members: {
            type: Array,
            default: []
        },
        docs: {
            type: Array,
            default: []
        }
    },
    computed: {
        memberData(){
            let temp = new Map();
            const tmp1=[],tmp2=[],tmp3=[],tmp4=[],tmp5=[],tmp6=[],tmp7=[],tmp8=[];
            this.members.forEach(item => {
                let top = item.title.split('#')[0];
                switch (top) {
                    case 'PM':
                        tmp1.push(item);
                        break;
                    case 'RD':
                        tmp2.push(item);
                        break;
                    case 'FE':
                        tmp3.push(item);
                        break;
                    case 'UE':
                        tmp4.push(item);
                        break;
                    case 'UI':
                        tmp5.push(item);
                        break;
                    case 'QA':
                        tmp6.push(item);
                        break;
                    case 'OP':
                        tmp7.push(item);
                        break;
                    case 'DBA':
                        tmp8.push(item);
                        break;
                    default:
                        break;
                }
            });
            temp.set('PM', tmp1);
            temp.set('RD', tmp2);
            temp.set('FE', tmp3);
            temp.set('UE', tmp4);
            temp.set('UI', tmp5);
            temp.set('QA', tmp6);
            temp.set('OP', tmp7);
            temp.set('DBA', tmp8);
            console.log('$$$$$$$$', temp);
            return temp;
        }
    },
    // beforeCreate() {
    //     console.log('ProjectMember.vue beforeCreate');
    // },
    // created() {
    //     console.log('ProjectMember.vue Created');
    // },
    // beforeMount() {
    //     console.log('ProjectMember.vue beforeMount');
    // },
    mounted() {
        console.log('ProjectMember.vue mounted');
    },
    // beforeUpdate() {
    //     console.log('ProjectMember.vue beforeUpdate');
    // },
    updated() {
        console.log('ProjectMember.vue updated');
    },
    // beforeDestroy() {
    //     console.log('ProjectMember.vue beforeDestroy');
    // },
    destroyed() {
        console.log('ProjectMember.vue destroyed');
    },
}
</script>
<style scoped>
h2{
    font-size: 0;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    padding-top: 6px;
}
h2 p{
    display: inline-block;
    margin-left: 8px;
}
.files{
    font-size: 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.text{
    margin: 0 24px 0 8px;
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.more{
    position: absolute;
    right: 0;
}
</style>