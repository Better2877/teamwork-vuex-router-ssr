import Vue from 'vue';
import createStore from './store';
import createRouter from './router';
import App from './App.vue';
import {sync} from 'vuex-router-sync'
import Promise from 'promise-polyfill'
import vueLoadingPage from 'vue-loading-page'

Vue.use(vueLoadingPage)

export function createApp() {
  
  if(typeof window != 'undefined' && !window.Promise){
    window.Promise = Promise;
  }

  const store = createStore();
  const router = createRouter();

  sync(store, router);

  // console.log(router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, store, router, App };
}