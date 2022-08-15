import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { MetaData } from '../layout/MetaData'
import { Loader } from '../layout/Loader'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { update_order_reset } from '../../redux/constants/orderConstant'
import { updateOrderAdminAction, clearErrors, getOrderDetailsAction } from '../../redux/actions/orderActions'
import { Sidebar } from './Sidebar'
import { StyledTag } from '../layout/TagStyled';
import { Title } from '../layout/TagTitle'
export const ProcessOrder = ({ history, match }) => {

    const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, getDetails = {} } = useSelector(state => state.orderDetailsReducer);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = getDetails;
    const { error, isUpdated } = useSelector(state => state.orderAdminReducer)
    const orderId = match.params.id;

    useEffect(() => {

        dispatch(getOrderDetailsAction(orderId))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        if (isUpdated) {

            alert.success('Order updated successfully');

            dispatch({
                type: update_order_reset
            })
        }

    }, [dispatch, alert, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrderAdminAction(formData, id))

    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;
    let textContent = isPaid ? 'PAID' : 'NOT PAID';

    return (
        <Fragment>
            <MetaData title={`Process Order # ${getDetails && getDetails._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 d-block">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h4 className="my-5">Order # <span className='text-success'>{getDetails._id}</span> </h4>

                                    <h4 className="mb-4">Shipping Info</h4>
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
                                        <div>
                                            <h4 className="my-4">Stripe ID</h4>

                                            {paymentInfo && (<Title># {paymentInfo.id}</Title>)}
                                        </div>

                                    </div>

                                    {/* <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                                    <h4 className="my-4">Stripe ID</h4>
                                    <p><b>{paymentInfo && paymentInfo.id}</b></p>

                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={getDetails.orderStatus && String(getDetails.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p> */}



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

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary py-3 px-5 " onClick={() => updateOrderHandler(getDetails._id)} disabled={orderStatus && String(orderStatus).includes('Delivered') ? true : false} >
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
