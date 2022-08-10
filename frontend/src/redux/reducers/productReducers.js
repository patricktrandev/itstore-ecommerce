import { all_products_request, all_products_success, all_products_fail, clear_errors, product_details_success, product_details_request, product_details_fail } from '../constants/productConstants'
let stateDefault = {
    products: [],
    productCount: 0,
    loading: true,
    error: null,
    product: {},
    loadingProduct: true,
    errorProduct: null,
}


export const productReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case all_products_request: {

            state.products = []
            return { ...state }
        }
        case all_products_success: {
            state.products = action.payload.products
            state.productCount = action.payload.productCount
            state.loading = false
            return { ...state }
        }
        case all_products_fail: {
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

export const productDetailReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case product_details_request: {
            state.loading = true
            return { ...state }
        }
        case product_details_success: {
            state.loadingProduct = false
            state.product = action.payload
            return { ...state }
        }
        case product_details_fail: {
            state.errorProduct = action.payload
            return { ...state }
        }
        case clear_errors: {
            return { ...state }
        }

        default: return { ...state }
    }
}