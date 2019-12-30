import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || '',
    currentUser: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
