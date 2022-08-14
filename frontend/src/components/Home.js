import React, { useState, Fragment, useEffect } from 'react'
import Pagination from "react-js-pagination";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { getProductsAction } from '../redux/actions/productsAction'
import { Product } from '../components/product/Product'
import { Loader } from './layout/Loader'
import { MetaData } from './layout/MetaData'
import { HomeCarousel } from './layout/HomeCarousel'
import { CategoryBox } from './layout/CategoryBox';


// const createSliderWithTooltips = Slider.createSliderWithTooltip;
// const Range = createSliderWithToolTips(Slider.Range);
const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    "Books",
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
]
export const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 2000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(5)
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error, productCount, perPage } = useSelector(state => state.productReducer)
    const { viewedProducts } = useSelector(state => state.productDetailsReducer)

    console.log("---", viewedProducts)
    const keyword = match.params.keyword;
    // console.log("my key", keyword)
    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const renderProductList = (colNum) => {
        if (products) {
            return products.map((item, index) => {
                return <Product item={item} key={item._id} col={colNum} />
            })
        }
    }



    useEffect(() => {
        dispatch(getProductsAction(keyword, currentPage, price, category, rating))
        if (error) {
            return alert.error(error)
        }
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    console.log(category)


    return (
        <Fragment>
            <HomeCarousel />
            <CategoryBox />
            {loading ? <Loader /> : <Fragment>
                <MetaData title={'Best Online Ecommerce Platform'} />


                <h2 id="products_heading">Latest Products</h2>


                <section id="products" className="container mt-5">
                    <div className="row">
                        {keyword ? (
                            <Fragment>
                                <div className='col-6 col-md-3 mt-5 mb-5'>
                                    <div className='px-5'>
                                        <Slider
                                            range
                                            marks={{ 1: `$1`, 2000: `$2000` }}
                                            min={1}
                                            max={2000}
                                            defaultValue={[1, 2000]}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />
                                        <hr className='my-5' />
                                        <div className='mt-5'>
                                            <h4 className='mb-3'>Categories</h4>
                                            <ul className='px-0'>
                                                {categories.map((ele, index) => {
                                                    return <li key={ele} style={{ cursor: 'pointer', listStyleType: 'none' }} onClick={() => setCategory(ele)}>{ele}</li>
                                                })}
                                            </ul>
                                        </div>
                                        <hr className='my-3' />
                                        <div className='mt-5'>
                                            <h4 className='mb-3'>Ratings</h4>
                                            <ul className='px-0'>
                                                {[5, 4, 3, 2, 1].map((star, index) => {
                                                    return <li key={`star${star}`} style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                        onClick={() => setRating(star)}>
                                                        <div className='rating-outer'>
                                                            <div className='rating-inner' style={{ width: `${star * 20}%` }}> </div>
                                                        </div>
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 col-md-9'>
                                    <div className='row'>
                                        {renderProductList(4)}
                                    </div>
                                </div>
                            </Fragment>
                        ) : renderProductList(3)}

                    </div>
                </section>



                {perPage <= productCount && (
                    <div className='d-flex justify-content-end mt-5'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={perPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            itemClass='page-item'
                            linkClass='page-link'
                            nextPageText='Next'
                            prevPageText='Prev'

                        />
                    </div>
                )}

                {
                    viewedProducts && viewedProducts.length > 0 && (
                        <Fragment>
                            <hr />
                            <h5 id="products_heading">Recently Viewed</h5>
                            <section id="products" className="container mt-5">
                                <div className="row">
                                    {

                                        viewedProducts.map((viewed, index) => {
                                            if (index < (Number(viewedProducts.length) - 4)) {
                                                return <Fragment></Fragment>
                                            }
                                            return <Product item={viewed} key={viewed._id} col={3} />
                                        })
                                    }
                                </div>
                            </section>

                        </Fragment>
                    )
                }

            </Fragment>}

        </Fragment>
    )
}

