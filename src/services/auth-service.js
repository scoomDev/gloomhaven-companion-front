import Axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api'

// class AuthService {
//     login({commit}, user) {
//         return Axios
//             .post(API_URL + '/login_check', user)
//             .then(response => {
//                 const token = response.data.token
//                 localStorage.setItem('token', token)
//                 Axios.defaults.headers.common['Authorization'] = token
//                 console.log(response.data)
//                 commit('auth_success', token, user)
//             }).catch(error => {
//                 commit('auth_error')
//                 localStorage.removeItem('token')
//                 console.log(error.response.data)
//             }).finally(() => {
//                 console.log('end of loading')
//             })
//     }
// }

export default new AuthService();