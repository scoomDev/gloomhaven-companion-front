/*eslint-disable */
function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + (Math.random() * 16)) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export default {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, payload) {
        state.token = payload.token
        state.currentUser.username = payload.user.username
    },
    success(state) {
        state.status = 'success'
    },
    logout(state) {
        state.status = ''
        state.token = ''
    },
    store_heroes(state, payload) {
        state.heroes = payload
    },
    store_current_team(state, team) {
        state.currentTeam = team
        sessionStorage.setItem('current_team_id', state.currentTeam.id)
    },
    store_current_hero(state, hero) {
        state.currentHero = hero
        sessionStorage.setItem('current_hero_id', state.currentHero.id)
    },
    clear_current_hero(state) {
        state.currentHero = {}
    },
    add_message(state, payload) {
        state.messages.push({
            uuid: generateUUID(),
            state: payload.state,
            content: payload.content
        })
    },
    remove_message(state, payload) {
        state.messages = state.messages.filter(message => message.uuid !== payload)
    }
}