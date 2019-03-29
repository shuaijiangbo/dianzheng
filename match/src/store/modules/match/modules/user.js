import { resolve } from "url";

export default {
  namespaced: true,
  state: {
    info: JSON.parse(sessionStorage.getItem('info')) || {},
    org: JSON.parse(sessionStorage.getItem('org')) || {}
  },
  actions: {
    set ({ state, dispatch }, user, org) {
      return new Promise(async resolve => {
        state.info = user.info
        state.org = user.org
        resolve()
      })
    }
  }
}