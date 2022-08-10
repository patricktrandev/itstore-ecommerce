import React, { Fragment } from 'react'
import { MetaData } from './layout/MetaData'

export const Home = () => {
    return (
        <Fragment>
            <MetaData title={'Best Online Ecommerce Platform'} />


            <h3 id="products_heading">Latest Products</h3>

            <section id="products" className="container mt-5">
                <div className="row">

                    <div className="col-sm-12 col-md-5 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img src="https://cdn.vox-cdn.com/thumbor/K95jc_kE9us-hZnc9KTarx4dpqw=/0x0:1920x1080/1200x1200/filters:focal(988x539:989x540)/cdn.vox-cdn.com/uploads/chorus_asset/file/23346247/2021_LG_Gram_17_White_Press_Image.jpg" alt='' />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <a href="http://">AmazonBasics High Speed HDMI Cable, 6 Feet</a>
                                </h5>
                                <div className="ratings mt-auto">
                                    <div className='rating-outer'>
                                        <div className='rating-inner'></div>
                                    </div>
                                    <span id="no_of_reviews">(5 reviews)</span>
                                </div>
                                <p className="card-text"> <span className='small'>$</span>75.56</p>
                                <a href="#jkhjk" id="view_btn" className="btn btn-lock">View Details</a>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </Fragment>
    )
}

