import { clearErrors } from '../actions/orderActions';
import {
    all_products_request,
    all_products_success,
    all_products_fail,
    new_product_request,
    delete_product_success,
    delete_product_fail,
    delete_product_reset,
    delete_product_request,
    new_product_success,
    new_product_fail,
    admin_products_request,
    admin_products_success,
    admin_products_fail,
    clear_errors,
    new_product_reset,

} from '../constants/productConstants'
let stateDefault = {
    products: [],
    perPage: 0,
    productCount: 0,
    loading: true,
    error: null,

}


export const productReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case all_products_request:
        case admin_products_request: {

            state.products = []
            state.loading = true;
            return { ...state }
        }
        case all_products_success: {
            state.products = action.payload.products
            state.productCount = action.payload.productCount
            state.perPage = action.payload.perPage
            state.loading = false
            return { ...state }
        }
        case admin_products_success: {
            state.loading = false
            state.products = action.payload
            return { ...state }
        }
        case all_products_fail:
        case admin_products_fail: {
            state.loading = false
            state.error = action.payload
            return { ...state }
        }
        case clear_errors: {
            return { ...state }
        }

        default:
            return { ...state }
    }
}


export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case new_product_request: {
            return {
                ...state,
                loading: true
            }
        }
        case new_product_success: {
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        }
        case new_product_fail: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case new_product_reset: {
            return {
                ...state,
                success: false
            }
        }
        case clearErrors: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state
    }
}


export const HandleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case delete_product_request: {
            return {
                ...state,
                loading: true
            }
        }
        case delete_product_success: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        }
        case delete_product_fail: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case delete_product_reset: {
            return {
                ...state,
                isDeleted: false
            }
        }
        case clearErrors: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state
    }
}

