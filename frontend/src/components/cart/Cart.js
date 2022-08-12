import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'

import { addToCartAction, removeCartItemAction } from '../../redux/actions/cartActions'
export const Cart = () => {

    const [diableBtn, setDisableBtn] = useState(false)
    const alert = useAlert();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer)
    const handlerStockIncrease = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) {
            alert.error('You reach the maximum number')
            return;
        }

        dispatch(addToCartAction(id, newQty))


    }
    const handlerStockDecrease = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) {
            alert.error('Minimum quanity is 1')
            return;
        }

        dispatch(addToCartAction(id, newQty))


    }
    const handlerRemoveCartItem = (id) => {
        dispatch(removeCartItemAction(id));
        alert.success('Remove item successfully')
    }
    const renderCartItems = () => {
        return cartItems.map((item, index) => {
            return <div key={item.product}>
                <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.product} height={90} width={115} />
                        </div>
                        <div className="col-5 col-lg-3">
                            <Link to={`/products/${item.product}`} style={{ textDecoration: 'none', color: 'black', fontSize: '0.9em' }}>{item.name}</Link><br />
                            {item.stock < 10 && <small className='text-danger font-italic'>Hurry.. only {item.stock} item(s) left</small>}
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price" style={{ fontSize: '1.1em' }}>$ {item.price}</p>
                        </div>
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger rounded-circle minus p-1"><i className="fa fa-minus p-1" onClick={() => { handlerStockDecrease(item.product, item.quantity) }} /></span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                <span className="btn btn-primary plus rounded-circle p-1" onClick={() => { handlerStockIncrease(item.product, item.quantity, item.stock) }} ><i className="fa fa-plus p-1" /></span>
                            </div>
                        </div>
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => handlerRemoveCartItem(item.product)} />
                        </div>
                    </div>
                </div>
                <hr />
            </div>

        })
    }
    const handleSubTotalSummary = () => {
        return cartItems.reduce((val, item) => {
            return val += Number(item.quantity)
        }, 0)
    }
    const handleTotalSummary = () => {
        return cartItems.reduce((val, item) => {
            return val += Number(item.quantity * item.price)
        }, 0).toFixed(2)
    }

    return (
        <Fragment>
            <MetaData title={'Your Cart | ShopIT'} />
            <h3 className='my-4'>Getting your order</h3>
            <hr />
            {cartItems.length === 0 ?
                <div className='text-center'>
                    <h5 className='m-3'>Your Cart is empty</h5>
                    <img style={{ minWidth: '300px' }} src='https://res.cloudinary.com/dctb1eocj/image/upload/v1660334758/shopit-common/no-items_cijtkg.png' alt='no-item' />
                    <br />
                    <Link to='/' style={{ textDecoration: 'none' }}><button className='btn btn-shopping text-white px-4'>Go Shopping</button></Link>


                </div>
                : (
                    <Fragment>


                        <h5 className="mt-4">You have <b className='text-success'>{cartItems.length} item(s)</b> in your cart</h5>
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">

                                {renderCartItems()}


                            </div>
                            <div className="col-12 col-lg-4 my-4">
                                <div className id="order_summary">
                                    <h5 className='text-primary'>Order Summary</h5>
                                    <hr />
                                    <p>Subtotal: <span className="order-summary-values">{handleSubTotalSummary()} (Units)</span> </p>
                                    <p>Est. total: <span className="order-summary-values"> <small>$</small> {handleTotalSummary()}</span> </p>
                                    <hr />
                                    <p className='font-weight-bold'>TOTAL: <span className="order-summary-values"> <small>$</small> {handleTotalSummary()}</span> </p>
                                    <p >Saving: <span className="order-summary-values"> <small>$</small> 0</span> </p>
                                    <hr />
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="coupon_field" />
                                        <div className="input-group-append">
                                            <button className="input-group-text btn btn-success" id="coupon_field">APPLY</button>
                                        </div>
                                    </div>
                                    <button id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                                </div>
                            </div>
                        </div>


                    </Fragment>
                )}
        </Fragment>
    )
}
