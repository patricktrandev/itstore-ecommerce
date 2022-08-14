import axios from 'axios';
import { bindActionCreators } from 'redux';

import {
    all_products_request,
    all_products_success,
    all_products_fail,
    admin_products_request,
    admin_products_success,
    admin_products_fail,
    clear_errors,
    product_details_success,
    product_details_request,
    product_details_fail,
    new_review_request,
    new_review_success,
    new_review_fail,
    new_review_reset,
    new_product_request,
    new_product_success,
    new_product_fail,
    delete_product_success,
    delete_product_fail,
    delete_product_reset,
    delete_product_request,
} from '../constants/productConstants'

export const getProductsAction = (keyword = '', currentPage = 1, price, category, rating) => async (dispatch) => {


    try {
        dispatch({
            type: all_products_request

        })
        let urlGetProducts = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[lte]=${rating}`
        if (category) {
            urlGetProducts = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[lte]=${rating}`
        }
        console.log("link", urlGetProducts)
        const { data } = await axios.get(urlGetProducts)
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

export const getAdminProductsAction = () => async (dispatch) => {


    try {
        dispatch({
            type: admin_products_request
        })

        const { data } = await axios.get('/api/v1/admin/products')
        dispatch({
            type: admin_products_success,
            payload: data.products
        })

    } catch (err) {
        dispatch({
            type: admin_products_fail,
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


export const newReviewAction = (reviewData) => async (dispatch) => {


    try {
        dispatch({
            type: new_review_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/reviews', reviewData, config)
        dispatch({
            type: new_review_success,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: new_review_fail,
            payload: err.response.data.message
        })
    }
}
export const newProductAdminAction = (productData) => async (dispatch) => {


    try {
        dispatch({
            type: new_product_request,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/admin/products/new', productData, config)
        dispatch({
            type: new_product_success,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: new_product_fail,
            payload: err.response.data.message
        })
    }
}


export const deleteProductAction = (id) => async (dispatch) => {


    try {
        dispatch({
            type: delete_product_request,
        })

        const { data } = await axios.delete(`/api/v1/admin/products/${id}`)
        dispatch({
            type: delete_product_success,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: delete_product_fail,
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