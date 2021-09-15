<template>
    <div class="projectItem">
        <form action="https://www.baidu.com" id="projectForm">
            <ul>
                <li class="certain-item">
                    <span class="icon project"></span>
                    <label for="project">项目名称</label>
                    <select name="project" id="project" v-model="pChoose">
                        <option v-bind:value="item.pId" v-for="(item,index) in projectData" :key="index">{{item.pName}}</option>
                    </select>
                </li>
                <li class="certain-item">
                    <span class="icon owner"></span>
                    <label for="owner">成员</label>
                    <select name="owner" id="owner" @change="memberChange">
                        <option :value="item.mId" v-for="(item,index) in members">{{item.mName}}</option>
                    </select>
                </li>
                <li class="certain-item">
                    <span class="icon progress"></span>
                    <label for="progress">任务进度</label>
                    <progress :value="member.mProcess" max="100"></progress>
                </li>
                <li class="certain-item">
                    <span class="icon date"></span>
                    <label for="date">截止日期</label>
                    <input type="date" name="date" id="date" :value="member.mDate" :readOnly="readOnly"></input>
                </li>
                <li class="certain-item">
                    <span class="icon task"></span>
                    <label for="task">任务名称</label>
                    <select name="task" id="task" @change="taskChange">
                        <option :value="item.tId" v-for="(item,index) in tasks">{{item.tName}}</option>
                    </select>
                </li>
                <li class="certain-item">
                    <span class="icon remark"></span>
                    <label for="remark">备注</label>
                    <input type="text" id="remark" placeholder="请添加备注" :value="task.notice" :readOnly="readOnly">
                </li>
                <li class="certain-item" v-for="(item, index) in task.options">
                    <span :class="{'icon': true, 'checkItem': item.oCheck, 'noCheckItem': !item.oCheck}" @click="toggleCheck(item.oId)"></span>
                    <label for="checkItem">检查项</label>
                    <input type="text" :id="item.oId" placeholder="请添加检查项" :value="item.oName" :readOnly="readOnly">
                </li>
            </ul>
            <input type="submit" class="submit" value="保存修改" v-if="!readOnly" @click="validateForm">
        </form>
        <div class="timeLineWrap" v-if="!taskFlag">
            <h2>
                <span class="icon importantTime"></span>
                <p class="title">重要时间节点</p>
            </h2>
            <ul class="timeLine">
                <li v-for="(item, index) in timeLine">
                    <hr />
                    <p class="timeLineTime">{{item.deadline}}</p>
                    <span class="circle"
                        :class="{part1: (item.process>0 && item.process<25), part2: (item.process>25 && item.process
                            <55), part3: (item.process>55 && item.process<95), full: item.process==100}"></span>
                    <p class="timeLineTitle">{{item.lineName}}</p>
                </li>
            </ul>
            <ProjectMember ref="pMember" :members="members" :docs="docs"></ProjectMember>
        </div>
    </div>
