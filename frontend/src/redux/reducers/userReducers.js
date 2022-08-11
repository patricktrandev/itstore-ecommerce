
import {
    login_request,
    login_success,
    login_fail,
    clear_errors,
    register_request,
    register_success,
    register_fail,
    load_user_request,
    load_user_success,
    load_user_fail,
    logout_success,
    logout_fail
} from '../constants/userConstant'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case login_request:
        case register_request:
        case load_user_request: {
            return {
                loading: true,
                isAuthenticated: false,

            }
        }
        case register_success:
        case login_success:
        case load_user_success: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload

            }
        }
        case logout_success: {
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        }
        case register_fail:
        case login_fail: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
            //console.log(state)
        }
        case load_user_fail: {
            return {

                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
            //c
        }
        case logout_fail: {
            return {
                ...state,
                error: action.payload
            }
        }

        case clear_errors: {
            return {
                ...state,
                error: null
            }
        }

        default:
            return state
    }
}

