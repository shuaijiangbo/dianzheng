import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home'
import index from '@/components/pages/index'


//关于我们
import aboutUs from '@/components/pages/abou_us'
//列表
import itemLIst from '@/components/pages/itemLIst'
//详情
import projectDetail from '@/components/pages/projectDetail'

Vue.use(Router)

export default new Router({
  /*mode: 'history',  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式*/
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {path:'/',name:'home',component:home,
          meta:{
            'first':0
          }}
      ]
    },
    {
      path: '/portal',
      name: 'index',
      component: index,
      children:[
        {path:'home',name:'home',component:home,
          meta:{
            'first':0
          }},
        {
          path:'itemLIstzhihui',name:'itemLIst',component:itemLIst,
          meta:{
              'first':1
            }
        },{
          path:'itemLIsthangye',name:'itemLIsthangye',component:itemLIst,
          meta:{
            'first':2
          }
        },{
          path:'itemLIstqita',name:'itemLIstqita',component:itemLIst,
          meta:{
            'first':3
          }
        },{
          path:'itemLIstzhineng',name:'itemLIstzhineng',component:itemLIst,
          meta:{
            'first':4
          }
        },{
          path:'itemLIstfuwu',name:'itemLIstfuwu',component:itemLIst,
          meta:{
            'first':5
          }
        },{
          path:'itemLIstjichu',name:'itemLIstjichu',component:itemLIst,
          meta:{
            'first':6
          },children:[{
              path:'projectDetail',name:'projectDetail',component:projectDetail,
              meta:{
                'first':6,
              }
            }
          ]
        },
        {
          path:'projectDetail',name:'projectDetail',component:projectDetail,
        },
        {
          path:'aboutUs',name:'aboutUs',component:aboutUs,
          meta:{
            'first':7
          }
        }
      ]
    }
  ]
})
