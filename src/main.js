// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'
import router from './router'
import store from './store'
import * as $http from './requests'

Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.$http = $http

const appMixin = {
  filters: {
    tofix (val) {
      return val.toFixed(2)
    }
  }
}

// 全局混入  这样的意思就是，任何组件，都会具有appMixin里定义的一些操作及方法
Vue.mixin(appMixin)

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 如果已经在登录页，就直接进入登录页
    next()
  } else {
    if (to.meta.isAuthRequired && store.state.isLogin === false) {
      // 如果需要权限并且没有登录，就需要跳转登录页, 并且要把当前页做为一个参数传到login页面
      // 要不然，就不知道登录完成之后跳到哪里
      next({
        name: 'login',
        params: {
          from: to.path
        }
      })
    } else {
      const {
        title
      } = to.meta
      if (title) {
        store.commit('changePageTitle', title)
      }
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // mixins: [appMixin], // 当前实例
  router,
  store,
  components: { App },
  template: '<App/>'
})
