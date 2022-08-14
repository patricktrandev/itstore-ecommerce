
import {
    new_review_request,
    new_review_success,
    new_review_fail,
    product_details_success,
    product_details_request,
    product_details_fail,
    new_review_reset,
    clear_errors
} from '../constants/productConstants'
let stateDefault = {
    product: {},
    loading: true,
    error: null,
}

export const productDetailsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case product_details_request: {
            state.loading = true
            state.product = {}
            return { ...state }
        }
        case product_details_success: {
            state.loading = false
            state.product = action.payload
            return { ...state }
        }
        case product_details_fail: {
            state.error = action.payload
            return { ...state }
        }
        case clear_errors: {
            return { ...state }
        }

        default: return { ...state }
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case new_review_request: {

            return {
                loading: true,
                ...state
            }
        }
        case new_review_success: {
            return {
                loading: false,
                success: action.payload
            }
        }
        case new_review_fail: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case new_review_reset: {
            return {
                ...state,
                success: false
            }
        }
        case clear_errors: {
            return {
                ...state,
                error: null
            }
        }

        default: return state
    }
}

