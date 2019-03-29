<template>
  <div id="layout">
    <header>
      <div class="left">
        <img style="height: 50px;marginRight: 15px" :src="require('@/assets/logo.png')" alt="豪体体育">
        <img :src="require('@/assets/title.png')" alt="体育圈--智慧赛事平台办赛端">
      </div>
      <div class="right">
        <span>欢迎您，{{ $store.state.match.user.info.account }}</span>
         <lp-button style="width: 50px;marginLeft: 20px" size="mini" icon="icon084tuichu" type="text" @click="logOff">退出</lp-button>
      </div>
    </header>

    <div class="container">

      <div class="aside">
        <el-menu
          :router="true"
          ref="menu"
          :default-active="active"
          class="el-menu-vertical-demo">
          <template v-for="(menu, menuIndex) in menuAside" >
            <match-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"></match-menu-item>
            <match-menu-sub v-else :menu="menu" :key="menuIndex"></match-menu-sub>
          </template>
        </el-menu>
      </div>

      <div class="content">
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/matchManage">赛事管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="index !== 0" v-for="(item, index) in $route.matched" :key="index">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="routerview">
          <transition name="fade-transverse" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { frameInRoutes } from '@/router/routes'
  import MatchMenuItem from './components/menu-item/index.vue'
  import MatchMenuSub from './components/menu-sub/index.vue'
  import { mapActions } from 'vuex'
  let menuAside = []
  let setMenu = function (array, base) {
    let replyResult = []
    menuAside = []
    array.forEach(route => {
      if (!route.hidden) {
        let path = '/' + ((base ? base + '/' : '') + route.path).replace(/^\/*/, '')
        route.title = route.meta.title
        route.path = path
        if (Array.isArray(route.children)) {
          route.children = setMenu(route.children, route.path)
        }
        replyResult.push(route)
      }
    })

    if (base) {
      if (replyResult.length === 0) {
        return undefined
      }
      return replyResult
    } else {
      menuAside = menuAside.concat(replyResult)
    }
  }
  export default {
    data() {
      return {
        menuAside: [],
        active: ''
      }
    },
    methods: {
      ...mapActions('match/account', ['logout']),
      logOff () {
        this.logout({ vm: this, confirm: true })
      }
    },
    components: {
      'match-menu-item': MatchMenuItem,
      'match-menu-sub': MatchMenuSub
    },
    watch: {
      // 监听路由 控制侧边栏激活状态
      '$route': {
        handler ({ fullPath }) {
          this.active = fullPath
          this.$nextTick(() => {
            if (this.menuAside.length > 0 && this.$refs.menu) {
              this.$refs.menu.activeIndex = fullPath
            }
          })
        },
        immediate: true
      }
    },
    created() {
      setMenu(frameInRoutes)
      this.menuAside = menuAside
    }
  }
</script>

<style scoped lang="scss">
  #layout {
    height: 100%;
    header {
      height: 70px;
      background: url('../../assets/bg-header.png');
      &after {
        content: '';
        display: table;
        clear: both;
      }
      .left {
        float: left;
        height: 100%;
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      .right {
        float: right;
        color: #fff;
        font-size: 14px;
        height: 100%;
        line-height: 70px;
        padding-right: 40px;
        
      }
    }
    .aside {
      background-color: #343a40;
    }
    .container {
      height: calc(100% - 70px);
      .aside {
        float: left;
        width: 200px;
        height: 100%;
      }
      .content {
        height: 100%;
        margin-left: 200px;
        display: flex;
        flex-direction: column;
        .breadcrumb {
          padding-left: 30px;
          background-color: #eeeeed;
          border-bottom: 1px solid #bfbfbf;
        }
        .routerview {
          flex: 1;
          overflow: hidden;
        }
        /*// 过渡动画 横向渐变*/
        .fade-transverse-leave-active,
        .fade-transverse-enter-active {
          transition: all .5s;
        }
        .fade-transverse-enter {
          opacity: 0;
          transform: translateX(-30px);
        }
        .fade-transverse-leave-to {
          opacity: 0;
          transform: translateX(30px);
        }
      }
    }
  }
  
  
</style>
