<template>
  <div class="navbar">

    <header :style="styleObject">
      <div v-if="$router.currentRoute.path==='/'">
        <img :src="require('@/assets/images/HOTI.png')" alt="">
      </div>

      <button class="left" @click="clickLeft" v-if="leftText || $attrs['left-arrow']===''">
        <Icon name="arrow-left" v-if="$attrs['left-arrow']===''"></Icon>{{leftText}}
      </button>
      <h3>{{title}}</h3>

      <button class="right" @click="clickRight">
        <slot name="right">{{rightText}}</slot>
      </button>
    </header>

    <!-- 弹出的导航框 -->
    <div @touchmove.prevent class="navwrapper" v-show="isShow" @click="navHide">
      <div class="left">
      </div>
      <ul>
        <router-link tag="li" :to="{path: route.path, query: {datas: route.query&&JSON.stringify(route.query.datas)}}" v-for="(route, index) in $router.options.routes" :key="index" v-show="!route.noShow">{{route.name}}</router-link>
      </ul>
    </div>
  </div>
</template>
 
<script>
import { Icon } from 'vant';
  export default {
    components: {
      Icon,
    },
    props: {
      title: String,
      leftText: String,
      rightText: String,
      bgImage: String,
    },
    data() {
      return {
        isShow: false,
      }
    },
    computed: {
      styleObject() {
        return {background: `url(${this.bgImage}) 0% 0% / 100% no-repeat`}
      }
    },
    methods: {
      clickLeft() {
        this.$emit('click-left')
      },
      clickRight() {
        this.isShow = !this.isShow
      },
      navHide() {
        this.isShow = false
      },
    },
    watch: {
      $route() {
        this.isShow = false
      },
    },
   
  } 
</script>

<style scoped lang="scss">
  header {
    color: #fff;
    height: px2rem(84px);
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    width: 100%;
    >div {
      background: url('../assets/images/bgbg.png') no-repeat;
      background-size: 100% 100%;
      width: px2rem(370px);
      height: px2rem(84px);
      line-height: px2rem(84px);
      text-align: center;
      img {
        width: px2rem(247px);
        height: px2rem(56px);
      }
    }
    button.right {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      background: none;
    }
    button.left {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      background: none;
    }
    h3 {
      display: inline-block;
      height: 100%;
      line-height: px2rem(84px);
    }
  }
  // 弹出导航框的样式
  .navwrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    display: flex;
    .left {
      width: 55%; 
      height: 100%;
      background: rgba($color: #000000, $alpha: 0.2)

    }
    ul {
      width: 45%;
      height: 100%;
      background-color: #e1642d;
      li {
        color: #fff;
        line-height: px2rem(85px);
        padding-left: px2rem(32px);
        height: px2rem(85px);
        border-bottom: 1px solid #fff;
        font-size: px2rem(32px);
      }
    }
  }
</style>
