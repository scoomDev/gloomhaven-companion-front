import Axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api'

class AuthService {
    login(user) {
        return Axios
            .post(API_URL + '/users/login')
    }
}