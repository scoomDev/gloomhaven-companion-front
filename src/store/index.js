import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: {},
        token: localStorage.getItem('token') || '',
        currentUser: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        currentUser: state => state.currentUser
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = {
                state: "success",
                message: 'Connection success'
            }
            state.token = token
            state.user = user
        },
        auth_error(state, payload) {
            state.status = {
                state: "error",
                message: payload.message
            }
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                Axios.post(API_URL + '/login_check', user, { headers: {'Content-Type': 'application/json' }})
                    .then(response => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error', error.response.data)
                        localStorage.removeItem('token')
                        reject(error.response.data)
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
                        Axios.defaults.headers.common['Authorization'] = 'Bearer' + token
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
        },
        getCharacter() {
            return new Promise((resolve, reject) => {
                Axios.get(API_URL + '/game_characters', {headers: {Authorization: 'Bearer ' + this.state.token}})
                    .then(response => {
                        resolve(response.data['hydra:member'])
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        getTeam() {
            return new Promise((resolve, reject) => {
                Axios.get(API_URL + '/teams', {headers: {Authorization: 'Bearer ' + this.state.token}})
                    .then(response => {
                        resolve(response.data['hydra:member'])
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        }
    },
    modules: {}
})
