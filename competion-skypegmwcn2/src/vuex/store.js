// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
/*import {get, post} from '@/api/fetch.js';
import url from '@/api/serviceAPI.config.js';*/

Vue.use(Vuex);
/*
const state={
  eventId:1,
  userMsg:''
}


// 定义所需的 mutations
const mutations = {
  INCREMENT(state,user) {
    state.userMsg==user.userMsg
  },
  DECREMENT(state,) {
    state.count--
  }
}
const getters = {
  count:function(state){
    return state.count +=100;
  }
}
const actions={
  getUserMsgs ({ commit }) {
    let user=JSON.parse(sessionStorage.getItem('user'));
    post(url.getUserInfo,{id:user.id}).then(res => {
      commit('INCREMENT', {userMsg: res.datas})
    });
  }
}*/
import {get, post} from '@/api/fetch.js';
import url from '@/api/serviceAPI.config.js';

  const state={
    eventId:'',
    eventName:''
  }
  const mutations={
    saveEventId(state,events){
      state.eventId=events.eventId;
      state.eventName=events.eventName;
    }
  }
  const getters = {
    count:function(state){
      return state.count +=100;
    }
  }
  const actions={

  }
export default new Vuex.Store({
  state,mutations,getters,actions
})
