import React, { useState, useEffect, Fragment } from 'react'
import { useAlert } from 'react-alert'
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductsAction, clearErrors, newReviewAction } from '../../redux/actions/productsAction'
import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'
import { Title } from '../layout/TagTitle'
import { new_review_reset } from '../../redux/constants/productConstants'
import { addToCartAction } from '../../redux/actions/cartActions'
import { ListReview } from '../review/ListReview';
export const ProductDetails = ({ match }) => {
    let [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const alert = useAlert();
    const { loading, error, product } = useSelector(state => state.productDetailsReducer)
    const { user } = useSelector(state => state.userReducer)
    const { error: reviewError, success } = useSelector(state => state.newReviewReducer)
    const id = match.params.id;

    useEffect(() => {
        dispatch(getSingleProductsAction(id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Reivew posted successfully')
            dispatch({ type: new_review_reset })
        }

    }, [dispatch, alert, error, reviewError, id, success])

    const handlerStockIncrease = () => {
        //console.log("click me")
        const count = document.querySelector('.count');
        //console.log(count.valueAsNumber);
        if (count.valueAsNumber >= product.stock) {
            return;
        }

        setQuantity(count.valueAsNumber + 1);


    }
    const handlerStockDecrease = () => {
        //console.log("click me --")
        const count = document.querySelector('.count');
        //console.log(count.valueAsNumber);
        if (count.valueAsNumber <= 1) {
            alert.error("Minimum quanity is 1")
            return;
        }
        setQuantity(count.valueAsNumber - 1);

    }
    function setUserRating() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })
        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }
    const addToCartHandler = () => {
        dispatch(addToCartAction(match.params.id, quantity));
        alert.success('Item Added To Cart')
    }


    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);

        dispatch(newReviewAction(formData));
    }

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
                            <span className="btn btn-danger rounded-circle minus p-1" onClick={() => handlerStockDecrease()}><i className="fa fa-minus p-1"></i></span>
                            <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                            <span className="btn btn-primary plus rounded-circle p-1" onClick={() => handlerStockIncrease()}><i className="fa fa-plus p-1"></i></span>
                        </div>
                        <button id="cart_btn" type="button" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={() => addToCartHandler()}> Add to Cart </button>
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
                        {
                            user ? (
                                <button id="reviewt_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRating}>Submit your review</button>
                            )
                                : (
                                    <div className='alert alert-danger mt-5' type='alert'>Login to post your review.</div>
                                )
                        }

                        <div className="row mt-2 mb-5">
                            <div className="rating w-50">
                                <div className="modal fade" id="ratingModal" tabIndex={-1} role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ratingModal">Submit Review</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true"><i class="fa fa-times-circle"></i></span>
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
                                                {user &&
                                                    <div>
                                                        <Title>{user.name}</Title>
                                                        <Title>{user.email}</Title>
                                                    </div>
                                                }

                                                <textarea name="review" id="review" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control mt-3" cols={20} rows={4} defaultValue={""} />
                                                <div className='mt-2'>
                                                    <button id='review_btn' type='button' className="btn btn-success float-right review-btn px-4 text-white" onClick={() => reviewHandler()} data-dismiss="modal" aria-label="Close" >Submit</button>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





                {

                    product.reviews && product.reviews.length > 0 && (
                        <div className='container'>
                            <div className="row w-100">
                                <div className="col-sm-7 col-12 m-auto">

                                    <div className="review-block">

                                        <ListReview reviews={product.reviews} />

                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }




            </Fragment>
            }
        </Fragment>



    )
}