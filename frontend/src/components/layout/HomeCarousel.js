import React, { Fragment } from 'react'
import { Carousel } from 'react-bootstrap';
const dataSlider = [
    {
        id: 'img-slider1',
        img: '/images/slider1.png'
    },
    {
        id: 'img-slider2',
        img: '/images/slider2.png'
    },
    {
        id: 'img-slider3',
        img: '/images/slider3.png'
    },
    {
        id: 'img-slider4',
        img: '/images/slider4.png'
    },
    {
        id: 'img-slider5',
        img: '/images/slider5.jpg'
    }
]
export const HomeCarousel = () => {
    return (
        <Fragment>
            <div className="home-carousel row m-1" id='product_image'>
                <Carousel pause='hover'>
                    {dataSlider.map((item, index) => (<Carousel.Item key={item.id}>
                        <img className='d-block w-100 img-fluid' src={item.img} alt={item.id} />
                    </Carousel.Item>)
                    )}
                </Carousel>

            </div>
        </Fragment>
    )
}
