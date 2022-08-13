import {
    create_order_request,
    create_order_success,
    create_order_fail,
    clear_errors
} from '../constants/orderConstant'

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case create_order_request: {
            return {
                ...state,
                loading: true
            }
        }
        case create_order_success: {
            return {
                loading: false,
                order: action.payload
            }
        }
        case create_order_fail: {
            return {
                loading: false,
                error: action.payload
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