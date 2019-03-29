import Vue from 'vue'
import Router from 'vue-router'

/** 基础 **/
const layout = () => import('../view/layout/layout')
const login = () => import('../view/login/login')

/**  首页 **/
const main = () => import('../view/match/index')

/**  我的报名 **/
const mySignUp = () => import('../view/mySignUp/index')

/**  个人中心 **/
const personCenter = () => import('../view/personCenter/index')
const myJoinMatch = () => import('../view/personCenter/myJoinMatch') //我的参赛
const matchLog = () => import('../view/personCenter/matchLog') //我的参赛
const athleticsCareer = () => import('../view/personCenter/athleticsCareer')//运动生涯
const signUpInfo = () => import('../view/personCenter/signUpInfo')//报名信息
const orderList = () => import('../view/personCenter/orderList')//订单信息
const orderDetail = () => import('../view/personCenter/orderDetail')//订单详情
const perfectInfo = () => import('../view/personCenter/perfectInfo')//完善信息
const resetPsd = () => import('../view/personCenter/resetPsd')//重置密码

Vue.use(Router);
/** base router* */
export const constRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/match',
    component: layout,
    children: [
      {
        path: '',
        component: main
      }
    ]
  },
  {
    path: '/mySignUp',
    component: layout,
    children: [
      {
        path: '',
        component: mySignUp
      }
    ]
  },
  {
    path: '/personCenter',
    component: layout,
    children: [
      {
        path: '',
        component: personCenter
      }
    ]
  },
  {
    path: '/resetPsd',
    component: layout,
    children: [
      {
        path: '',
        component: resetPsd
      }
    ]
  },
  {
    path: '/orderList',
    component: layout,
    children: [
      {
        path: '',
        component: orderList
      }
    ]
  },
  {
    path: '/orderDetail',
    component: layout,
    children: [
      {
        path: '',
        component: orderDetail
      }
    ]
  },
  {
    path: '/signUpInfo',
    component: layout,
    children: [
      {
        path: '',
        component: signUpInfo
      }
    ]
  },
  {
    path: '/perfectInfo',
    component: layout,
    children: [
      {
        path: '',
        component: perfectInfo
      }
    ]
  },
  {
    path: '/athleticsCareer',
    component: layout,
    children: [
      {
        path: '',
        component: athleticsCareer
      }
    ]
  },
  {
    path: '/myJoinMatch',
    component: layout,
    children: [
      {
        path: '',
        component: myJoinMatch
      }
    ]
  },
  {
    path: '/matchLog',
    component: layout,
    children: [
      {
        path: '',
        component: matchLog
      }
    ]
  },
];

export default new Router({
  routes: constRouterMap,
  scrollBehavior: () => ({ y: 0 })
});



