
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
    logout_fail,
    update_password_request,
    update_password_success,
    update_password_reset,
    update_password_fail,
    update_profile_request,
    update_profile_success,
    update_profile_fail,
    update_profile_reset,
    forgot_password_request,
    forgot_password_success,
    forgot_password_fail,
    reset_password_request,
    reset_password_success,
    reset_password_fail
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

export const userManagementReducer = (state = {}, action) => {
    switch (action.type) {
        case update_profile_request:
        case update_password_request: {
            return {
                ...state,
                loading: true,
            }

        }

        case update_profile_success:
        case update_password_success: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        }
        case update_profile_reset:
        case update_password_reset: {
            return {
                ...state,
                isUpdated: false
            }

        }

        case update_profile_fail:
        case update_password_fail: {
            return {
                ...state,
                loading: false,
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

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case forgot_password_request:
        case reset_password_request: {
            return {
                ...state,
                loading: true,
                error: null
            }

        }

        case forgot_password_success: {
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        }
        case reset_password_success: {
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        }

        case forgot_password_fail:
        case reset_password_fail: {
            return {
                ...state,
                loading: false,
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