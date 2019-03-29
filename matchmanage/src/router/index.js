import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let baseRoute = [{
  path: '/login',
  name: '登录',
  component: (resolve) => require(['../views/Login.vue'], resolve)
}, {
  path: '/401',
  name: '无权访问',
  component: (resolve) => require(['../views/401.vue'], resolve)
}, {
  path: '/404',
  name: '找不到页面',
  component: (resolve) => require(['../views/404.vue'], resolve)
}];

let router = new Router({
  routes: baseRoute
});

router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + '赛事综合管理平台';
  next();
});

export default router;