import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        currentUser: {}
    },
    getters: {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                Axios.post(API_URL + '/login_check', user)
                    .then(response => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        Axios.defaults.headers.common['Authorization'] = token
                        console.log(response.data)
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error', error)
                        localStorage.removeItem('token')
                        console.log(error.response.data)
                        reject(error)
                    })
                    .finally(() => {
                        console.log('end of loading')
                    })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios.post(API_URL + '/register', user)
                    .then(response => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        Axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error', error)
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete Axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    modules: {}
})
