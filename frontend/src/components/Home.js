import React, { Fragment, useEffect } from 'react'
import { MetaData } from './layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getProductsAction } from '../redux/actions/productsAction'
import { Product } from '../components/product/Product'
import { Loader } from './layout/Loader'

export const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productCount } = useSelector(state => state.productReducer)

    useEffect(() => {
        dispatch(getProductsAction())
        if (error) {
            return alert.error(error)
        }
    }, [dispatch, error])

    const renderProductList = () => {
        if (products) {
            return products.map((item, index) => {
                return <Product item={item} key={item._id} />
            })
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={'Best Online Ecommerce Platform'} />
                <h3 id="products_heading">Latest Products</h3>
                <section id="products" className="container mt-5">
                    <div className="row">
                        {renderProductList()}
                    </div>
                </section>
            </Fragment>}

        </Fragment>
    )
}

