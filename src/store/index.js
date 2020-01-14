import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: {},
        token: localStorage.getItem('token') || '',
        currentUser: {},
        currentTeam: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        currentUser: state => state.currentUser,
        currentTeam: state => state.currentTeam
    },
    mutations,
    actions
})
