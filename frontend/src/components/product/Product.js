import React from 'react'
import { Link } from 'react-router-dom'
export const Product = ({ item }) => {
    return (
        <div className="col-sm-12 col-md-5 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img style={{ maxHeight: '140px' }} src={item.images[0].url} alt='' className='img-fluid' />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className='rating-outer'>
                            <div className='rating-inner' style={{ width: `${(item.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({item.ratings} reviews)</span>
                    </div>
                    <p className="card-text"> <span className='small'>$</span>{item.price}</p>
                    <Link to={`/products/${item._id}`} id="view_btn" className="btn btn-lock">View Details</Link>
                </div>
            </div>
        </div>
    )
}
