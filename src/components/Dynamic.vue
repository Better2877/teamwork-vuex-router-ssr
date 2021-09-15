<template>
    <div class="dynamic">
        <Banner home title="相关动态"></Banner>
        <form action="" class="dynamic-form" v-if="pData.length>0">
            <p class="relate">
                <span class="icon project"></span>
                <select name="" id="" @change="pChoose">
                    <option v-for="(item, index) in pData" :value="item.pId">{{item.pName}}</option>
                </select>
            </p>
            <p class="relate" v-if="mNames.length>0">
                <span class="icon owner"></span>
                <select name="" id="" @change="mChoose">
                    <option v-for="(item, index) in mNames" :value="item.mId">{{item.mName}}</option>
                </select>
            </p>
            <p>
                <span class="icon date"></span>
                <label for="begin"></label>
                <input type="date" name="" id="begin" v-model="beginDate">
                <label for="end"></label>
                <input type="date" name="" id="end" v-model="endDate">
            </p>
        </form>
        <Operation class="opt" :operations="filterDynamicData"></Operation>
    </div>
</template>
<script>
import Banner from './items/Banner'
import Operation from './items/Operation'
import {mapState} from 'vuex'
export default {
    components: {
        Banner,
        Operation
    },
    data() {
        return {
            pId: '',
            mId: '',
            beginDate: '',
            endDate: ''
        }
    },
    computed: {
        ...mapState({
            pData: 'projectData',
            dynamicData: 'dynamicData'
        }),
        mNames(){
            if(this.pData.length){
                let tmp = this.pData.filter((item, index) => {
                    if(this.pId){
                        return item.pId == this.pId
                    }else{
                        if(index == 0){
                            this.pId = item.pId;
                        }
                        return index == 0;
                    }
                })[0];
                return tmp ? tmp.members : [];
            }
        },
        filterDynamicData(){
            let temp = this.dynamicData.filter(item => {
                let begin = new Date(this.beginDate);
                let beginTime = item.recent >= begin;
                let end = new Date(this.endDate);
                let endTime = item.recent <= end;
                let time = beginTime && endTime;
                let pIdFlag = item.pId == this.pId;
                let mIdFlag = item.cId == this.mId;
                let choose = time && pIdFlag && mIdFlag;
                return choose;
            });
            console.log('¥¥¥---¥¥¥---dynamicData', this.dynamicData);
            console.log('¥¥¥---¥¥¥---filterDynamicData', temp);
            return temp;
        }
    },
    watch: {
        'pId'(newVal){
            if(this.pData.length){
                let tmp = this.pData.filter((item, index) => {
                    return newVal ? item.pId == newVal : index == 0;
                })[0];

                let beginTime = new Date(tmp.begin);
                let beginYear = ''+beginTime.getFullYear();
                let beginFullMonth = beginTime.getMonth()+1;
                let beginMonth = (beginFullMonth<10) ? '0'+beginFullMonth : beginFullMonth;
                let beginFullDay = beginTime.getDate();
                let beginDay = (beginFullDay<10) ? '0'+beginFullDay : ''+beginFullDay;
                this.beginDate = beginYear+'-'+beginMonth+'-'+beginDay;

                let endTime = new Date(tmp.end);
                endTime = new Date(new Date().getTime()+86400000);
                let endYear = endTime.getFullYear();
                let endFullMonth = endTime.getMonth()+1;
                let endMonth = (endFullMonth<10) ? '0'+endFullMonth : ''+endFullMonth;
                let endFullDay = endTime.getDate();
                let endDay = (endFullDay<10) ? '0' +endFullDay : ''+endFullDay;
                this.endDate = endYear+'-'+endMonth+'-'+endDay;

                if(tmp.members.length){
                    this.mId = tmp.members[0].mId;
                }
            }
        }
    },
    methods: {
        pChoose(e){
            this.pId = e.target.value;
        },
        mChoose(e){
            this.mId = e.target.value;
        }
    },
    // beforeCreate() {
    //     console.log('Dynamic.vue beforeCreate');
    // },
    // created() {
    //     console.log('Dynamic.vue Created');
    // },
    // beforeMount() {
    //     console.log('Dynamic.vue beforeMount');
    // },
    mounted() {
        console.log('Dynamic.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('Dynamic.vue beforeUpdate');
    // },
    updated() {
        console.log('Dynamic.vue updated');
    },
    // beforeDestroy() {
    //     console.log('Dynamic.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Dynamic.vue destroyed');
    },
}
</script>
<style scoped>
.dynamic{
}
.dynamic-form{
    margin: 54px 12px 0;
}
.relate{
    display: inline-block;
    width: 45%;
    font-size: 0;
    margin-bottom: 4px;
}
select{
    width: 80%;
    margin-left: 4px;
}
select, input{
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    font-size: 14px;
}
.opt{
    margin: 0 12px 55px;
}
</style>