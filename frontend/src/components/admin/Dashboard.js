import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../layout/Loader'
import { getAdminProductsAction, clearErrors } from '../../redux/actions/productsAction'
import { getAllOrdersAdminAction } from '../../redux/actions/orderActions'
import { MetaData } from '../layout/MetaData'
export const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productReducer)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrderReducer)
    console.log("orders dashboard", totalAmount)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    const revenueAmount = Number(totalAmount).toFixed(2)

    useEffect(() => {
        dispatch(getAdminProductsAction())
        dispatch(getAllOrdersAdminAction())

        // if (error) {
        //     alert.error(error)
        //     dispatch(clearErrors())
        // }
        // if (orderError) {
        //     alert.error(error)
        //     dispatch(clearErrors())
        // }
    }, [dispatch])
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h4 className="my-4">Dashboard</h4>

                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard '} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Revenue <br /> <span style={{ fontSize: '3rem' }} >$ {orders && (revenueAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size" >Products<br /> <span style={{ fontSize: '3rem' }} >{products && products.length}</span></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <span style={{ fontSize: '3rem' }} >{orders && orders.length}</span></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>675</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <span style={{ fontSize: '3rem' }}>{outOfStock}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}

                </div>
            </div>
        </Fragment>
    )
}
