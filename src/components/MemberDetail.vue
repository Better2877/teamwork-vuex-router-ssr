<template>
   <div class="memberDetail" v-if="member">
       <Banner title="成员简介"></Banner>
       <div class="info">
           <div class="intro">
               <span class="icon job"></span>
               <p>{{member.department}}</p>
               <span class="icon person"></span>
           </div>
           <div class="memberName">
               <span class="icon single"></span>
               <p>{{member.mName}}</p>
           </div>
       </div>
       <div class="contact">
           <div class="conContain">
               <h4 class="mTitle">手机</h4>
               <div class="conContent">
                   <a href="tel:15212345678">{{member.mTel}}</a>
               </div>
            </div>
           <div class="conContain">
               <h4 class="mTitle">邮箱</h4>
               <div class="conContent">
                   <a href="mailto:123456789@qq.com">{{member.mMail}}</a>
               </div>
            </div>
           <div class="conContain" v-if="member.mLeader">
               <h4 class="mTitle">上级</h4>
               <div class="conContent">
                   <h4>{{member.mLeader.mLName}}</h4>
                   <a href="tel:15212345678">{{member.mLeader.mLMail}}</a>
                </div>
                <span class="icon more"></span>
            </div>
       </div>
       <div class="call">
           <input type="button" value="发消息">
           <input type="button" value="语音通话">
       </div>
   </div>
</template>
<script>
import Banner from './items/Banner'
export default {
    components:{
        Banner
    },
    data() {
        return {
            member: null
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.member = to.query.member
        })
    }
}
</script>
<style scoped>
.memberDetail{
    font-size: 16px;
}
.info{
    margin: 16px 12px;
    background: #F5F5F5;
    border-radius: 10px;
    padding: 16px;
}
.info p{
    flex: 1;
    font-size: 18px;
    text-indent: 16px;
    font-weight: 600;
    color: #4C6FB0;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.intro, .memberName{
    display: flex;
    align-content: flex-start;
}
.memberName{
    margin-top: 16px;
}
.contact{
    color: #4C6FB0;
    padding: 0 20px;
    background: #F5F5F5;
}
.conContain{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #aaaaaa;
    position: relative;
}
h4{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin: 0;
    padding: 0 8px;
}
.mTitle{
    border-right: 1px solid #aaaaaa;
}
.conContent{
    display: inline-block;
}
.more{
    position: absolute;
    top: 11px;
    right: 8px;
}
.call{
    margin: 30px 20px 0;
}
.call input{
    border-color: #4C6F90;
    display: block;
    width: 100%;
    height: 45px;
    border-radius: 5px;
    color: #FFFFFF;
    background: #4C6FB0;
    margin-bottom: 16px;
}
</style>