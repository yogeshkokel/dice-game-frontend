import { LOGIN_SUCCESS, LOGIN_ERROR, ADD_SCORE_SUCCESS, ADD_SCORE_ERROR, FETCH_USERS_LIST_ERROR, FETCH_USERS_LIST_LOADING, FETCH_USERS_LIST_SUCCESS } from './userTypes';

//initial state of user
const initialState = {
    user_data: null,
    error: null,
    score_message: null,
    score_error: null,
    loading: false,
    users_list: [],
    users_list_error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user_data: action.payload,
                error: null
            }
        //error case
        case LOGIN_ERROR:
            return {
                user_data: null,
                error: action.payload
            }
        case ADD_SCORE_SUCCESS:
            return {
                score_error: null,
                score_message: action.payload
            }
        case ADD_SCORE_ERROR:
            return {
                score_message: null,
                score_error: action.payload
            }
        case FETCH_USERS_LIST_LOADING:
            return {
                loading: true,
                users_list: [],
                users_list_error: null
            }
        case FETCH_USERS_LIST_SUCCESS:
            return {
                loading: false,
                users_list: action.payload,
                users_list_error: null
            }
        case FETCH_USERS_LIST_ERROR:
            return {
                loading: false,
                users_list: [],
                users_list_error: action.payload
            }
        default: return state
    }
}

export default userReducer