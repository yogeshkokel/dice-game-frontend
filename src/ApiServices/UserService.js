import Api from './Api';

export default {
    Login(payload) {
        return Api().post(`api/users/login`, payload)
    },
    AddScore(payload) {
        return Api().post(`api/users/add-score`, payload)
    },
    AdminLogin(payload) {
        return Api().post(`api/users/admin-login`, payload)
    },
    GetAllUsers() {
        return Api().get(`api/users/users-list`)
    },
}