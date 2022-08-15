import {
    create_order_request,
    create_order_success,
    create_order_fail,
    clear_errors,
    my_orders_request,
    my_orders_success,
    my_orders_fail,
    all_orders_request,
    all_orders_success,
    all_orders_fail,
    update_order_request,
    update_order_success,
    update_order_fail,
    update_order_reset

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


export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case all_orders_request: {
            return {
                ...state,
                loading: true,

            }
        }
        case all_orders_success: {
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        }
        case all_orders_fail: {
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


export const orderAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case update_order_request: {
            return {
                ...state,
                loading: true
            }
        }
        case update_order_success: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        }
        case update_order_fail: {
            return {
                ...state,
                error: action.payload
            }
        }
        case update_order_reset: {
            return {
                ...state,
                isUpdated: false
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
