import Axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api'

export default {

    login({commit}, user) {
        return new Promise((resolve, reject) => {
            Axios.post(API_URL + '/login_check', user, { headers: {'Content-Type': 'application/json' }})
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    commit('auth_success', {token: token, user: user})
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
        const bodyFormData = new FormData();
        bodyFormData.set('username', user.username)
        bodyFormData.set('password', user.password)
        return new Promise((resolve, reject) => {
            commit('auth_request')
            Axios.post(API_URL + '/register', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' }})
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
                    const team = response.data['hydra:member']
                    resolve(team)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },

    getTeamById({ commit }, id) {
        return new Promise(() => {
            Axios.get(API_URL + `/teams/${id}`, {headers: {Authorization: 'Bearer ' + this.state.token}})
                .then(response => {
                    commit('current_team', response.data)
                })
        })
    },

    getHeroes({ commit }, id) {
        return new Promise( (resolve, reject) => {
            Axios.get(API_URL + `/teams/${id}/heroes`, {headers: {Authorization: 'Bearer ' + this.state.token}})
                .then(response => {
                    const heroes = response.data['hydra:member']
                    console.log('axios response : ' + response)
                    commit('success')
                    resolve(heroes)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}