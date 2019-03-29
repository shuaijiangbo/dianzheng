import { AccountLogin } from '@/api/login'
export default {
  namespaced: true,
  actions: {
    login({ dispatch }, { vm, account, password, type, tel }) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin({ account, password })
          .then(async res => {
            // 保存用户信息
            // util.cookies.set('token', res.data.account)
            sessionStorage.setItem('info', JSON.stringify(res.data))
            sessionStorage.setItem('org', JSON.stringify(res.org))
            await dispatch('match/user/set', { info: res.data, org: res.org}, { root: true })
            resolve()
          })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    
    logout({ commit, dispatch }, { vm, confirm = false }) {
      async function logout() {
        // 一些清空操作
        sessionStorage.clear()
        // 清空 vuex 用户消息
        await dispatch('match/user/set', {}, { root: true })
        // 跳转路由 
        vm.$router.replace({ name: 'login' })
        location.reload();
      }
      // 判断是否需要确认
      if (confirm) {
        // commit('d2admin/gray/set', true, { root: true })
        vm.$confirm('注销当前账户吗?', '确认操作', {
            confirmButtonText: '确定注销',
            cancelButtonText: '放弃',
            type: 'warning'
          })
          .then(() => {
            // commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            // commit('d2admin/gray/set', false, { root: true })
            vm.$message('放弃注销用户')
          })
      } else {
        logout()
      }
    }
  }
}