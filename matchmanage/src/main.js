import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
/*import '../theme/index.css'*/
//import './assets/theme/theme-green/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 简单配置
import router from './router'
/*import Mock from './mock'*/
/*Mock.bootstrap();*/
import 'font-awesome/css/font-awesome.min.css'

import promise from 'es6-promise'
promise.polyfill();

import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './styles/patch.css'
Vue.use(vueQuillEditor)
Vue.use(ElementUI)
Vue.use(Vuex)

/*
百度富文本编辑器*/
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

/*
* v-has
*/
Vue.directive('has', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

