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
    update_product_success,
    update_product_fail,
    update_product_reset,
    update_product_request,
    new_product_success,
    new_product_fail,
    admin_products_request,
    admin_products_success,
    admin_products_fail,
    clear_errors,
    new_product_reset,

    get_reviews_request,
    get_reviews_success,
    get_reviews_fail,
    delete_review_request,
    delete_review_success,
    delete_review_fail,
    delete_review_reset,

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


export const newReviewAdminReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case get_reviews_request: {
            return {
                ...state,
                loading: true
            }
        }
        case get_reviews_success: {
            return {
                loading: false,
                reviews: action.payload

            }
        }
        case get_reviews_fail: {
            return {
                loading: false,
                error: action.payload
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

export const deleteReviewAdminReducer = (state = {}, action) => {
    switch (action.type) {

        case delete_review_request:
            return {
                ...state,
                loading: true
            }

        case delete_review_success:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case delete_review_fail:
            return {
                ...state,
                error: action.payload
            }

        case delete_review_reset:
            return {
                ...state,
                isDeleted: false
            }

        case clearErrors:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const HandleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case update_product_request:
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
        case update_product_success: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        }
        case update_product_fail:
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
        case update_product_reset: {
            return {
                ...state,
                isUpdated: false
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

