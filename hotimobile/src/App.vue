<template>
<!--left-text="返回" right-text="按钮"  title="关于我们"  -->
  <div>
    <Navbar   
      :bgImage="currentRoute.bgImage"
      :title="currentRoute.name=='首页'?'': currentRoute.name"
      :left-arrow="currentRoute.name=='首页'? false : ''"
      @click-left="onClickLeft"
      >
      <Icon name="wap-nav" slot="right"></Icon>
    </Navbar>
 
    <div class="container" :style="{minHeight: minHeight + 'px'}">
      <router-view/>
    </div>
    
    <footer :style="styleObject">
      <router-link to="/callus">联系我们</router-link>
      <p class="middle"><span>@2018 豪体体育HOTi</span><span>保留所有权利</span></p>
      <p>渝 ICP备18004183号</p>
    </footer>
  </div>
  
</template>

<script>
import Navbar from '@/components/Navbar'

import { Icon } from 'vant'
export default {
  components: {
    Icon,
    Navbar,
    
  },
  data() {
    return {
      isShow: false,
      styleObject: {},
      minHeight: '',
    }
  },
  computed: {
    currentRoute() {
      return  this.$router.options.routes.filter(route => {
        return route.name == this.$route.name
      })[0]
    }
  },
  watch: {
    $route() {
      this.minHeight = document.documentElement.clientHeight - document.getElementsByTagName('header')[0].clientHeight - document.getElementsByTagName('footer')[0].clientHeight 
    }
  },
  mounted() {
    this.minHeight = document.documentElement.clientHeight - document.getElementsByTagName('header')[0].clientHeight - document.getElementsByTagName('footer')[0].clientHeight 
  },
 
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.isShow = !this.isShow;
    },

  },
}
</script>

<style scoped lang="scss">
  
  
  footer {
    width: 100%;
    padding: px2rem(15px) 0;
    background: #373d41;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: px2rem(18px);
    a {
      color: #fff;
      font-size: px2rem(18px);
    }
    .middle {
      padding: px2rem(10px) 0px;
      span {
        &:first-child {
          padding-right: px2rem(20px);
        }
      }
    }
  }
</style>
