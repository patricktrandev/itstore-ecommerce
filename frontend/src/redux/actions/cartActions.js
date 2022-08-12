import axios from 'axios';

import { add_to_cart } from '../constants/cartConstant'

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