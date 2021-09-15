<template>
    <div class="teamDetail">
        <Banner title="团队设置" search></Banner>
        <ul class="members" v-if="members.size>0">
            <li class="jobs" v-for="(val, key) in members" :key="key">
                <h2 class="jobTitle" v-if="val[1].length>0">
                    <span class="icon job"></span>
                    <p>{{val[0]}}</p>
                    <span class="icon addItem"></span>
                </h2>
                <ul v-if="val[1].length>0">
                    <li class="singleMember" v-for="(item, index) in val[1]" :key="index">
                        <span class="icon single"></span>
                        <p class="text">
                            <span class="mName">{{item.mName}}</span>
                            <span>{{item.department}}</span>
                        </p>
                        <span
                            :class="{'icon':true,'manager':!item.maneger, 'managerActive': item.maneger,'key':true}"
                            @click.stop.prevent="toggleManeger(item)"></span>
                        <span :class="{'icon':true, 'owner': !item.owner, 'ownerActive':item.owner, 'key': true}" @click.stop.prevent="toggleOwner(item)"></span>
                        <span
                            :class="{'icon':true, 'member': (item.maneger||item.owner), 'memberActive': (!item.maneger&&!item.owner), 'key':true}"></span>
                        <span class="icon delete" @click.stop.prevent="deleteMember(item)"></span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Banner from './items/Banner'
export default {
    components: {
        Banner
    },
    data() {
        return {
            dynamicItem: {
                danger: false,
                recent: new Date().getTime(),
                controller: '',
                operate: '',
                target: '',
                cId: '',
                pId: ''
            }
        }
    },
    computed: {
        ...mapState({
            memberData: 'memberData',
            members: 'memberMapData'
        }),
        memMembers(){
            return this.memberData;
        }
    },
    methods: {
        toggleManeger(item){
            let indexs = this.findMemberIndexs(item);
            let oldManeger = item.maneger;
            let temp = Object.assign({}, item, {
                maneger: !oldManeger
            })
            for(let i=0; i<indexs.length; i++){
                this.memMembers.splice(indexs[i], 1, temp);
            }
            this.$store.commit('SET_MEMBERDATA', this.memMembers);
            this.$store.dispatch('getMapMembers', this.memMembers);

            let controller = item.mName;
            let cId = item.mId;
            let operate = oldManeger ? '被取消负责人身份' : '被设置为负责人';
            let recent = new Date().getTime();

            let dynamicDate = Object.assign({}, this.dynamicItem, {
                controller: controller,
                operate: operate,
                cId: cId,
                recent: recent
            })
            
            this.$store.commit('ADD_DYNAMICDATA', dynamicDate);
        },
        toggleOwner(item){
            let indexs = this.findMemberIndexs(item);
            let oldOwner= item.owner;
            let temp = Object.assign({}, item, {
                owner: !oldOwner
            })
            for(let i=0; i<indexs.length; i++){
                this.memMembers.splice(indexs[i], 1, temp);
            }
            this.$store.commit('SET_MEMBERDATA', this.memMembers);
            this.$store.dispatch('getMapMembers', this.memMembers);

            let controller = item.mName;
            let cId = item.mId;
            let operate = oldOwner ? '被取消管理员身份' : '被设置为管理员';
            let recent = new Date().getTime();

            let dynamicDate = Object.assign({}, this.dynamicItem, {
                controller: controller,
                operate: operate,
                cId: cId,
                recent: recent
            })
            
            this.$store.commit('ADD_DYNAMICDATA', dynamicDate);
        },
        deleteMember(item){
            let indexs = this.findMemberIndexs(item);
            for(let i=0; i<indexs.length; i++){
                this.memMembers.splice(indexs[i], 1);
            }
            console.log(this.mem)
            this.$store.commit('SET_MEMBERDATA', this.memMembers);
            this.$store.dispatch('getMapMembers', this.memMembers);

            let controller = item.mName;
            let cId = item.mId;
            let operate = '被删除';
            let recent = new Date().getTime();

            let dynamicDate = Object.assign({}, this.dynamicItem, {
                danger: true,
                controller: controller,
                operate: operate,
                cId: cId,
                recent: recent
            })

            this.$store.commit('ADD_DYNAMICDATA', dynamicDate);

        },
        findMemberIndexs(it){
            let indexs = [];
            this.memberData.forEach((item, index) => {
                if(item.mId == it.mId && item.mName == it.mName && item.title == it.title){
                    indexs.push(index);
                }
            });
            return indexs;
        }
    },
    // beforeCreate() {
    //     console.log('TeamDetail.vue beforeCreate');
    // },
    // created() {
    //     console.log('TeamDetail.vue Created');
    // },
    // beforeMount() {
    //     console.log('TeamDetail.vue beforeMount');
    // },
    mounted() {
        console.log('TeamDetail.vue mounted');
        console.log(this.$route);
        console.log('TeamDetail.vue members', this.members);
    },
    // beforeUpdate() {
    //     console.log('TeamDetail.vue beforeUpdate');
    // },
    updated() {
        console.log('TeamDetail.vue updated');
    },
    // beforeDestroy() {
    //     console.log('TeamDetail.vue beforeDestroy');
    // },
    destroyed() {
        console.log('TeamDetail.vue destroyed');
    },
}
</script>
<style scoped>
.teamDetail{
}
.members{
    margin: 0 12px;
}
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
.jobTitle{
    position: relative;
}
.singleMember{
    font-size: 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.text{
    margin-left: 12px;
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.mName{
    display: inline-block;
    font-weight: 600;
    width: 50px;
    margin-right: 8px;
}
.key{
    margin-right: 12px;
}
.manager{
    background-position: -48px -72px;
}
.managerActive{
    background-position: -72px -72px;
}
.owner{
    background-position: -96px -72px;
}
.ownerActive{
    background-position: -120px -72px;
}
.member{
    background-position: -144px -72px;
}
.memberActive{
    background-position: -168px -72px;
}
.delete{
    background-position: -192px -72px;
}
.addItem{
    position: absolute;
    right: 0;
}
</style>