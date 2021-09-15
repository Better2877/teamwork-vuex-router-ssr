import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Search from '../pages/Search'

Vue.use(Router);

function createRouter() {
  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/mine',
      children: [
        {
          path: 'mine',
          name: 'mine',
          component: () => import('../components/Mine')
        },
        {
          path: 'project',
          name: 'project',
          component: () => import('../components/Project')
        },
        {
          path: 'dynamic',
          name: 'dynamic',
          component: () => import('../components/Dynamic')
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import('../components/Notice')
        },
        {
          path: 'team',
          name: 'team',
          component: () => import('../components/Team')
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      redirect: {
        name: 'taskDetail'
      },
      children: [
        {
          path: 'taskDetail/:pId?:mId?:tId?',
          name: 'taskDetail',
          component: () => import('../components/TaskDetail')
        },
        {
          path: 'projectDetail/:pId?:mId?:tId?',
          name: 'projectDetail',
          component: () => import('../components/ProjectDetail')
        },
        {
          path: 'teamDetail/:pId?',
          name: 'teamDetail',
          component: () => import('../components/TeamDetail')
        },
        {
          path: 'memberDetail/:mId?',
          name: 'memberDetail',
          component: () => import('../components/MemberDetail')
        }
      ]
    },
    {
      path: '/search/:type?',
      name: 'search',
      component: Search
    }
  ];

  const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }

  const originalReplace = Router.prototype.replace
  Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
  }

  const router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if(savedPosition){
        return savedPosition;
      }else{
        return {x:0, y:0}
      }
    },
    linkExactActiveClass: 'linkActiveClass',
    routes
  });

  return router;
}

export default createRouter;