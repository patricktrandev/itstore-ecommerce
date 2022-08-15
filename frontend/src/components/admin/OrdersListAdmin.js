import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { MetaData } from '../layout/MetaData'
import { Loader } from '../layout/Loader'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { StyledTag } from '../layout/TagStyled'
import { getAllOrdersAdminAction, clearErrors } from '../../redux/actions/orderActions'
import { Sidebar } from './Sidebar'
export const OrdersListAdmin = () => {


    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.allOrderReducer)
    //const { error: deleteError, isDeleted } = useSelector(state => state.HandleProductReducer)
    console.log("order --", orders)
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

        orders.forEach(order => {
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
                        <button className="mx-2 btn btn-danger py-1 px-2" ><i className="fa fa-trash-alt"></i></button>
                        <Link to={`/admin/orders/${order._id}`} className="mx-2 btn btn-success py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    </Fragment>

            })
        })
        return data;
    }

    // const submitDelete = (id) => {
    //     console.log("id", id)
    //     dispatch(deleteProductAction(id));
    // }

    // const deleteProductHandler = (id) => {
    //     confirmAlert({
    //         title: 'Confirm to delete',
    //         message: 'Are you sure to delete this.',
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: () => submitDelete(id)
    //             },
    //             {
    //                 label: 'No',
    //                 //onClick: () => alert('Click No')
    //             }
    //         ]
    //     });


    // }

    useEffect(() => {
        dispatch(getAllOrdersAdminAction())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        // if (deleteError) {
        //     alert.error(deleteError)
        //     dispatch(clearErrors())
        // }
        // if (isDeleted) {
        //     alert.success('Product deleted successfully!')
        //     history.push('/admin/products')
        //     dispatch({
        //         type: delete_product_reset
        //     })
        // }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'Orders Management'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10 text-center'>
                    <Fragment>
                        <h3 className='my-5'>Orders Management</h3>
                        <hr />


                        {
                            loading ? <Loader /> :
                                <Fragment>
                                    <MDBDataTable
                                        data={renderOrderTable()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
                                </Fragment>
                        }



                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
