import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Callus from './views/Callus'
import Aboutus from './views/Aboutus'
import Titleimage from '@/components/Titleimage'
import Imagegroup from '@/views/Imagegroup'
import Moreimage from '@/views/Moreimage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      bgImage: require('@/assets/images/bg_top1.jpg'),
    },
    {
      path: '/match',
      name: '智能赛事',
      component: Titleimage,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      query: {
        datas: [
          {
            title: '传统方式办赛参赛痛点',
            images: [require('@/assets/images/zhinengmatch.jpg')]
          },
          {
            title: '智能赛事解决方案',
            images: [require('@/assets/images/zhinengmatch1.jpg')]
          },
          {
            title: '效果',
            images: [require('@/assets/images/zhinengmatch3.jpg')]
          },
        ]
      }
    },
    {
      path: '/venue',
      name: '智能场馆',
      component: Titleimage,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      query: {
        datas: [
          {
            title: '我们的目标',
            images: [require('@/assets/images/venue7.jpg')]
          },
          {
            title: '整体结构图',
            images: [require('@/assets/images/venue1.jpg')]
          },
          {
            title: '多媒体中心',
            images: [require('@/assets/images/venue2.jpg')]
          },
        ]
      }
    },
    {
      path: '/service',
      name: '运动现场服务',
      component: Titleimage,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      query: {
        datas: [
          {
            title: '现场服务 : 场馆智慧展示系统',
            images: [require('@/assets/images/sportsspotservice1.jpg')]
          },
          {
            title: '现场服务 : 场馆软硬件智能系统集成',
            images: [require('@/assets/images/sportspotservice2.jpg')]
          },
        ]
      }
    },
    {
      path: '/technology',
      name: '运动视频技术',
      component: Titleimage,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      query: {
        datas: [
          {
            title: '核心技术 - 动作识别分析',
            images: [require('@/assets/images/sportvideobg1.jpg')]
          },
        ]
      }
    },
    {
      path: '/analysis',
      name: '运动大数据分析',
      component: Titleimage,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      query: {
        datas: [
          {
            title: '核心技术 - 大数据展示',
            images: [require('@/assets/images/bigdata3.jpg')]
          },
          {
            title: '核心技术 - 大数据平台',
            images: [require('@/assets/images/sportbigdata1.jpg')]
          },
          {
            title: '核心技术 - 物联网平台',
            images: [require('@/assets/images/sportbigdata2.jpg')]
          },
        ]
      }

    },
    {
      path: '/aboutus',
      name: '关于HOTi',
      component: Aboutus,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      query: {
        datas: [
          {
            title: '豪体体育发展有限公司',
            images: [require('@/assets/images/aboutus1.jpg')]
          },
          {
            title: '中国科学院重庆绿色智能技术研究院',
            images: [require('@/assets/images/aboutus2.jpg')]
          },
          {
            title: '合作伙伴',
            images: []
          },
        ]
      }
    },
    {
      path: '/callus',
      name: '联系我们',
      component: Callus,
      bgImage: require('@/assets/images/bg_top1.jpg'),
    },
    {
      path: '/imagegroup',
      name: '图片详细',
      component: Imagegroup,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      noShow: true,
    },
    {
      path: '/moreimage',
      name: '更多精彩',
      component: Moreimage,
      bgImage: require('@/assets/images/bg_top1.jpg'),
      noShow: true,
    },
    {
      path: '*',
      redirect: '/',
      noShow: true,
    },
  ],
});