</template>
<script>
import ProjectMember from './ProjectMember'
import {mapState} from 'vuex'
export default {
    components: {
        ProjectMember
    },
    data(){
        return {
            taskFlag: false,
            querys: {},
            pId: '',
            mId: '',
            tId: '',
            qmId: '',
            qtId: '',
            members: [],
            docs: [],
            timeLine: [],
            tasks: [],
            member: {},
            task: [],
            pChoose: '',
            projectData: this.$store.state.projectData,
            mOpt: null,
            tOpt: null
        }
    },
    computed: {
        ...mapState({
            ownId: 'ownId'
        }),
        readOnly(){
            return !(this.mId == this.ownId);
        }
    },
    watch: {
        'pChoose'(newVal, oldVal){
            this.pId = newVal;
        },
        'pId'(newVal){
            console.log('$$$this.querys', this.querys);
            console.log('$$$this.pId', this.pId);
            Object.assign(this.querys, {
                pId: newVal
            })
            this.matchData(JSON.parse(JSON.stringify(this.querys)));
        },
        'mId'(newVal){
            this.member = this.members.filter((item, index) => {
                return item.mId == newVal;
            })[0] || this.members[0];
            this.tasks = this.member.tasks;
            Object.assign(this.querys, {
                mId: newVal
            })
            this.matchData(JSON.parse(JSON.stringify(this.querys)));
        },
        'tId'(newVal){
            this.task = this.tasks.filter((item, index) => {
                return item.tId == newVal;
            })[0] || this.tasks[0];
            Object.assign(this.querys, {
                tId: newVal
            })
            this.matchData(JSON.parse(JSON.stringify(this.querys)));
        }
    },
    methods: {
        setChoose(q, flag){
            if(flag){
                this.taskFlag = true;
                this.querys = q;
            }
            this.pChoose = q.pId;
        },
        matchData(q){
            console.log('$$$matchData --- querys', q);
            let tmp = this.projectData.filter(item => {
                return item.pId == q.pId;
            })[0];
            
            if(tmp){
                this.members = tmp.members;
                this.docs = tmp.docs;
                this.timeLine = tmp.timeLine;

                let temp = JSON.parse(JSON.stringify(q));
                this.member = this.members.filter(item => {
                    return item.mId == temp.mId;
                })[0] || this.members[0];
                this.mId = this.member.mId;
                this.tasks = this.member.tasks;
                this.task = this.tasks.filter(item => {
                    return item.tId == temp.tId;
                })[0] || this.tasks[0];
                this.tId = this.task.tId;

                if(this.taskFlag){
                    this.querys = JSON.parse(JSON.stringify(this.querys));
                    this.$router.replace({
                        name: 'taskDetail',
                        query: this.querys
                    });
                }else{
                    this.$router.replace({
                        name: 'projectDetail',
                        query: this.querys
                    });
                }
            }
        },
        memberChange(e){
            this.mId = e.target.value;
        },
        taskChange(e){
            this.tId = e.target.value;
        },
        toggleCheck(oId){
            if(!this.readOnly){
                let tmp = this.task.options.filter(item => {
                    return item.oId == oId;
                })[0];
                tmp.oCheck = !tmp.oCheck;
            }
        },
        validateForm() {
            let conf = window.confirm("确认保存修改?");
            console.log(conf);
            if (conf) {
                return true;
            } else {
                return false;
            }
        } 
    },
    // beforeCreate() {
    //     console.log('ProjectItem.vue beforeCreate');
    // },
    // created() {
    //     console.log('ProjectItem.vue Created');
    // },
    // beforeMount() {
    //     console.log('ProjectItem.vue beforeMount');
    // },
    mounted() {
        console.log('ProjectItem.vue mounted');
        this.mOpt = document.getElementById('owner');
        this.tOpt = document.getElementById('task');
    },
    // beforeUpdate() {
    //     console.log('ProjectItem.vue beforeUpdate');
    // },
    updated() {
        console.log('ProjectItem.vue updated');
        console.log('¥¥--¥¥--this.mOpt', this.mOpt);
        console.log('¥¥--¥¥--this.tOpt', this.tOpt);
        for(let i=0; i<this.mOpt.length; i++){
            if(this.mOpt.options[i].value == this.mId){
                this.mOpt.options[i].selected = true;
            }
        }

        for(let i=0; i<this.tOpt.length; i++){
            if(this.tOpt.options[i].value == this.tId){
                this.tOpt.options[i].selected = true;
            }
        }
    },
    // beforeDestroy() {
    //     console.log('ProjectItem.vue beforeDestroy');
    // },
    destroyed() {
        console.log('ProjectItem.vue destroyed');
    },
}
</script>
<style scoped>
.projectItem{
}
.certain-item{
    margin: 10px auto;
    height: 30px;
    line-height: 30px;
    font-size: 0;
}
label, select, progress, input, p{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    vertical-align: middle;
    margin-left: 8px;
}
select, input{
    max-width: 60%;
}
.submit{
    border: none;
    color: #FFFFFF;
    background: #4C6FB0;
    padding: 0 8px;
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
.timeLine li p{
    display: block;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.timeLine li:nth-of-type(1) hr{
    width: 50%;
    right: 0;
}
.timeLine li:nth-last-of-type(1) hr{
    width: 50%;
    left: 0;
}
hr{
    width: 100%;
    position: absolute;
    top: 29px;
    z-index: 0;
    margin: 0;
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