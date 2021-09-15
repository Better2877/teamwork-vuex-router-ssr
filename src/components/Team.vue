<template>
    <div class="team">
        <Banner home title="团队信息"></Banner>
        <MemberItem :members="members" class="member"></MemberItem>
        <span class="set" @click="handleSet"></span>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Banner from './items/Banner'
import MemberItem from './items/MemberItem'
export default {
    components: {
        Banner,
        MemberItem
    },
    computed: {
        ...mapState({
            members: 'memberMapData'
        }),
    },
    methods: {
        handleSet(){
            this.$router.push({
                name: 'teamDetail'
            })
        }
    },
    // beforeCreate() {
    //     console.log('Team.vue beforeCreate');
    // },
    // created() {
    //     console.log('Team.vue Created');
    // },
    // beforeMount() {
    //     console.log('Team.vue beforeMount');
    // },
    mounted() {
        console.log('Team.vue mounted');
        console.log(this.$route);
    },
    // beforeUpdate() {
    //     console.log('Team.vue beforeUpdate');
    // },
    updated() {
        console.log('Team.vue updated');
    },
    // beforeDestroy() {
    //     console.log('Team.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Team.vue destroyed');
    },
}
</script>
<style scoped>
.team{
}
.member{
    margin: 54px 12px 55px;
}
.set{
    background: url('../images/set.png') no-repeat 0 0;
    background-size: 40px 40px;
    display: inline-block;
    width: 40px;
    height: 40px;
    position: fixed;
    right: 12px;
    bottom: 57px;
}
</style>