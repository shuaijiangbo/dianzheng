<template>
  <el-row class="container">
    <el-col :span="24" class="header" :style="{backgroundImage: 'url('+headerBg+')'}">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img :src="icon" alt>
        <img :src="sysname" alt>
        <!--{{collapsed?'':sysName}}-->
      </el-col>
      <!--<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
      </el-col>-->
      <el-col :span="4" class="userinfo">
        <!-- 用户名：{{sysUserName}} -->
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            用户名：
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu :default-active="activeMenu" :default-openeds="$route.children" class="g-side" router >
          <template v-for="(route) in menus">
            <template v-if="route.children && !route.noMenu">
              <el-submenu :key="route.name" :index="route.name">
                <template slot="title">
                  <img class="navicon" :src="route.src" alt>
                  {{route.name || route.name}}
                </template>
                <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex.name" :index="cRoute.name" :route="cRoute">{{cRoute.name || cRoute.name}}</el-menu-item>
              </el-submenu>
            </template>
            <template v-if="route.noMenu">
              <el-menu-item v-if="!cRoute.isShow" v-for="(cRoute, cIndex) in route.children" :key="cIndex.name" :index="cRoute.name" :route="cRoute"><i :class="route.iconCls" style="opacity: 0"></i>{{cRoute.name || cRoute.name}}</el-menu-item>
            </template>
          </template>
        </el-menu>
        <!--导航菜单-->
        <!-- <el-menu
          :default-active="$route.name"
          class="el-menu-vertical-demo"
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          unique-opened
          router
          v-show="!collapsed"
          background-color="rgb(36, 40, 45)"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
        >
          <template v-for="(item,index) in menus" v-if="!item.noMenu">
            <el-submenu :index="item.name" v-if="item.children" :key="index">
              <template slot="title">
                <img class="navicon" :src="item.src" alt>
                {{item.name}}
              </template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.name"
                :key="child.path"
                v-if="!child.hidden"
              >{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :index="item.children[0].name"
              :key="index"
            >
              <i :class="item.iconCls" style="opacity: 0"></i>
              {{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu> -->
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li
            v-for="(item,index) in $router.options.routes"
            v-if="!item.hidden"
            class="el-submenu item"
            :key="index"
          >
            <template v-if="!item.leaf">
              <div
                class="el-submenu__title"
                style="padding-left: 20px;"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <i :class="item.iconCls"></i>
              </div>
              <ul
                class="el-menu submenu"
                :class="'submenu-hook-'+index"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <li
                  v-for="child in item.children"
                  v-if="!child.hidden"
                  :key="child.path"
                  class="el-menu-item"
                  style="padding-left: 40px;"
                  :class="$route.path==child.path?'is-active':''"
                  @click="$router.push(child.path)"
                >{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div
                  class="el-submenu__title el-menu-item"
                  style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                  :class="$route.path==item.children[0].path?'is-active':''"
                  @click="$router.push(item.children[0].path)"
                >
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>
      </aside>

      
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <!--<strong class="title">{{$route.name}}</strong>-->
            <el-breadcrumb separator=">" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import util from '@/common/util.js'
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: this.$root.userData, // 路由、资源权限数据
      menus: this.$root.menuData, // 路由菜单
      headerBg: require("@/assets/header.jpg"),
      icon: require("@/assets/icon.png"),
      sysname: require("@/assets/sysname.png"),

      sysName: "VUEADMIN",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "./static/images/p1.jpg",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    },
  },
  methods: {
    ...mapActions(["getAllColumns"]),
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          _this.$emit('logout');
        })
        .catch(() => {});
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    let user = util.session('user');
    if (user) {
      this.sysUserName = user.account || "";
      this.sysUserAvatar = user.avatar || "";
    }

    // 初始化 store 中的 state
    this.getAllColumns()
      .catch(res => {
        this.$message({
          type: "error",
          message: res.message ? res.message : "请求失败"
        });
      });
  },

};
</script>

<style scoped type="text/scss" lang="scss">
.topStyle {
  border-top: 0px !important;
  border-right: 0px !important;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    /*height: 60px;*/
    /*line-height: 60px;*/
    height: 69px;
    line-height: 69px;
    /*background: orangered;*/
    //background-image: url(headerBg);
    background-size: 100% 100%;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 69px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        /*width: 40px;*/
        /*float: left;*/
        /*margin: 10px 10px 10px 18px;*/

        margin-left: 10px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      /*width:230px;*/
      display: flex;
      align-items: center;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 69px;
    bottom: 0px;
    overflow: hidden;
    .breadcrumb-inner {
      float: left !important;
    }
    aside {
      flex: 0 0 230px;
      width: 230px;

      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
        background: #1d8ce0;
        .navicon {
          margin-right: 10px;
        }
      }
      .el-menu > li.el-submenu:first-child {
        border-top: 0;
        border-right: 0;
      }

      .el-submenu {
        border-bottom: 1px solid #050606;
        border-top: 1px solid rgb(93, 99, 104);
        border-right: 1px solid rgb(93, 99, 104);
      }

      /*.el-menu-item.is-active {
                    color: #16caf7 !important;
                }*/
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 200px;
      width: 200px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>