import Vue from 'vue';
import Vuex from 'vuex';
require("es6-promise").polyfill();
require('isomorphic-fetch');

Vue.use(Vuex);

function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: '',
      pId: 15609,
      ownId: 15206,
      projectData: [],
      projectName: [],
      memberData: [],
      memberMapData: [],
      memberName: [],
      taskData: [],
      dynamicData: []
    },

    mutations: {
      'SET_BAR'(state, data) {
        state.bar = data;
      },
      'SET_PID'(state, data) {
        state.pId = data;
      },
      'SET_OWNID'(state, data) {
        state.ownId = data;
      },
      'SET_PROJECTDATA'(state, data){
        state.projectData = data;
      },
      'SET_PROJECTNAME'(state, data) {
        state.projectName = data;
      },
      'SET_MEMBERDATA'(state, data){
        state.memberData = data;
      },
      'SET_MEMBERMAPDATA'(state, data) {
        state.memberMapData = data;
      },
      'SET_MEMBERNAME'(state, data) {
        state.memberName = data;
      },
      'SET_TASKDATA'(state, data){
        state.taskData = data;
      },
      'SET_DYNAMICDATA'(state, data){
        state.dynamicData = data;
      },
      'ADD_DYNAMICDATA'(state, data) {
        // console.log('¥¥¥---¥¥¥---ADD_DYNAMICDATA', data);
        let temp = state.dynamicData;
        temp.push(data);
        temp = temp.sort((a, b) => {
          return b.recent - a.recent;
        });
        state.dynamicData = temp;
      }
    },
    actions: {
      fetchProjectData({commit, state, dispatch}){
        // const fetchData = fetch('http://yapi.demo.qunar.com/mock/26054/teamwork/project');
        fetch('http://www.wttx56.com/mock/137/teamwork/project').then(function (res) {
          return res.json();
        }).then(function(stories){
          // 获取project.data
          let sData = stories.data;

          // 处理data.projects
          let pData = sData.projects;
          // 获取项目信息
          commit('SET_PROJECTDATA', pData);
          // console.log('projectData', state.projectData);
          // 获取项目名称
          let pNames = pData.reduce((pre, cur) => {
            return pre.concat({
              pId: cur.pId,
              pName: cur.pName,
              members: cur.members
            });
          }, [])
          commit('SET_PROJECTNAME', pNames);
          // console.log('projectName', state.projectName);
          // 获取负责的项目id
          commit('SET_PID', pData[0].pId);
          console.log('<<<<<<<<<<<pId>>>>>>>>>>>>', state.pId);
          // 获取负责人的id
          commit('SET_OWNID', pData[0].members[0].mId);
          console.log('<<<<<<<<<<<mId>>>>>>>>>>>>', pData[0].members[0].mId);
          let members = pData.reduce((pre, cur) => {
            return pre.concat(cur.members);
          }, []);
          // 获取成员信息
          commit('SET_MEMBERDATA', members);
          dispatch('getMapMembers', members);
          // console.log('memberData', state.memberData);
          // 获取成员名称
          let mNames = pData.reduce((pre, cur) => {
            let tmp = cur.members.reduce((mPre, mCur) => {
              return mPre.concat({
                pId: cur.pId,
                mId: mCur.mId,
                mNames: mCur.mName
              });
            }, []);
            return pre.concat(tmp);
          }, []);
          commit('SET_MEMBERNAME', mNames);
          // console.log('memberName', state.memberName);
          // 获取任务
          let tasks = pData.reduce((pre, cur) => {
            let tmp = cur.members.reduce((mPre, mCur) => {
              return mPre.concat({
                pId: cur.pId,
                mId: mCur.mId,
                tasks: mCur.tasks
              });
            }, []);
            return pre.concat(tmp);
          }, []);
          commit('SET_TASKDATA', tasks);
          // console.log('taskData', state.taskData);

          // 处理data.dynamics
          let dynamics = sData.dynamics.sort((a, b) => {
            return b.recent - a.recent;
          });

          commit('SET_DYNAMICDATA', dynamics);
          // console.log('dynamicData', state.dynamicData);
        }).catch(function(err){
          console.log(err);
          
        })
      },
      getMapMembers({commit}, members) {
        let temp = new Map();
        const tmp1 = [],
          tmp2 = [],
          tmp3 = [],
          tmp4 = [],
          tmp5 = [],
          tmp6 = [],
          tmp7 = [],
          tmp8 = [];
        members.forEach(item => {
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
        commit('SET_MEMBERMAPDATA', temp);
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
    store.replaceState(window.__INITIAL_STATE__);
  } else {
    console.log('no browser');
  }
  
  return store;
}

export default createStore;

typeof window