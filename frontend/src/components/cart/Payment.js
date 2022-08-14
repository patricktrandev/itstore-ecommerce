import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { MetaData } from '../layout/MetaData'
import { CheckoutStep } from './CheckoutStep'
import axios from 'axios'

import { newOrderAction, clearErrors } from '../../redux/actions/orderActions'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const options = {
    style: {
        base: {
            fontSize: '14px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}


export const Payment = ({ history }) => {
    const alert = useAlert();
    const stripe = useStripe()
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userReducer);
    const { cartItems, shippingInfo } = useSelector(state => state.cartReducer)
    const { error } = useSelector(state => state.newOrderReducer)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    //console.log("orderInfo", Math.round(orderInfo.totalPrice * 100))
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    //console.log(paymentData)


    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            //console.log("client secret", clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    console.log("order", order)
                    dispatch(newOrderAction(order))


                    history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'Payment Process | ShopIT'} />

            <CheckoutStep shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e) => submitHandler(e)}>
                        <h3 className="mb-4 text-center">Card Info</h3>

                        <p className='text-center display-4'>
                            <i className="fab fa-cc-jcb text-primary mr-2"></i>
                            <i className="fab fa-cc-mastercard text-warning mr-2"></i>
                            <i className="fab fa-cc-visa text-success"></i>
                        </p>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            <i className="fab fa-cc-visa mr-2"></i>
                            Pay -
                            <span className='font-italic'>  {orderInfo && `$${(orderInfo.totalPrice).toFixed(2)}`} </span>
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}
