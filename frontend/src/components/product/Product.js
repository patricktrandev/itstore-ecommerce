import React from 'react'
import { Link } from 'react-router-dom'
export const Product = ({ item, col }) => {
    return (
        <div className={`col-sm-12 col-md-5 col-lg-${col} my-2`}>
            <div className="card p-2 rounded">
                <img style={{ maxHeight: '140px' }} src={item.images[0].url} alt='' className='img-fluid' />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title " style={{ fontSize: '18px' }}>
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className='rating-outer'>
                            <div className='rating-inner' style={{ width: `${(item.ratings / 5) * 100}%` }}></div>
                        </div>
                        <br />
                        <span id="no_of_reviews" className='small font-italic'>({item.ratings} reviews)</span>
                    </div>
                    <p className="card-text font-weight-bold"> <span className='small'>$ </span>{item.price.toLocaleString()}</p>
                    <Link to={`/products/${item._id}`} id="view_btn" className="btn btn-lock">View Details</Link>
                </div>
            </div>
        </div>
    )
}
