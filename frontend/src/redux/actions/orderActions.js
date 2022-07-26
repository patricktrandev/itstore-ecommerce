import axios from 'axios';

import {
    create_order_request,
    create_order_success,
    create_order_fail,
    clear_errors,
    my_orders_request,
    my_orders_success,
    my_orders_fail,
    order_details_request,
    order_details_success,
    order_details_fail,
    all_orders_request,
    all_orders_success,
    all_orders_fail,
    update_order_request,
    update_order_success,
    update_order_fail,
    delete_order_request,
    delete_order_success,
    delete_order_fail,
} from '../constants/orderConstant'

export const newOrderAction = (order) => async (dispatch) => {
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
//get currently loggen in user's order
export const myOrdersAction = (order) => async (dispatch) => {
    try {
        dispatch({
            type: my_orders_request
        })


        const { data } = await axios.get('/api/v1/orders/me')
        dispatch({
            type: my_orders_success,
            payload: data.orders
        })

    } catch (err) {
        dispatch({
            type: my_orders_fail,
            error: err.response.data.message
        })
    }
}

export const getAllOrdersAdminAction = () => async (dispatch) => {
    try {
        dispatch({
            type: all_orders_request
        })


        const { data } = await axios.get('/api/v1/admin/orders')
        dispatch({
            type: all_orders_success,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: all_orders_fail,
            error: err.response.data.message
        })
    }
}

export const getOrderDetailsAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: order_details_request
        })


        const { data } = await axios.get(`/api/v1/order/${id}`)
        // console.log("data....", data.order)
        dispatch({
            type: order_details_success,
            getOrder: data.order
        })

    } catch (err) {
        dispatch({
            type: order_details_fail,
            error: err.response.data.message
        })
    }
}

export const updateOrderAdminAction = (orderData, id) => async (dispatch) => {
    try {
        dispatch({
            type: update_order_request
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/orders/${id}`, orderData, config)
        dispatch({
            type: update_order_success,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: update_order_fail,
            error: err.response.data.message
        })
    }
}


export const deleteOrderAction = (id) => async (dispatch) => {


    try {
        dispatch({
            type: delete_order_request,
        })

        const { data } = await axios.delete(`/api/v1/admin/orders/${id}`)
        dispatch({
            type: delete_order_success,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: delete_order_fail,
            payload: err.response.data.message
        })
    }
}


//clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: clear_errors
    })
}