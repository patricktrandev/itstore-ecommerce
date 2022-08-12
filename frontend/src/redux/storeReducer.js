import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './reducers/productReducers'
import { productDetailsReducer } from './reducers/productDetailsReducer'
import { userReducer, userManagementReducer, forgotPasswordReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'
let initialState = {
    cartReducer: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}


const reducer = combineReducers({
    productReducer: productReducer,
    productDetailsReducer: productDetailsReducer,
    userReducer: userReducer,
    userManagementReducer: userManagementReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    cartReducer: cartReducer,

})

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))