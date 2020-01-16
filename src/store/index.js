import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: {},
        token: sessionStorage.getItem('token') || '',
        currentUser: {},
        currentHero: {},
        currentTeam: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        currentUser: state => state.currentUser,
        currentHero: state => state.currentHero,
        currentTeam: state => state.currentTeam,
        objects: state => state.currentHero.objects,
        gold: state => state.currentHero.gold,
        xp: state => state.currentHero.experience,
        note: state => state.currentHero.note,
        life: state => {
            const life = JSON.parse(state.currentHero["GameCharacter"].life)
            return life[state.currentHero.level]
        }
    },
    mutations,
    actions
})
