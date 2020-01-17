import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: {},
        messages: [],
        token: sessionStorage.getItem('token') || '',
        heroes: [],
        currentUser: {},
        maxCharacter: 17,
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
        getMessages: state => state.messages ? state.messages : [],
        hasMessages: state => state.messages.length > 0,
        teamLevel: state => {
            if (state.currentTeam.heroes) {
                const heroes = state.currentTeam.heroes
                console.log(heroes)
                let level = 0
                heroes.map(el => {
                    level += el.level
                })

                return Math.ceil((level / heroes.length) / 2)
            } else {
                return 0
            }
        },
        life: state => {
            if(state.currentHero['GameCharacter']) {
                const life = JSON.parse(state.currentHero["GameCharacter"].life)
                return life[state.currentHero.level]
            } else {
                return 0
            }
        }
    },
    mutations,
    actions
})
