import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import home from '@/components/pages/home'
import index from '@/components/pages/index'
import newDetail from '@/components/pages/newDetail'
import regist from '@/components/pages/register_home'
import athletics from '@/components/pages/athletics'
import noticeDetail from '@/components/pages/noticeDetail'
import searchList from '@/components/pages/search_list'
import competioneNotice from '@/components/pages/competione_notice'
import story from '@/components/pages/story'
import media from '@/components/pages/media'
import picture from '@/components/pages/picture'

//田径故事
import athleticsStory from '@/components/pages/athletics_story'
import history from '@/components/pages/history'
import rule from '@/components/pages/rule'


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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/portal',
      name: 'index',
      component: index,
      children:[
        {path:'home',name:'home',component:home,
          meta:{
            'first':0
          }
          },
        {path:'regist',name:'regist',component:regist,
          meta:{
            'first':1
          }},
        {path:'newDetail',name:'newDetail',component:newDetail,
          meta:{
            'first':2
          }},
        {path:'athletics',
          name:'athletics',
          component:athletics,

          children:[
            {path:'noticeDetail',name:'noticeDetail',component:noticeDetail,
              meta:{
                'first':2,
                'second':'competioneNotice'
              }},
            {path:'competioneNotice',name:'competioneNotice',component:competioneNotice,
              meta:{
                'first':2,
                'second':'competioneNotice'
              }},
            {path:'searchList',name:'searchList',component:searchList,
              meta:{
                'first':2,
                'second':'searchList'
              }},
            {path:'story',name:'story',component:story,
              meta:{
                'first':2,
                'second':'story'
              }},
          ]
        },
        {
          path:'media',
          component:media,
          name:'media',
          meta:{
            'first':5
          }
        },
        {
          path:'picture',name:'picture',component:picture,
          meta:{
              'first':5
            }
        },{
          path:'athleticsStory',name:'athleticsStory',component:athleticsStory,
          children:[
            {
              path:'history',name:'history',component:history,
              meta:{
                'first':6,
                'second':'history',
              }
            },{
              path:'rule',name:'rule',component:rule,
              meta:{
                'first':6,
                'second':'rule',
              }
            }
          ]
        }
      ]
    }
  ]
})
