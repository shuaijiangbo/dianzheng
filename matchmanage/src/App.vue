<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view @login="loginDirect" @logout="logoutDirect"></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import AllRoutesData from "./router/fullpath.js";
import util from "./common/util.js";
import { system } from "@/api/api";
// axios Interceptor
let myInterceptor;

export default {
  data() {
    return {
      menuData: null,
      userData: null
    };
  },

  methods: {
    // 为axios设置拦截器实现 请求控制
    setInterceptor: function(resourcePermission) {
      myInterceptor = axios.interceptors.request.use(config => {
        // Get request path
        let perName = config.url.replace(config.baseURL, "").split("?")[0];
        //RESTful type 1 /path/**
        // let reg1 = perName.match(/^(\/[^\/]+\/)[^\/]+$/);
        // if (reg1) {
        //   perName = reg1[1] + '**';
        // }
        // //RESTful type 2 /path/*/path
        // let reg2 = perName.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/);
        // if (reg2) {
        //   perName = perName.replace(reg2[1], '*');
        // }
        // Check permissions
        // /auth-api/sports-auth/back/getResource
        if(perName == '/auth-api/sports-auth/back/dologin' || perName == '/auth-api/sports-auth/back/getResource') {
          return config;
        }
        if (!resourcePermission[config.method.toLowerCase() + "," + perName]) {
          return Promise.reject({
            response: {
              status: 403,
              data: {
                message: "无访问权限，请联系企业管理员"
              }
            }
          });
        }
        return config;
      });
    },
    // 将资源数据转为 resourceHash
    getResources: function(userPermissions) {
      let resourceHash = {};
      if (Array.isArray(userPermissions.resources)) {
        /*
        * Input like this:
        * [{
        *   id: "2c9180895e172348015e1740805d000d"
            method: "GET"
            url: "/some-url"
        * }]
        */
        userPermissions.resources.forEach(e => {
          let key = e.method.toLowerCase() + "," + e.url;
          resourceHash[key] = true;
        });
      }
      // Get hash strsports-ucture
      return resourceHash;
    },

    getRoutes: function(userPermissions) {
      let routeHash = {};
      // 将路由数据转为 routeHash
      // 该方法将嵌套的父子结构转为 {/route1: true, /route1/route1-1: true} routeHash
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.route) {
            // 清除开头的所有 /,在添加一个/。  避免首页('/')的子路由的 '/'+'/' = '//'。
            // 奇怪的routeHash 如: {'/':true,'///':true,'//userManage':true}
            // 正确的routeHash变为: {'/': true,'/*':true,'/userManage':true}
            // 问题在于: 刷新userManage页面的时候，路由为/userManage。routeHash 却是 '//userManage':true。因此显示没权限
            let hashKey = ((base ? base + "/" : "") + key.route).replace(
              /^\/*/,
              ""
            );
            routeHash["/" + hashKey] = true;
            if (Array.isArray(key.children)) {
              setMenu2Hash(key.children, key.route);
            }
          }
        });
      };
      if (Array.isArray(userPermissions.menus)) {
        /*
         * Input Like this:
         * [{
         *   id: "2c9180895e13261e015e13469b7e0000",
         *   name: "账户管理",
         *   parent_id: "2c9180895e13261e015e13469b7e0000",
         *   route: "some-route"
         * }]
         */
        let arrayMenus = util.buildMenu(userPermissions.menus);
        setMenu2Hash(arrayMenus);
      }
      // Get hash strsports-ucture
      return routeHash;
    },
    // 扩展路由实现 路由控制
    extendRoutes: function(routePermission) {
      // Filtering local routes, get actual routing

      let actualRouter = [];
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(route => {
          // 清楚开头所有的 / ,再加上一个 /, 避免首页(/)的子路由出现'//userManage'和首页的'/' 。
          // 因为'//userManage'即使能够routePermission['//userManage']匹配成功，但'//userManage'这个routeHash本身就存在问题。
          // 目前为'/userMange' 配合上面的routeHash正好匹配成功。成功添加路由
          let pathKey =
            "/" + ((base ? base + "/" : "") + route.path).replace(/^\/*/, "");
          if (routePermission[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path);
            }
            replyResult.push(route);
          }
        });
        if (base) {
          // 有base证明是儿子，得把数据返回给route.children = replyResult
          return replyResult;
        } else {
          // 没有base，直接放进actualRouter数组中
          actualRouter = actualRouter.concat(replyResult);
        }
      };
      findLocalRoute(AllRoutesData); // AllRoutesData[0].children

      // If the user does not have any routing authority

      if (!actualRouter || !actualRouter.length) {
        // clear token, refresh page will jump to login screen.
        util.session("user", "");
        // Interface hints
        return (document.body.innerHTML =
          "<h1>账号访问受限，请联系系统管理员！</h1>");
      }

      actualRouter.map(e => {
        // Copy 'children' to 'meta' for rendering menu.(This step is optional.)

        if (e.children) {
          if (!e.meta) e.meta = {};
          e.meta.children = e.children;
        }

        // Add Per-Route Guard
        // To prevent manual access to ultra vires routing after switching accounts

        return (e.beforeEnter = (to, from, next) => {
          if (routePermission[to.path]) {
            next();
          } else {
            next("/401");
          }
        });
      });

      // Add actual routing to application

      // let originPath = util.deepcopy(AllRoutesData);
      let originPath = actualRouter; // originPath[0].children = actualRouter;
      this.$router.addRoutes(
        originPath.concat([
          {
            path: "*",
            redirect: "/404"
          }
        ])
      );

      // Save information for rendering menu.(This step is optional.)
      this.$root.menuData = actualRouter;
    },
    // 应用开启就调用此方法，登录or获取权限数据进行权限控制初始化
    signin: function(callback) {
      let vm = this;

      let localUser = util.session("user");
      if (!localUser) {
        return vm.$router.push({
          path: "/login",
          query: { from: vm.$router.currentRoute.path }
        });
      }

      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localUser.token;
      system.getResource.r({ id: localUser.id }).then(res => {
        let userPermissions = res.data;

        /* let userPermissions = { 
          resources: [
            {
              id: "2c9180895e172348015e1740805d000d",
              method: "GET",
              url: "/cms-api/sports-cms/column/list",
            },
            {
              id: "2c92220895e172348015e1740805d000d",
              method: "POST",
              url: "/cms-api/sports-cms/column/add",
            },
            {
              id: "2c1111895e172348015e1740805d000d",
              method: "POST",
              url: "/cms-api/sports-cms/column/batchDelete",
            },
            {
              id: "213111895e172348015e1740805d000d",
              method: "POST",
              url: "/cms-api/sports-cms/column/update",
            },
            {
              id: "21111895e172348015e1740805d000d",
              method: "POST",
              url: "/cms-api/sports-cms/column/delete",
            },
            {
              id: "2c33111895e172348015e1740805d000d",
              method: "POST",
              url: "/cms-api/sports-cms/column/offline",
            },
            {
              id: "2c33311895e172348015e1740805d000d",
              method: "POST",
              url: "/cms-api/sports-cms/column/online",
            },

            {
              id: "232133123895e172348015e1740805d000d",
              method: "POST",
              url: "/uc-api/sports-uc/user/add",
            },
            {
              id: "2321sdf5e172348015e1740805d000d",
              method: "POST",
              url: "/uc-api/sports-uc/user/delete",
            },
            {
              id: "232133123895e172dfds805d000d",
              method: "POST",
              url: "/uc-api/sports-uc/user/detail",
            },
            {
              id: "232133sdfd5e1740805d000d",
              method: "POST",
              url: "/uc-api/sports-uc/user/getUserRoleResource",
            },
            {
              id: "232sdfsdf805d000d",
              method: "GET",
              url: "/uc-api/sports-uc/user/list",
            },
            {
              id: "2321dsfdf015e1740805d000d",
              method: "POST",
              url: "/uc-api/sports-uc/user/update",
            },
            {
              id: "232sdfsdfs5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/user/batchDelete",
            },

            {
              id: "23sdfssdfs5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/role/add",
            },
            {
              id: "232sdsdfs5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/role/delete",
            },
            {
              id: "2sdfsafs5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/role/detail",
            },
            {
              id: "232sdfs",
              method: "GET",
              url: "/uc-api/sports-uc/role/list",
            },
            {
              id: "232sqweqw000d",
              method: "POST",
              url: "/uc-api/sports-uc/role/update",
            },
            {
              id: "232sdfsdfs5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/role/batchDelete",
            },

            {
              id: "232sdfsfs5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/resource/add",
            },
            {
              id: "2sdfss5d000d",
              method: "POST",
              url: "/uc-api/sports-uc/resource/delete",
            },
            {
              id: "232sdfsfs5sdfsd",
              method: "POST",
              url: "/uc-api/sports-uc/resource/detail",
            },
            {
              id: "232sdsdfs0d",
              method: "GET",
              url: "/uc-api/sports-uc/resource/list",
            },
            {
              id: "23asdasd",
              method: "POST",
              url: "/uc-api/sports-uc/resource/update",
            },
            {
              id: "2sdfsdddasd",
              method: "POST",
              url: "/uc-api/sports-uc/resource/batchDelete",
            },

            {
              id: 'sdfsdf',
              method: "POST",
              url: "/uc-api/sports-uc/roleresource/addOrUpdate"
            },
            {
              id: '112sad',
              method: "POST",
              url: "/uc-api/sports-uc/roleresource/getRoleResource"
            },

            {
              id: 'qweqwe',
              method: "POST",
              url: "/uc-api/sports-uc/userrole/addOrUpdate"
            },
            {
              id: 'sadasd',
              method: "POST",
              url: "/uc-api/sports-uc/userrole/getUserRole"
            }, 
          ],
          menus: [
            {
              id: "0",
              name: "首页",
              parent_id: "2c9180895e13261e015e134691111000",
              route: "/" 
            }, 
            {
              id: "01",
              name: "",
              parent_id: "0",
              route: "*",
            }, 
            {
              id: '02',
              route: 'userManage',
              parent_id: "0",
              name: '用户管理'
            },
            {
              id: '03',
              route: 'roleManage',
              parent_id: "0",
              name: '角色管理',
            },
            {
              id: '04',
              route: 'resourceManage',
              parent_id: "0",
              name: '资源管理',
            },

            {
              id: "1",
              name: "内容管理",
              parent_id: "2c9180895e13261e015e13469b7e0000",
              route: "content"
            }, 
            {
              id: "10",
              route: 'column',
              parent_id: "1",
              name: '栏目管理'
            },
            {
              id: "11",
              route: 'article',
              parent_id: "1",
              name: '文章管理'
            },
            {
              id: "12",
              route: 'atlas',
              parent_id: "1",
              name: '图集管理'
            },
            {
              id: "13",
              route: 'video',
              parent_id: "1",
              name: '视频管理'
            },
            {
              id: "14",
              route: 'attachment',
              parent_id: "1",
              name: '附件管理'
            },
            {
              id: "15",
              route: 'dataDict',
              parent_id: "1",
              name: '数据字典管理'
            },
            {
              id: "16",
              route: 'dataDictType',
              parent_id: "1",
              name: '数据字典类型管理'
            },
            
          ]
        } */
        vm.$root.userData = userPermissions;

        // { "get,/url1": true, "post,/url2": true, ... }
        let resourcePermission = vm.getResources(userPermissions);

        // { "/route1": true, "/route2": true, ... }
        let routePermission = vm.getRoutes(userPermissions);
        /*
         * Step 5
         * Setting request permission control through resourcePermission
         */

        vm.setInterceptor(resourcePermission);

        /*
         * Step 6
         * Adding routing privileges to users
         */

        vm.extendRoutes(routePermission);

        /*
         * Step 7
         * Implementing $_has function, support for the directive "has" (in /main.js)
         * Input: Array, like this: ['get,/some-uri']
         * Output: Boolean
         */

        Vue.prototype.$_has = function(rArray) {
          let RequiredPermissions = [];
          let permission = true;

          if (Array.isArray(rArray)) {
            rArray.forEach(e => {
              if (e && e.p) {
                RequiredPermissions = RequiredPermissions.concat(e.p);
              }
            });
          } else {
            if (rArray && rArray.p) {
              RequiredPermissions = rArray.p;
            }
          }

          for (let i = 0; i < RequiredPermissions.length; i++) {
            let p = RequiredPermissions[i];
            if (!resourcePermission[p]) {
              permission = false;
              break;
            }
          }

          return permission;
        };

        // callback 函数执行的是router.replace 跳转，争对如下情况
        // 用户访问路由1，被强制跳转到登录，登录成功又跳转回路由1，而不是主页。
        typeof callback === "function" && callback();
      });
    },
    loginDirect: function(newPath) {
      /*
       * Monitor login events
       * Will trigger the events in views/login.vue
       */

      this.signin(() => {
        this.$router.replace({ path: newPath || "/" });
      });
    },
    logoutDirect: function() {
      /*
       * Monitor logout events
       * Will trigger the events in views/index.vue
       */
      //Clear local user information
      util.session("user", "");
      //Clear request permission
      axios.interceptors.request.eject(myInterceptor);
      //Clear Authorization
      axios.defaults.headers.common["Authorization"] = "";
      
      // 清空两个数据
      //this.$root.menuData = [];
      //this.$root.userData = [];
      //Back to login page
      this.$router.replace({ path: "/login" });
    }
  },
  created: function() {
    /*
     * Start from here!
     */

    this.signin();
  }
};
</script>

<style type="text/scss" lang="scss">
@import "~scss_vars";

body {
  margin: 0px;
  padding: 0px;
  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  //border:1px solid #dfe6ec;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>