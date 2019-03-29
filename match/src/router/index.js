import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/common/util.js'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // 1. 判断是否有用户信息
    let info = JSON.parse(sessionStorage.getItem('info')) || {}
    if (info.account && info.account !== '') {
      next()
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    NProgress.done()
  }
})


router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 更改标题
  util.title(to.meta.title)
})

export default router
