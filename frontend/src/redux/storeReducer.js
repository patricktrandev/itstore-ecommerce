import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, newProductReducer, HandleProductReducer } from './reducers/productReducers'
import { productDetailsReducer, newReviewReducer } from './reducers/productDetailsReducer'
import { userReducer, userManagementReducer, forgotPasswordReducer, allUsersAdminReducer, userDetailsAdminReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'
import { newOrderReducer, myOrderReducer, allOrderReducer, orderAdminReducer } from './reducers/orderReducer'
import { orderDetailsReducer } from './reducers/OrderDetailsReducer'
let initialState = {
    cartReducer: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    }
}


const reducer = combineReducers({
    productReducer: productReducer,
    productDetailsReducer: productDetailsReducer,
    userReducer: userReducer,
    userManagementReducer: userManagementReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    cartReducer: cartReducer,
    newOrderReducer: newOrderReducer,
    myOrderReducer: myOrderReducer,
    orderDetailsReducer: orderDetailsReducer,
    newReviewReducer: newReviewReducer,
    newProductReducer: newProductReducer,
    HandleProductReducer: HandleProductReducer,
    allOrderReducer: allOrderReducer,
    orderAdminReducer: orderAdminReducer,
    allUsersAdminReducer: allUsersAdminReducer,
    userDetailsAdminReducer: userDetailsAdminReducer,
})

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))