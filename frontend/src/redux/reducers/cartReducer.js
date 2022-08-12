import { add_to_cart } from '../constants/cartConstant'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case add_to_cart: {
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.product === item.product)
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i, index) => {
                        if (i.product === item.product) {
                            return item;
                        } else {
                            return i;
                        }
                    })
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]

                }
            }

        }

        default:
            return state;
    }
}