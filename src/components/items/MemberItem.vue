<template>
    <div class="memberItem">
        <ul class="members" v-if="members.size>0">
            <li class="jobs" v-for="(val, key) in members" :key="key">
                <h2 v-if="val[1].length>0">
                    <span class="icon job"></span>
                    <p>{{val[0]}}</p>
                </h2>
                <ul v-if="val[1].length>0">
                    <li class="singleMember" v-for="(item, index) in val[1]" :key="index">
                        <span class="icon single"></span>
                        <p class="text">
                            <span class="mName">{{item.mName}}</span>
                            <span>{{item.mDay}}人日</span>
                            <span>{{item.mProcess}}%</span>
                            <span>{{item.mDate}}</span>
                        </p>
                        <span class="icon more" @click="handleMemberClick(item)"></span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        members: {
            type: Map,
            default: () => {
                return new Map();
            }
        }
    },
    methods: {
        handleMemberClick(item){
            console.log('¥¥¥---¥¥¥---item ', item);
            this.$router.push({
                name: 'memberDetail',
                query: {
                    member: item
                }
            })
        }
    },
    // beforeCreate() {
    //     console.log('MemberItem.vue beforeCreate');
    // },
    // created() {
    //     console.log('MemberItem.vue Created');
    // },
    // beforeMount() {
    //     console.log('MemberItem.vue beforeMount');
    // },
    mounted() {
        console.log('MemberItem.vue mounted');
    },
    // beforeUpdate() {
    //     console.log('MemberItem.vue beforeUpdate');
    // },
    updated() {
        console.log('MemberItem.vue updated');
        console.log('$$$---$$$ members', this.members);
    },
    // beforeDestroy() {
    //     console.log('MemberItem.vue beforeDestroy');
    // },
    destroyed() {
        console.log('MemberItem.vue destroyed');
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
    margin: 0 24px 0 8px;
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.text .mName{
    display: inline-block;
    font-weight: 600;
    width: 50px;
    margin-right: 8px;
}
.text span{
    margin-right: 4px;
}
.more{
    position: absolute;
    right: 0;
}
</style>