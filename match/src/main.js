import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import store from './store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 简单配置
import router from './router'
// 核心插件
import match from '@/plugin/match'

import 'font-awesome/css/font-awesome.min.css'
import './styles/iconfont.css'

import promise from 'es6-promise'
promise.polyfill();

import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
import { Quill } from 'vue-quill-editor'
// import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './styles/patch.css'
Vue.use(vueQuillEditor)
Vue.use(Vuex)
Vue.use(match)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

