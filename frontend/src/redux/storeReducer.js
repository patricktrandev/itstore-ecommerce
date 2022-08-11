import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './reducers/productReducers'
import { productDetailsReducer } from './reducers/productDetailsReducer'
import { userReducer } from './reducers/userReducers'
let initialState = {

}


const reducer = combineReducers({
    productReducer: productReducer,
    productDetailsReducer: productDetailsReducer,
    userReducer: userReducer
})

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))