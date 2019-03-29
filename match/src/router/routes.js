import matchManage from './modules/matchManage'
import allMatchManage from './modules/allMatchManage'
import userManage from './modules/userManage'
import signupManage from './modules/signupManage'
import scoreManage from './modules/scoreManage'
import supportManage from './modules/supportManage'
import attchManage from './modules/attchManage'
import noticeManage from './modules/noticeManage'

const frameIn = [
  {
    path: '/',
    redirect: { name: 'matchManage' },
    hidden: true,
    component: () => import('@/views/layout/index.js'),
    icon: 'home',
    meta: {
      title: '首页'
    },
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        hidden: true,
        meta: {
          title: '首页'
        },
        component: () => import('@/views/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      }
    ]
  },
  matchManage,
  userManage,
  signupManage,
  scoreManage,
  supportManage,
  attchManage,
  noticeManage,
  allMatchManage,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 在主框架之外显示 == 不需要有对应的导航菜单 == 无需权限所有都能访问
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404 path: '*'
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  }
]

// 导出需要显示菜单的 路由
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameOut,
  ...errorPage,
  ...frameIn
]
