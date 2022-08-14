import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { MetaData } from '../layout/MetaData'
import { Loader } from '../layout/Loader'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProductsAction, clearErrors, deleteProductAction } from '../../redux/actions/productsAction'
import { StyledTag } from '../layout/TagStyled';
import { Sidebar } from './Sidebar'
import { delete_product_reset } from '../../redux/constants/productConstants'
export const ProductsList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productReducer)
    const { error: deleteError, isDeleted } = useSelector(state => state.HandleProductReducer)
    const renderProductTable = () => {
        const data = {
            columns: [
                {
                    label: 'ID ⬍',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name ⬍',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price ⬍',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock ⬍',
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
                        <button className="mx-2 btn btn-danger py-1 px-2" onClick={() => deleteProductHandler(product._id)}><i className="fa fa-trash-alt"></i></button>
                        <Link to={`/products/${product._id}`} className="mx-2 btn btn-success py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    </Fragment>

            })
        })
        return data;
    }

    const submitDelete = (id) => {
        console.log("id", id)
        dispatch(deleteProductAction(id));
    }

    const deleteProductHandler = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => submitDelete(id)
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        });


    }

    useEffect(() => {
        dispatch(getAdminProductsAction())
        console.log("disptach done")
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Product deleted successfully!')
            history.push('/admin/products')
            dispatch({
                type: delete_product_reset
            })
        }
    }, [dispatch, alert, error, deleteError, history, isDeleted])
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
