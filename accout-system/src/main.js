import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'
import axios from './axios/index'
import Vuex from 'vuex'

/* import Mock from './mock'
Mock.bootstrap(); */

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(router)
Vue.use(Vuex)

//路由验证拦截否则跳转登录页
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      //这里判断用户是否登录，验证本地存储是否有token
      if (!localStorage.getItem('token')) { // 判断当前的token是否存在
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
})

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')