import axios from 'axios'
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

export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: login_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config)
        dispatch({
            type: login_success,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: login_fail,
            payload: err.response.data.message
        })

    }
}
export const registerAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: register_request,
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/register', userData, config)
        dispatch({
            type: register_success,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: register_fail,
            payload: err.response.data.message
        })
        //console.log(err.response.data)

    }
}
export const loadUserAction = () => async (dispatch) => {
    try {
        dispatch({
            type: load_user_request,
        })

        const { data } = await axios.get('/api/v1/me')
        dispatch({
            type: load_user_success,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: load_user_fail,
            payload: err.response.data.message
        })

    }
}
export const logoutUserAction = () => async (dispatch) => {
    try {


        await axios.get('/api/v1/logout')
        dispatch({
            type: logout_success,

        })
    } catch (err) {
        dispatch({
            type: logout_fail,
            payload: err.response.data.message
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: clear_errors
    })
}