import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getProductReviewAdminAction, clearErrors, deleteReviewAdminAction } from '../../redux/actions/productsAction'
import { delete_review_reset } from '../../redux/constants/productConstants'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MetaData } from '../layout/MetaData'
import { Sidebar } from './Sidebar'

export const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.newReviewAdminReducer);
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector(state => state.deleteReviewAdminReducer)
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            console.log(deleteError)
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviewAdminAction(productId))
        }

        if (isDeleted) {
            alert.success('Review deleted successfully');

            dispatch({
                type: delete_review_reset
            })
        }



    }, [dispatch, alert, error, productId, isDeleted, deleteError])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviewAdminAction(productId))
    }




    const setReviewsTable = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(review._id)} disabled={deleteLoading ? true : false}>
                        <i className="fa fa-trash-alt"></i>
                    </button>

            })
        })

        return data;
    }

    const submitDelete = (id) => {
        console.log("id", id)
        dispatch(deleteReviewAdminAction(id, productId));
    }

    const deleteUserHandler = (id) => {
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

    return (
        <Fragment>
            <MetaData title={'Admin | Products Review'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
                                    </button>
                                </ form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviewsTable()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
