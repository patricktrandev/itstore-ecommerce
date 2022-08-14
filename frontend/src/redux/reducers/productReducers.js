import {
    all_products_request,
    all_products_success,
    all_products_fail,
    admin_products_request,
    admin_products_success,
    admin_products_fail,
    clear_errors,

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

