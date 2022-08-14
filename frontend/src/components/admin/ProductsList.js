import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { MetaData } from '../layout/MetaData'
import { Loader } from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProductsAction, clearErrors } from '../../redux/actions/productsAction'
import { StyledTag } from '../layout/TagStyled';
import { Sidebar } from './Sidebar'
export const ProductsList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productReducer)

    const renderProductTable = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${(product.price)}`,
                stock: product.stock,
                actions:
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="mx-2 btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="mx-2 btn btn-danger py-1 px-2"><i className="fa fa-trash-alt"></i></button>
                    </Fragment>

            })
        })
        return data;
    }

    useEffect(() => {
        dispatch(getAdminProductsAction())
        console.log("disptach done")
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])
    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h3 className='my-5'>All Products</h3>
                        <hr />
                        {
                            loading ? <Loader /> :
                                <Fragment>
                                    <MDBDataTable
                                        data={renderProductTable()}
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
