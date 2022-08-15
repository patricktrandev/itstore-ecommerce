import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../layout/Loader'
import { getAdminProductsAction, clearErrors } from '../../redux/actions/productsAction'
import { getAllOrdersAdminAction } from '../../redux/actions/orderActions'
import { getAllUsersAdminAction } from '../../redux/actions/usersAction'
import { MetaData } from '../layout/MetaData'
import { StyledTag } from '../layout/TagStyled'
export const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.productReducer)
    const { users } = useSelector(state => state.allUsersAdminReducer)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrderReducer)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
    const revenueAmount = Number(totalAmount).toFixed(2)
    const ordersProcessing = orders.filter(item => item.orderStatus !== 'Delivered');
    console.log("orderProcessing", ordersProcessing)

    const renderOrderTable = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID ⬍',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'User ID ⬍',
                    field: 'userId',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items ⬍',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount ⬍',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status ⬍',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Created At ⬍',
                    field: 'created',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        ordersProcessing.forEach(order => {
            data.rows.push({
                id: order._id,
                userId: order.user,
                numOfItems: order.orderItems.length,
                amount: `$${((order.totalPrice).toFixed(2))}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <StyledTag>{order.orderStatus}</StyledTag>
                    : <StyledTag bg='red'>{order.orderStatus}</StyledTag>,

                created: String(order.createdAt).substring(0, 10),
                actions:
                    <Fragment>

                        <Link to={`/admin/orders/${order._id}`} className="mx-2 btn btn-success py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    </Fragment>

            })
        })
        return data;
    }


    // const getOrderProcessing=()=>{

    // }

    useEffect(() => {
        dispatch(getAdminProductsAction())
        dispatch(getAllOrdersAdminAction())
        dispatch(getAllUsersAdminAction())

    }, [dispatch])
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div>
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
                                                <div className="text-center card-font-size">Users<br /> <span style={{ fontSize: '3rem' }} >{users && users.length}</span></div>
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
                    <hr />
                    <div >
                        <h4 className="my-4">Orders Processing</h4>

                        {
                            orders && ordersProcessing && (
                                <Fragment>
                                    <MDBDataTable
                                        data={renderOrderTable()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
                                </Fragment>
                            )

                        }
                    </div>


                </div>

            </div>

        </Fragment>
    )
}
