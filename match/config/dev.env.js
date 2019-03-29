var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_API: '"http://192.168.3.132:8080"', //"http://192.168.3.132:8080"
  VUE_APP_TITLE: '"赛事管理平台"'
})
