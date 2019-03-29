<template>
<!-- $route.query.datas $router.options.routes.filter((r)=>r.name==$route.name)[0].query.datas-->
  <div class="wrapper">
    <ul>
      <li v-for="(data, index) in JSON.parse($route.query.datas)" :key="index">
        <div class="title">
          <img src="@/assets/images/divbg2.png" alt="">
          <h3>{{data.title}}</h3>
        </div>
        <img v-lazy="img" v-for="(img, index) in data.images" :key="index" :src="img" alt="">
      </li>
         
    </ul>
    <div></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
  export default {
    data() {
      return {

      }
    },
    created() {
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    >div {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background: url('../assets/images/shuiyin.png');
    } 
    ul {
      background-color: #f6f9fc;
      li {
        padding: px2rem(40px) 0;
        text-align: center;
        div.title {
          position: relative;
          height: px2rem(130px);
          line-height: px2rem(130px);
          text-align: center;
          margin-bottom: px2rem(20px);
          img {
            position: absolute;
            width: px2rem(145px);
            left: px2rem(40px);
          }
          h3 {
            display: inline-block;
            width: px2rem(523px);
            height: px2rem(73px);
            background: url('../assets/images/divbg1.jpg') no-repeat;
            background-size: 100% 100%;
            line-height: px2rem(73px);
            text-align: center;
            color: #fff;
            font-size: px2rem(24px);
            font-weight: normal;       
          }
        }
        >img {
          width: 96%;
          +img {
            margin-top: px2rem(45px);
          }
        }
      }
    }
  }
</style>
