
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { MetaData } from '../layout/MetaData'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrdersAction, clearErrors } from '../../redux/actions/orderActions'
import { StyledTag } from '../layout/TagStyled';
import { Loader } from '../layout/Loader'



export const OrdersList = (props) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.myOrderReducer)
    console.log(orders)
    const renderOrderTable = () => {
        const data = {
            columns: [
                {
                    label: 'Order #',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'dateOrder',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                dateOrder: String(order.createdAt).substring(0, 10),
                numOfItems: order.orderItems.length,
                amount: `$${(order.totalPrice).toFixed(2)}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    // ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    // : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                    ? <StyledTag>{order.orderStatus}</StyledTag>
                    : <StyledTag bg='red'>{order.orderStatus}</StyledTag>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })
        return data;
    }

    useEffect(() => {
        dispatch(myOrdersAction())
        console.log("disptach done")
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={'Orders | ShopIT'} />

            {
                loading ? <Loader />
                    : (
                        <Fragment>
                            <h3 className='m-5 text-center text-primary font-weight-bold'>Your Orders</h3>
                            <hr />
                            <div className='text-center'>
                                <MDBDataTable
                                    data={renderOrderTable()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            </div>

                        </Fragment>
                    )
            }

        </Fragment>
    )
}
