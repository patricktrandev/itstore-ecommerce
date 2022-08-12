
import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { MetaData } from '../layout/MetaData'

import { addToCartAction, removeCartItemAction } from '../../redux/actions/cartActions'
import { CheckoutStep } from './CheckoutStep'
export const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cartReducer);
    const { user } = useSelector(state => state.userReducer)
    //const shippingInfo= LocalStorage.getItem('shippingInfo', JSON.parse())


    let itemsPrice = cartItems.reduce((val, item) => {
        return val += item.price * item.quantity
    }, 0)
    let shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number((0.05 * itemsPrice)).toFixed(2);
    let totalPrice = Number(itemsPrice + shippingPrice + Number(taxPrice)).toLocaleString();

    return (
        <Fragment>
            <MetaData title={'Confirm Order | ShopIT'} />
            <CheckoutStep shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h5 className="my-4">Your Cart Items:</h5>

                    {cartItems.map(item => (
                        <div key={item.product}>

                            <div className="cart-item my-1" >
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}

                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax <small>(5%)</small> :  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" >Proceed to Payment</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}
