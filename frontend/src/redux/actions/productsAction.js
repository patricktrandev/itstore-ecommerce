import axios from 'axios';

import { all_products_request, all_products_success, all_products_fail, clear_errors, product_details_success, product_details_request, product_details_fail } from '../constants/productConstants'

export const getProductsAction = () => async (dispatch) => {


    try {
        dispatch({
            type: all_products_request

        })
        const { data } = await axios.get('/api/v1/products')
        dispatch({
            type: all_products_success,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: all_products_fail,
            payload: err.response.data.message
        })
    }
}

export const getSingleProductsAction = (id) => async (dispatch) => {


    try {
        dispatch({
            type: product_details_request

        })
        const { data } = await axios.get(`/api/v1/products/${id}`)
        dispatch({
            type: product_details_success,
            payload: data.product
        })

    } catch (err) {
        dispatch({
            type: product_details_fail,
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