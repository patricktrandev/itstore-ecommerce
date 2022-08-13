import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './reducers/productReducers'
import { productDetailsReducer } from './reducers/productDetailsReducer'
import { userReducer, userManagementReducer, forgotPasswordReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'
import { newOrderReducer } from './reducers/orderReducer'
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


})

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))