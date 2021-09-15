<template>
  <div class="home">
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
    <div class="bottom-bar">
      <ul class="bottom-bar-flex">
        <router-link tag="li" :to="{name: 'mine'}" class="bottom-bar-flex-item">
          <span class="icon mineBar"></span>
          <p>我的</p>
        </router-link>
        <router-link tag="li" :to="{name: 'project'}" class="bottom-bar-flex-item">
          <span class="icon projectBar"></span>
          <p>项目</p>
        </router-link>
        <router-link tag="li" :to="{name: 'dynamic'}" class="bottom-bar-flex-item">
          <span class="icon dynamicBar"></span>
          <p>动态</p>
        </router-link>
        <router-link tag="li" :to="{name: 'notice'}" class="bottom-bar-flex-item">
          <span class="icon noticeBar"></span>
          <p>通知</p>
        </router-link>
        <router-link tag="li" :to="{name: 'team'}" class="bottom-bar-flex-item">
          <span class="icon teamBar"></span>
          <p>团队</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    beforeCreate() {
      console.log('Home.vue beforeCreate');
    },
    created() {
      console.log('Home.vue Created');
    },
    beforeMount() {
      console.log('Home.vue beforeMount');
    },
    mounted() {
      console.log('Home.vue mounted');
      console.log(this.$route);
    },
    beforeUpdate() {
      console.log('Home.vue beforeUpdate');
    },
    updated() {
      console.log('Home.vue updated');
    },
    beforeDestroy() {
      console.log('Home.vue beforeDestroy');
    },
    destroyed() {
      console.log('Home.vue destroyed');
    },
}
</script>
<style scoped>
.content{
  
}
.bottom-bar{
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #eee;
}
.bottom-bar-flex{
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0;
}
.bottom-bar-flex-item{
  height: 45px;
  text-align: center;
  flex: 1;
}
.projectBar{
  background-position: -48px 0px;
}
.dynamicBar{
  background-position: -96px 0px;
}
.noticeBar{
  background-position: -144px 0px;
}
.teamBar{
  background-position: -192px 0px;
}
.linkActiveClass .mineBar{
  background-position: -24px 0;
}
.linkActiveClass .projectBar{
  background-position: -72px 0;
}
.linkActiveClass .dynamicBar{
  background-position: -120px 0;
}
.linkActiveClass .noticeBar{
  background-position: -168px 0;
}
.linkActiveClass .teamBar{
  background-position: -216px 0;
}
</style>