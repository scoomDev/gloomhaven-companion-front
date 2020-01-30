import Axios from "axios"

const API_URL = process.env.NODE_ENV === "production" ? 'https://gloomapi.ci-com.fr/api' : 'http://localhost:8000/api'

export default {

    login({commit}, user) {
        return new Promise((resolve, reject) => {
            Axios.post(API_URL + '/login_check', user, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    const token = response.data.token
                    sessionStorage.setItem('token', token)
                    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    commit('auth_success', {token: token, user: user})
                    commit('add_message', {state: 'success', content: `Bon retour parmi nous ${user.username}`})
                    resolve(response)
                })
                .catch(error => {
                    commit('add_message', {state: 'error', content: error.response.data})
                    sessionStorage.removeItem('token')
                    reject(error.response.data)
                })
        })
    },

    register({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            Axios.post(API_URL + '/register', user, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    if (response.data.error) {
                        commit('add_message', {
                            state: "error",
                            content: response.data.error
                        })
                        reject(response)
                    } else {
                        const token = response.data.token
                        sessionStorage.setItem('token', token)
                        Axios.defaults.headers.common['Authorization'] = 'Bearer' + token
                        commit('auth_success', {token: token, user: user})
                        commit('add_message', {state: 'success', content: 'Bah enfin !!!'})
                        resolve(response)
                    }
                })
                .catch(error => {
                    commit('add_message', {
                        state: "error",
                        content: error
                    })
                    sessionStorage.removeItem('token')
                    reject(error)
                })
        })
    },

    logout({commit}) {
        return new Promise((resolve) => {
            commit('logout')
            commit('add_message', {state: 'warning', content: 'C\'est ça... Casse toi !'})
            sessionStorage.removeItem('token')
            delete Axios.defaults.headers.common['Authorization']
            resolve()
        })
    },

    getCharacter({ commit }) {
        return new Promise((resolve, reject) => {
            Axios.get(API_URL + '/game_characters', {headers: {Authorization: 'Bearer ' + this.state.token}})
                .then(response => {
                    const characters = response.data['hydra:member']
                    commit('store_characters', characters)
                    resolve(characters)
                })
                .catch(error => {
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
                    reject(error)
                })
        })
    },

    getTeamById({commit}, teamId) {
        return new Promise(() => {
            Axios.get(API_URL + `/teams/${teamId}`)
                .then(response => {
                    commit('store_current_team', response.data)
                })
        })
    },

    getHeroes({commit}, teamId) {
        return new Promise((resolve, reject) => {
            Axios.get(API_URL + `/teams/${teamId}/heroes`, {headers: {Authorization: 'Bearer ' + this.state.token}})
                .then(response => {
                    const heroes = response.data['hydra:member']
                    commit('store_heroes', heroes)
                    resolve(heroes)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    getHeroById({commit}, heroId) {
        return new Promise((resolve, reject) => {
            Axios.get(API_URL + `/heroes/${heroId}`)
                .then(response => {
                    commit('store_current_hero', response.data)
                    resolve(response)
                })
                .catch(error => reject(error))
        })
    },

    updateHero({commit}, {heroId, data}) {
        console.log(data)
        return new Promise((resolve, reject) => {
            Axios.put(
                API_URL + `/heroes/${heroId}`,
                data,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then(response => {
                    commit('store_current_hero', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    addNewHero( { commit }, data) {
        return new Promise( ((resolve, reject) => {
            Axios.post(
                API_URL + `/heroes`,
                data,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then(response => {
                    commit('add_message', {
                        state: "success",
                        content: "Good job !"
                    })
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        }))
    }
}