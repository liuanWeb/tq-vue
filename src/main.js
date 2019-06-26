// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
// 引入app样式文件
import './assets/scss/app.scss'

import api from './request/api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

// 引入vuex
import vuex from 'vuex';
import Router from "vue-router";
Vue.use(vuex);
//添加vuex 状态树 设置动画
Vue.prototype.$store = new vuex.Store({//store对象
  state: {
    states: 'turn-on'
  },
  mutations: {
    setTransition(state, states) {
      state.states = states
    }
  }
});

// 页面路由跳转（前进）     设置动画
Vue.prototype.$navPush = function(path,query) {
  this.$store.commit("setTransition", "turn-on");
  this.$router.push({path: path, query:query});
};


router.beforeEach((to,from,next)=>{
  if(to.meta.needLogin){
    let sid = localStorage.getItem('sid');
    if(!sid){
      Vue.prototype.$store.commit("setTransition", "turn-on");
      router.push({path:'loginPage',query:{path:from.path}})
      // next();
    }else{
      next();
    }
  }else{
    next();
  }
});

// 保存页面滚动条位置
router.afterEach((to,from,next) =>{
  if(to.meta.saveScroll){
    setTimeout(()=>{
      let box = document.getElementById('tabsContent');
      if(box){
        let pos = localStorage.getItem(to.name);
        box.scrollTop = pos;
      }
    },10)
  }
});

// 跳转 webview
Vue.prototype.$toWebView = function(type,url,query) {
  let sid = localStorage.getItem('sid');
  if(type == 1){
    this.$store.commit("setTransition", "turn-on");
    this.$router.push({path: url,query:query})
  }
  else if (type == 3){
    this.$store.commit("setTransition", "turn-on");
    if(sid) query.url = query.url + `?sid=${sid}`;
    this.$router.push({path: '/webViewPage',query:query})
  } else if(type == 2){
    window.open(url);
  }
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
