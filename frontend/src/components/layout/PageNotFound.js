import React from 'react'
import { Link } from 'react-router-dom'
export const PageNotFound = () => {
    return (
        <div className='mt-2 text-center'>
            <img style={{ maxWidth: '50vw' }} src='https://res.cloudinary.com/dctb1eocj/image/upload/v1660337528/shopit-common/404Page_ybfka9.webp' alt='page_not_found.png' /> <br />
            <Link to='/' style={{ textDecoration: 'none' }}><button className='btn btn-shopping text-white px-5'>Go Shopping</button></Link>

        </div>
    )
}
