import {
    create_order_request,
    create_order_success,
    create_order_fail,
    clear_errors,
    my_orders_request,
    my_orders_success,
    my_orders_fail,

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

export const myOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case my_orders_request: {
            return {
                ...state,
                loading: true,

            }
        }
        case my_orders_success: {
            return {
                loading: false,
                orders: action.payload
            }
        }
        case my_orders_fail: {
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
