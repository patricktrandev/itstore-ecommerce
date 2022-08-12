import axios from 'axios';

import { add_to_cart, remove_cart_item, save_shipping_info } from '../constants/cartConstant'

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
        type: add_to_cart,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    //save localstorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))


}

export const removeCartItemAction = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
        type: remove_cart_item,
        payload: id
    })

    //save localstorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))


}


export const saveShippingInfoAction = (data) => async (dispatch) => {


    dispatch({
        type: save_shipping_info,
        payload: data
    })

    //save localstorage
    localStorage.setItem('shippingInfo', JSON.stringify(data))


}