import {
    order_details_request,
    order_details_success,
    order_details_fail,
    clear_errors
} from '../constants/orderConstant'

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case order_details_request: {
            return {
                loading: true,

            }
        }
        case order_details_success: {
            // console.log("orde--", action.payload)
            return {
                loading: false,
                getDetails: action.getOrder
            }
        }
        case order_details_fail: {
            return {

                loading: false,
                error: action.getOrder
            }
        }

        case clear_errors: {
            return {
                ...state,
                error: null
            }
        }

        default:
            return state;
    }
}