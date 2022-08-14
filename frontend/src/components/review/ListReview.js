import React, { Fragment } from 'react'

export const ListReview = ({ reviews }) => {
    return (




        <div class="reviews w-100">
            <h3 className='text-success'>Customers' Reviews</h3>
            <hr />
            {reviews && reviews.map(review => (
                <Fragment>
                    <div key={review._id} className="row p-3">
                        <div className="col-lg-4">
                            <img src="https://res.cloudinary.com/dctb1eocj/image/upload/v1660231606/avatar/1660231604986.png" alt='1660231604986' className="img-fluid rounded-circle border border-warning" width={80} />
                            <div className="review-block-name">by <span className='text-primary'> {review.name}</span></div>
                        </div>
                        <div className="col-lg-8">
                            <div class="rating-outer">
                                <div class="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                            </div>
                            <div className="review-block-description">{review.comment}</div>
                        </div>

                    </div>
                    <hr />
                </Fragment>




            ))}
        </div>

    )

}
