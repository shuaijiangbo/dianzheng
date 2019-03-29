<template>
  <div>

    <Swipe :show-indicators="false" :autoplay="3000" indicator-color="white">
      <SwipeItem v-for="(image, index) in images" :key="index" :style="{background: `url(${image.src}) left top / 100% 100% no-repeat`}" :to="{path: image.path, query: {datas:JSON.stringify(image.datas)}}">
        <router-link tag="img" style="opacity: 0" :to="{path: image.path, query: {datas:JSON.stringify(image.datas)}}" class="swipeimage" v-lazy="image.src" />
        <p>{{image.desc}}</p>
      </SwipeItem>
    </Swipe>
    <ul>
      <router-link tag="li" :to="{path:menu.path, query:{datas: JSON.stringify(menu.query.datas)} }" :style="{background: `url(${menu.img}) no-repeat`,backgroundSize: '100% 100%'}" v-for="(menu, index) in menulist" :key="index">
        <img :src="menu.icon" alt="">
        <p>{{menu.title}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload  } from 'vant'

Vue.use(Lazyload) 
export default { 
  name: 'home',
  components: {
    Swipe,
    SwipeItem,
  },
  data () {
    return {
      
      images: [
        {
          src: require('@/assets/images/a1.jpg'),
          desc: '2018/2019亚洲青少年花样滑冰挑战赛（现场技术服务）',
          path: '/imagegroup',
          datas: {
            title: '2018/2019亚洲青少年花样滑冰挑战赛（现场技术服务）',
            content: '很荣幸能为“亚洲级”的赛事服务。',
            images: [
              {src: require('@/assets/images/a1.jpg'), desc: ''},
              {src: require('@/assets/images/a1-1.jpg'), desc: '2018年12月22日，2018/2019亚洲青少年花样滑冰挑战赛在三亚举办'}, 
              {src: require('@/assets/images/a3.jpg'), desc: ''},
              {src: require('@/assets/images/a3-1.jpg'), desc: '赛前-技术准备完毕'},
              {src: require('@/assets/images/a5.jpg'), desc: '赛中-现场服务'},
              {src: require('@/assets/images/a6.jpg'), desc: '赛中-香港选手参加'},
            ],
          }
        },
        {
          src:require('@/assets/images/b2.jpg'),
          desc: '北京市第一届冬季运动会花样滑冰（现场技术服务）',
          path: '/imagegroup',
          datas: {
            title: '北京市第一届冬季运动会花样滑冰（现场技术服务）',
            content: 'HOTi新版的现场服务系统（软件+硬件）上线。包含：成绩计算系统、裁判打分系统、大屏幕展示系统、现场动作识别及视频回放系统等。',
            images: [
              {src: require('@/assets/images/b1.jpg'), desc: '2018年12月1日，北京市第一届冬季运动会花样滑冰赛事隆重开幕'},
              {src: require('@/assets/images/b2.jpg'), desc: '赛前-裁判（技术组）设备'}, 
              {src: require('@/assets/images/b3.jpg'), desc: '赛中-裁判（打分）设备'},
              {src: require('@/assets/images/b4.jpg'), desc: '赛中-技术服务场景'},
              {src: require('@/assets/images/b5.jpg'), desc: '服务中特写'},
              {src: require('@/assets/images/b6.jpg'), desc: '赛中-精彩动作回放'},
              {src: require('@/assets/images/b7.jpg'), desc: '赛中-比赛排名'},
            ],
          }
        },
        {
          src:require('@/assets/images/d1.jpg'),
          desc: '第二届全国青年运动会重庆队选拔赛（现场技术服务）',
          path: '/imagegroup',
          datas: {
            title: '第二届全国青年运动会重庆队选拔赛（现场技术服务）',
            content: '重庆的花样滑冰运动开展也十分活跃。',
            images: [ 
              {src: require('@/assets/images/d1.jpg'), desc: '2018年11月24日，第二届全国青年运动会重庆队选拔赛在重庆举办'},
              {src: require('@/assets/images/d2.jpg'), desc: '赛前-大屏幕画面'}, 
              {src: require('@/assets/images/d3.jpg'), desc: '赛中-比赛评分'},
              {src: require('@/assets/images/d4.jpg'), desc: '赛中-比赛排名'},
            ],
          }
        },
      ],
      menulist: [
        {
          img: require('@/assets/images/backgroundpic_u01.png'),
          icon: require('@/assets/images/icon_u01.png'),
          title: '智慧赛事',
          path: '/match',
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
          img: require('@/assets/images/backgroundpic_u02.png'),
          icon: require('@/assets/images/icon_u02.png'),
          title: '智慧场馆',
          path: '/venue',
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
          img: require('@/assets/images/backgroundpic_u03.png'),
          icon: require('@/assets/images/icon_u03.png'),
          title: '运动现场服务',
          path: '/service',
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
          img: require('@/assets/images/backgroundpic_u04.png'),
          icon: require('@/assets/images/icon_u04.png'),
          title: '运动视频技术',
          path: '/technology',
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
          img: require('@/assets/images/backgroundpic_u05.png'),
          icon: require('@/assets/images/icon_u05.png'),
          title: '运动大数据分析',
          path: '/analysis',
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
          img: require('@/assets/images/backgroundpic_u06.png'),
          icon: require('@/assets/images/icon_u06.png'),
          title: '关于HOTi',
          path: '/aboutus',
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
      ],
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
  .swipeimage {
    width: 100%;
    height: 100%;
  }
  .van-swipe {
    height: px2rem(400px);
    p {
      position: relative;
      height: px2rem(50px);
      line-height: px2rem(50px);
      color: #fff;
      background: rgba($color: #000000, $alpha: 0.5);
      bottom: px2rem(50px);
      padding-left: px2rem(20px);
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: px2rem(10px);
    li {
      width: px2rem(730px);
      height: px2rem(154px);
      display: flex;
      //justify-content: center;
      align-items: center;
      margin-bottom: px2rem(10px);
      img {
        width: px2rem(50px);
        margin-right: px2rem(30px);
        margin-left: px2rem(235px);
      }
      p {
        color: #fff;
        font-size: px2rem(36px);
        font-weight: bold;
      }
    }
  }
</style>

