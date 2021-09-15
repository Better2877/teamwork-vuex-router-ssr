<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
require("es6-promise").polyfill();
require('isomorphic-fetch');
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tranName:'slide-left',
      items:[]
    }
  },
  beforeCreate() {
    console.log('App.vue beforeCreate');
    this.$store.dispatch('fetchProjectData');
  },
  created() {
    console.log('App.vue Created');
  },
  beforeMount() {
    console.log('App.vue beforeMount');
  },
  mounted() {
    console.log('App.vue mounted');
    console.log(this.$route);
  },
  beforeUpdate() {
    console.log('App.vue beforeUpdate');
  },
  updated() {
    console.log('App.vue updated');
    // console.log('App.vue updated dynamicData', this.$store.state.dynamicData);
  },
  beforeDestroy() {
    console.log('App.vue beforeDestroy');
  },
  destroyed() {
    console.log('App.vue destroyed');
  },
}
</script>
<style>
html,body,ul,li,p,h1,h2,h3,input{
  margin: 0;
  padding: 0;
  font-weight: normal;
}
li{
  list-style-type: none;
}
a{
  text-decoration: none;
  color: #101010;
}
h1{
  font-size: 18px;
  line-height: 44px;
  height: 44px;
  color: #fff;
  font-weight: normal;
  display: inline-block;
}
.icon{
  display: inline-block;
  background: url('./images/big_img.png') no-repeat 0 0;
  background-size: 240px 240px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.project{
    background-position: -192px -24px;
}
.task{
    background-position: -72px 0;
}
.owner{
    background-position: -48px -48px;
}
.progress{
    background-position: -24px -48px;
}
.date{
    background-position: -72px -48px;
}
.remark{
    background-position: -96px -48px;
}
.noCheckItem{
    background-position: -144px -24px;
}
.checkItem{
    background-position: -168px -24px;
}
.addItem{
    background-position: -216px -48px;
}
.member{
    background-position: -216px 0;
}
.job{
    background-position: 0 -96px;
}
.single{
    background-position: -168px -72px;
}
.more{
    background-position: -216px -24px;
}
.doc{
    background-position: -168px -48px;
}
.file{
    background-position: -192px -48px;
}
.search-icon{
    background-position: -72px -24px;
}
p{
  font-size: 16px;
  vertical-align: middle;
}
.title{
  color: #4C6FB0;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin-left: 8px;
}
hr{
  margin: 9px 0 10px;
  border-bottom: 0;
}
.actived{
    background: #4C6FB0;
    color: #FFFFFF;
}
.hand{
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}
.redHand{
  background: url('./images/redHand.png') no-repeat 0 0;
  background-size: 20px 20px;
}
.blueHand{
  background: url('./images/blueHand.png') no-repeat 0 0;
  background-size: 20px 20px;
}
.person{
  background: url('./images/person.png') no-repeat 0 0;
  background-size: 68px 68px;
  width: 68px;
  height: 68px;
}
</style>
