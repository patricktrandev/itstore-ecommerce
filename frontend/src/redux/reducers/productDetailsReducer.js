import { product_details_success, product_details_request, product_details_fail, clear_errors } from '../constants/productConstants'
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