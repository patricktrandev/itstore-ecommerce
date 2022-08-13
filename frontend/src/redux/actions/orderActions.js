import axios from 'axios';

import {
    create_order_request,
    create_order_success,
    create_order_fail,
    clear_errors
} from '../constants/orderConstant'

export const newOrderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: create_order_request
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/orders/new', order, config)
        dispatch({
            type: create_order_success,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: create_order_fail,
            error: err.response.data.message
        })
    }
}

//clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: clear_errors
    })
}