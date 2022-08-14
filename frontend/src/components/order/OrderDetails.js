import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { MetaData } from '../layout/MetaData'

import { StyledTag } from '../layout/TagStyled';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetailsAction, clearErrors } from '../../redux/actions/orderActions'

import { Loader } from '../layout/Loader'
export const OrderDetails = ({ match, props }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const id = match.params.id;
    const { loading, error, getDetails = {} } = useSelector(state => state.orderDetailsReducer);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = getDetails;
    useEffect(() => {

        dispatch(getOrderDetailsAction(id))
        console.log('disptach done...')
        if (error) {
            console.log(error)
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, id])
    // console.log(match.params.id)
    console.log(loading)
    //const order1 = order.order
    //
    //console.log("looo", shippingInfo, orderItems, paymentInfo)
    console.log("getDetails", getDetails)
    //console.log("getDetails", getDetails.shippingInfo)
    //console.log("here", order1)
    //console.log("here...", order.order)
    //console.log(shippingInfo.address)



    //
    // console.log(">>", shippingInfo)
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;
    let textContent = isPaid ? 'PAID' : 'NOT PAID';
    return (

        <Fragment>
            <MetaData title={'Order Details'} />
            {
                loading ? <Loader />
                    : (
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8 mt-5 order-details">
                                <h3 className="my-5">Order # {id}</h3>

                                <h5 className="mb-4">Shipping Info</h5>
                                <p><b>Name:</b> {user && user.name}</p>
                                <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>
                                <hr />
                                <div className='d-flex justify-content-around'>
                                    <div className='mx-3'>
                                        <h4 className="my-4">Payment</h4>
                                        {

                                            isPaid ? <StyledTag>{textContent}</StyledTag> : <StyledTag bg='red'>{textContent}</StyledTag>
                                        }

                                    </div>
                                    <div>
                                        <h4 className="my-4">Order Status:</h4>
                                        {
                                            orderStatus && String(orderStatus).includes('Delivered')
                                                ? <StyledTag>{orderStatus}</StyledTag>
                                                : <StyledTag bg='red'>{orderStatus}</StyledTag>
                                        }
                                    </div>

                                </div>
                                <h4 className="my-4">Order Items:</h4>
                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>
                                            <div className="col-5 col-lg-5">

                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        </div>
                    )
            }
        </Fragment>
    )
}
