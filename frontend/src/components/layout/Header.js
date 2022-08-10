import React, { Fragment } from 'react'

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <a href="/">
                            <img src="/images/shopit_logo.png" alt='shopit_logo.png' />
                        </a>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <div className='input-group'>
                        <input type='text' id='search_field' className='form-control' placeholder='Enter product name....' />
                        <div className='input-group-append'>
                            <button id='search_btn' className='btn'>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>

                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                    <button id='login_btn' className='btn'>Login</button>
                    <span id='cart' className='ml-4'><i className="fa fa-shopping-cart"></i> Cart</span>
                    <span className='ml-1' id='cart_count'>2</span>


                </div>
            </nav>
        </Fragment>
    )
}

export default Header