import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: function (resolve) {
      require(['../components/MyInfo.vue'], resolve)
    }
  }, {
    path: '/lucker',
    component: function (resolve) {
      require(['../components/LuckyList.vue'], resolve)
    }
  }, {
    path: '/setting',
    component: function (resolve) {
      require(['../components/Setting.vue'], resolve)
    }
  }]
})
