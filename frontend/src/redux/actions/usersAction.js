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
    logout_fail,
    update_profile_request,
    update_profile_success,
    update_profile_fail,
    update_password_request,
    update_password_success,
    update_password_fail,
    forgot_password_request,
    forgot_password_success,
    forgot_password_fail,
    reset_password_request,
    reset_password_success,
    reset_password_fail,
    all_users_request,
    all_users_success,
    all_users_fail,
    user_details_request,
    user_details_success,
    user_details_fail,
    update_user_request,
    update_user_success,
    update_user_fail,
    delete_user_request,
    delete_user_success,
    delete_user_fail,
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
export const updateUserProfileAction = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: update_profile_request,
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put('/api/v1/user/me/update', userData, config)
        dispatch({
            type: update_profile_success,
            payload: data.success
        })
    } catch (err) {
        dispatch({
            type: update_profile_fail,
            payload: err.response.data.message
        })
        //console.log(err.response.data)

    }
}
export const updatePasswordAction = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: update_password_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/user/me/password/update', passwords, config)
        dispatch({
            type: update_password_success,
            payload: data.success
        })
    } catch (err) {
        dispatch({
            type: update_password_fail,
            payload: err.response.data.message
        })
        //console.log(err.response.data)

    }
}
export const forgotPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch({
            type: forgot_password_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/password/forgot', email, config)
        dispatch({
            type: forgot_password_success,
            payload: data.message
        })
    } catch (err) {
        dispatch({
            type: forgot_password_fail,
            payload: err.response.data.message
        })

    }
}
export const resetPasswordAction = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: reset_password_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)
        console.log(">>>data", data)
        dispatch({
            type: reset_password_success,
            payload: data.success
        })
    } catch (err) {
        dispatch({
            type: reset_password_fail,
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

//-----------------------

// Get all users
export const getAllUsersAdminAction = () => async (dispatch) => {
    try {

        dispatch({ type: all_users_request })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: all_users_success,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: all_users_fail,
            payload: error.response.data.message
        })
    }
}

export const updateUserAdminAction = (userData, id) => async (dispatch) => {
    try {
        dispatch({
            type: update_user_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/users/${id}`, userData, config)
        dispatch({
            type: update_user_success,
            payload: data.success

        })
    } catch (err) {
        dispatch({
            type: update_user_fail,
            payload: err.response.data.message
        })


    }
}
export const getUserDetailsAdminAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: user_details_request,
        })

        const { data } = await axios.get(`/api/v1/admin/users/${id}`);
        dispatch({
            type: user_details_success,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: user_details_fail,
            payload: err.response.data.message
        })

    }
}


export const deleteUserAdminAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: delete_user_request,
        })
        const { data } = await axios.delete(`/api/v1/admin/users/${id}`)
        dispatch({
            type: delete_user_success,
            payload: data.success

        })
    } catch (err) {
        dispatch({
            type: delete_user_fail,
            payload: err.response.data.message
        })


    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: clear_errors
    })
}