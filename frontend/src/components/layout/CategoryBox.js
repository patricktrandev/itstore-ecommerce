import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const categoryBox = [
    {
        imgSrc: '/images/icon-accessories.png',
        name: 'icon-accessories',
        category: 'apple'
    },
    {
        imgSrc: '/images/icon-mobile.png',
        name: 'icon-mobile',
        category: 'airpods'
    },
    {
        imgSrc: '/images/icon-apple.png',
        name: 'icon-apple',
        category: 'Mackbook'
    },
    {
        imgSrc: '/images/icon-houseware.png',
        name: 'icon-houseware',
        category: 'card'
    },
    {
        imgSrc: '/images/icon-laptop.png',
        name: 'icon-laptop',
        category: 'Sandisk'
    },
    {
        imgSrc: '/images/icon-pc.png',
        name: 'icon-pc',
        category: 'Headphones'
    },
    {
        imgSrc: '/images/icon-screen.png',
        name: 'icon-screen',
        category: 'Nikon'
    },
    {
        imgSrc: '/images/icon-smart.png',
        name: 'icon-smart',
        category: 'Charging'
    },
    {
        imgSrc: '/images/icon-smartwatch.png',
        name: 'icon-smartwatch',
        category: 'smartwatch'
    },
    {
        imgSrc: '/images/icon-tcdm.png',
        name: 'icon-tcdm',
        category: 'apple'
    },
    {
        imgSrc: '/images/icon-tablet.png',
        name: 'icon-tablet',
        category: 'laptop'
    },
    {
        imgSrc: '/images/icon-samsung.png',
        name: 'icon-samsung',
        category: 'camera'
    }
]
export const CategoryBox = () => {

    const renderBox = () => {
        return categoryBox.map((item, index) => {
            return <div key={item.name} className="col-lg-2 col-sm-3 col-border">
                <div className="cate-item">
                    <Link to={`/search/${item.category}`}>
                        <img className="img-fluid" src={item.imgSrc} alt={item.name} />
                    </Link>
                </div>
            </div>

        })
    }

    return (
        <div className='m-1 cate-box'>
            <div className='row bg-white'>
                {renderBox()}
            </div>
        </div>
    )
}
