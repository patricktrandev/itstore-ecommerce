import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { MetaData } from '../layout/MetaData'
import { useSelector } from 'react-redux'
export const OrderSuccess = ({ location }) => {


    const { order } = useSelector(state => state.newOrderReducer);
    //console.log(order.order._id)
    // order && console.log(order.order._id)
    return (
        <Fragment>
            <MetaData title={'Process order successfully'} />
            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">

                    <h3 className='m-3 text-danger' style={{ fontFamily: 'DynaPuff', fontSize: '2.5rem' }}>THANK YOU FOR SHOPPING</h3>
                    <hr />
                    <h3 className='m-3 text-primary' style={{ fontFamily: 'DynaPuff', fontSize: '1.8rem' }}>Your Payment is Successful!</h3>
                    {order &&
                        <h5 className='m-3 ' style={{ fontFamily: 'DynaPuff', fontSize: '1.3rem' }}>Your transaction number is: <span className='text-success'>{order.order._id}</span> </h5>
                    }

                    <p></p>
                    <hr />
                    <img style={{ minWidth: '300px' }} src='https://res.cloudinary.com/dctb1eocj/image/upload/v1660411180/shopit-common/order-success_bznfsp.jpg' alt='order-success' />
                    <br />

                    <Link to="/orders/me"><button className='btn btn-shopping text-white px-5'>Go to Orders</button></Link>
                </div>

            </div>
        </Fragment>
    )
}
