export default {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, payload) {
        state.status = {
            state: "success",
            message: 'Connection success'
        }
        state.token = payload.token
        state.currentUser.username = payload.user.username
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
    },
    current_team(state, team) {
        state.currentTeam = team
    }
}