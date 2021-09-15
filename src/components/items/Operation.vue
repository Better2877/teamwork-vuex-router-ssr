<template>
    <div class="operation">
        <ul class="operations" v-if="showOperations.length">
            <li v-for="(item,index) in showOperations">
                <span :class="[item.danger ? redHand: blueHand, hand]"></span>
                <span>{{new Date(item.recent).toLocaleString()}}</span><span><strong>{{item.controller}}</strong></span><span>{{item.operate}}</span><span>{{item.target}}</span>
            </li>
            <div class="more" @click="moreData" v-if="more">加载更多</div>
            <vue-loading-page type="dot" v-if="loading"></vue-loading-page>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        operations: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            redHand: 'redHand',
            blueHand: 'blueHand',
            hand: 'hand',
            more: true,
            loading: false,
            page: 1,
            pageNum: 10
        }
    },
    computed: {
        showOperations(){
            let res = [], len = this.operations.length;
            if(this.page == 1 && len>0 && len <= this.pageNum){
                this.more = false;
                res = this.operations.slice(0)
            }else{
                res = this.operations.slice(0, this.page * this.pageNum)
            }
            return res;
        }
    },
    watch: {
        'page'(newVal, oldVal){
            let len = this.operations.length;
            if(len<=this.pageNum || newVal*this.pageNum >= len){
                this.more = false;
            }
        }
    },
    methods: {
        moreData(){
            this.loading = true;
            this.more = false;
            setTimeout(() => {
                this.page++;
                this.loading = false;
                this.more = true;
            }, 1000);
        }
    },
    // beforeCreate() {
    //     console.log('Operation.vue beforeCreate');
    // },
    // created() {
    //     console.log('Operation.vue Created');
    // },
    // beforeMount() {
    //     console.log('Operation.vue beforeMount');
    // },
    mounted() {
        console.log('Operation.vue mounted');
        new Date().toLocaleString()
    },
    // beforeUpdate() {
    //     console.log('Operation.vue beforeUpdate');
    // },
    updated() {
        console.log('Operation.vue updated');
        // console.log('Operation.vue dynamics', this.$store.state.dynamicData);
    },
    // beforeDestroy() {
    //     console.log('Operation.vue beforeDestroy');
    // },
    destroyed() {
        console.log('Operation.vue destroyed');
    },
}
</script>
<style scoped>
.operation{
    padding-top: 4px;
}
.operations li{
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 4px;
}
.operations span{
    margin-right: 4px;
}
.more{
    text-align: center;
    font-size: 12px;
    height: 20px;
}
</style>