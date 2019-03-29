// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import 'url-search-params-polyfill'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import '../src/assets/scss/common.scss'
import store from '../src/vuex/store'

import vueQuillEditor from 'vue-quill-editor'  //富文本编辑器
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI)
Vue.use(vueQuillEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
