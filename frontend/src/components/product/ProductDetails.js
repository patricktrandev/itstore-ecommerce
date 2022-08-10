import React, { useState, useEffect, Fragment } from 'react'
import { useAlert } from 'react-alert'
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductsAction, clearErrors } from '../../redux/actions/productsAction'
import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'

export const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const { loading, error, product } = useSelector(state => state.productDetailsReducer)

    useEffect(() => {
        dispatch(getSingleProductsAction(match.params.id))
        if (error) {
            return alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>

                <MetaData title={product.name} />
                <div className="row d-flex justify-content-around">

                    <div className="col-12 col-lg-5 img-fluid px-2 " id='product_image'>
                        <Carousel pause='hover'>
                            {product.images && product.images.map((img, index) => (<Carousel.Item key={img.public_id}>
                                <img style={{ maxHeight: '400px', maxWidth: '400px' }} className='d-block w-100 img-fluid m-auto' src={img.url} alt={product.title} />
                            </Carousel.Item>)
                            )}
                        </Carousel>

                    </div>
                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product #{product._id}</p>
                        <hr />
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }} />
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
                        <hr />
                        <p id="product_price"><span className='small'>$</span> {product.price.toLocaleString()}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus">-</span>
                            <input type="number" className="form-control count d-inline" defaultValue={1} readOnly />
                            <span className="btn btn-primary plus">+</span>
                        </div>
                        <button id="cart_btn" type="button" className="btn btn-primary d-inline ml-4"> <span className=' p-2'> <i className="fa fa-cart-plus " ></i></span>

                            Add to Cart </button>
                        <hr />
                        <p>Status <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                        <hr />
                        <h4 className="mt-2">Description :</h4>
                        <p>Compatible with iPad Air (4th and 5th generation - 2020, 2022) - A2316, A2324, A2325, A2072</p>
                        <p>Detachable keyboard and adjustable kickstand: Remove the keyboard when you're done typing for more
                            flexibility and enjoy 50 degrees of adjustable viewing angles</p>
                        <p>SMART CONNECTOR technology: Enjoy instant power and pairing with Combo Touch keyboard case and never
                            worry about charging as power is sourced directly from your iPad Air</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong> </p>
                        <button id="reviewt_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">Submit your review</button>
                        <div className="row mt-2 mb-5">
                            <div className="rating w-50">
                                <div className="modal fade" id="ratingModal" tabIndex={-1} role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ratingModal">Submit Review</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <ul className="stars">
                                                    <li className="star"><i className="fa fa-star" /></li>
                                                    <li className="star"><i className="fa fa-star" /></li>
                                                    <li className="star"><i className="fa fa-star" /></li>
                                                    <li className="star"><i className="fa fa-star" /></li>
                                                    <li className="star"><i className="fa fa-star" /></li>
                                                </ul>
                                                <textarea name="review" id="review" className="form-control mt-3" cols={20} rows={5} defaultValue={""} />
                                                <div className='mt-2'>
                                                    <button id='review_btn' type='button' className="btn btn-success float-right review-btn px-4 text-white" >Submit</button>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
            }
        </Fragment>



    )
}