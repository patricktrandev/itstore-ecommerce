
import {
    login_request,
    login_success,
    login_fail,
    clear_errors,
    register_request,
    register_success,
    register_fail
} from '../constants/userConstant'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case login_request:
        case register_request: {
            return {
                loading: true,
                isAuthenticated: false,

            }
        }
        case register_success:
        case login_success: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload

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
            console.log(state)
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

