<template>
  <div class="moreimage">
    <h3>更多精彩 图集</h3>
    <p class="time">HOTi官网 <span>2018-12-07 11:01</span></p>
    <ul>
      <li v-for="(image, index) in images" :key="index">
        <router-link tag="img" :to="{path: image.path, query: {datas:JSON.stringify(image.datas)}}" class="swipeimage" v-lazy="image.src" />
        <p>{{image.desc}}</p>
      </li>
    </ul>
    
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
  export default {
    data() {
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
      }
    },
  }
</script>

<style scoped lang="scss">
  .moreimage {
    padding: px2rem(25px) px2rem(10px);
    padding-bottom: 0;
    h3 {
      font-size: px2rem(40px);
    }
    p.time {
      overflow: hidden;
      color: #8a8b8c; 
      padding: px2rem(20px) 0px;
      padding-right: px2rem(30px);
      border-bottom: 1px solid #dddddd;
      span {
        margin-left: px2rem(15px);
      }
    }
    ul {
      li {
        height: px2rem(400px);
        position: relative;
        margin-bottom: px2rem(30px);
        img {
          width: 100%;
          height: 100%;
        }
        p {
          box-sizing: border-box;
          width: 100%;
          position: absolute;
          bottom: 0;
          height: px2rem(50px);
          line-height: px2rem(50px);
          color: #fff;
          background: rgba($color: #000000, $alpha: 0.5);
          text-align: center;
          //bottom: px2rem(50px);
          padding-left: px2rem(20px);
        }
      }
      
    }
    
  }
</style>
