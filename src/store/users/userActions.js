import { LOGIN_SUCCESS, LOGIN_ERROR, ADD_SCORE_SUCCESS, ADD_SCORE_ERROR, FETCH_USERS_LIST_ERROR, FETCH_USERS_LIST_LOADING, FETCH_USERS_LIST_SUCCESS } from './userTypes';
import UserService from '../../ApiServices/UserService';

const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    }
}

const loginError = (err) => {
    return {
        type: LOGIN_ERROR,
        payload: err
    }
}

const addScoreSuccess = (message) => {
    return {
        type: ADD_SCORE_SUCCESS,
        payload: message
    }
}

const addScoreError = (err) => {
    return {
        type: ADD_SCORE_ERROR,
        payload: err
    }
}

const loading = () => {
    return {
        type: FETCH_USERS_LIST_LOADING,
    }
}

const usersListSuccess = (data) => {
    return {
        type: FETCH_USERS_LIST_SUCCESS,
        payload: data
    }
}

const usersListError = (error) => {
    return {
        type: FETCH_USERS_LIST_ERROR,
        payload: error
    }
}

//async function to login
export const login = (payload) => {
    return function (dispatch) {
        UserService.Login(payload)
            .then((response) => {
                const { data } = response;
                if (data.status) {
                    dispatch(loginSuccess(data.token))
                } else {
                    dispatch(loginError(data.message))
                }
            }).catch((err) => {
                dispatch(loginError(err.message))
            });
    }
}

export const addTotalScore = (payload) => {
    return function (dispatch) {
        UserService.AddScore(payload)
            .then((response) => {
                const { data } = response;
                if (data.status) {
                    dispatch(addScoreSuccess(data.message))
                } else {
                    dispatch(addScoreError(data.message))
                }
            }).catch((err) => {
                dispatch(addScoreError(err.message))
            });
    }
}

export const adminLogin = (payload) => {
    return function (dispatch) {
        UserService.AdminLogin(payload)
            .then((response) => {
                const { data } = response;
                if (data.status) {
                    dispatch(loginSuccess(data.token))
                } else {
                    dispatch(loginError(data.message))
                }
            }).catch((err) => {
                dispatch(loginError(err.message))
            });
    }
}

export const fetchUsersList = () => {
    return function (dispatch) {
        dispatch(loading());
        UserService.GetAllUsers()
            .then((response) => {
                const { data } = response;
                if (data.status) {
                    dispatch(usersListSuccess(data.Records))
                } else {
                    dispatch(usersListError(data.message))
                }
            }).catch((err) => {
                dispatch(usersListError(err.message))
            });
    }
}