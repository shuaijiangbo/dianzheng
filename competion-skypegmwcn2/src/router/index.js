import Vue from 'vue'
import Router from 'vue-router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import login from '@/components/pages/login'
import register from '@/components/pages/register'
import accountSet from '@/components/pages/accountSet'
import forgetPwd from '@/components/pages/forgetPwd'
import index from '@/components/pages/index'


import applyPage from '@/components/pages/applyPage'
import classStatus from '@/components/pages/classStatus'
import pay from '@/components/pages/pay'   //二维码支付
import success from '@/components/pages/success'   //支付成功
import choosePayWay from '@/components/pages/choosePayWay'   //选择支付方式
import otherPayWay from '@/components/pages/otherPayWay'   //选择其他方式

import personal from '@/components/pages/personal'   //个人中心
import orderList from '@/components/pages/orderList'   //个人中心
import count from '@/components/pages/count'   //个人中心
import payOrderList from '@/components/pages/payOrderList'   //订单中心

/*****比赛内容*****/
const chooseComponents =()=>import('../components/pages/chooseComponents')
const comContainer =()=>import('../components/pages/comContainer')
const noticeDeatil =()=>import('../components/pages/noticeDetail')
const componentHome =()=>import('../components/pages/componentHome')
const componentRule =()=>import('../components/pages/componentRule')
const componentData =()=>import('../components/pages/componentData')
const componentNotice =()=>import('../components/pages/componentNotice')
const componentApply =()=>import('../components/pages/componentApply')
const athleticCareer =()=>import('../components/pages/athleticCareer')   //运动生涯
const athleticCareerDeatil =()=>import('../components/pages/athleticCareerDeatil')   //运动生涯

Vue.use(Router)



const router= new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {path:'/',name:'chooseComponents',component:chooseComponents}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {
          path: 'chooseComponents',
          name: 'chooseComponents',
          component: chooseComponents,
        },
        {
          path: 'noticeDeatil',
          name: 'noticeDeatil',
          component: noticeDeatil
        },
        {
          path: 'applyPage',
          name: 'applyPage',
          component: applyPage,
        },
        {
          path: 'classStatus',
          name: 'classStatus',
          component: classStatus,
        },{
          path: 'choosePayWay',
          name: 'choosePayWay',
          component: choosePayWay,
        },{
          path: 'otherPayWay',
          name: 'otherPayWay',
          component: otherPayWay,
        },{
          path: 'pay',
          name: 'pay',
          component: pay,
        },
        {
          path: 'accountSet',
          name: 'accountSet',
          component: accountSet
        },
        {
          path: 'success',
          name: 'success',
          component: success,
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal,
          children:[
            {path:'orderList',name:'orderList',component:orderList,
              meta:{
                'second':'orderList'
              }
            },
            {path:'count',name:'count',component:count,
              meta:{
                'second':'count'
              }
            },
            {path:'athleticCareer',name:'athleticCareer',component:athleticCareer,
              meta:{
                'second':'athleticCareer'
              }
            },
            {path:'athleticCareerDeatil',name:'athleticCareerDeatil',component:athleticCareerDeatil,
              meta:{
                'second':'athleticCareer'
              }
            },
            {path:'payOrderList',name:'payOrderList',component:payOrderList,
              meta:{
                'second':'payOrderList'
              }
            },
          ]
        }
        ,{
          path: 'comContainer',
          name: 'comContainer',
          component: comContainer,
          children:[
            {path:'componentHome',name:'componentHome',component:componentHome,
              meta:{
                'second':'componentHome'
              }
            },
            {path:'componentRule',name:'componentRule',component:componentRule,
              meta:{
                'second':'componentRule'
              }
            },
            {path:'componentData',name:'componentData',component:componentData,
              meta:{
                'second':'componentData'
              }
            },
            {path:'componentNotice',name:'componentNotice',component:componentNotice,
              meta:{
                'second':'componentNotice'
              }
            },
            {path:'componentApply',name:'componentApply',component:componentApply,
              meta:{
                'second':'componentApply'
              }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()
  next()
})


router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 更改标题
  /*util.title(to.meta.title)*/
})

export default router
