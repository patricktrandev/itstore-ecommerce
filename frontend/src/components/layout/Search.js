import React, { useState } from 'react'


export const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            history.push(`/search/${keyword}`)

        } else {
            history.push('/')
        }
    }

    return (

        <form onSubmit={searchHandler}>
            <div className='input-group'>
                <input type='text' id='search_field' className='form-control' placeholder='Enter product name....' onChange={(e) => setKeyword(e.target.value)} />
                <div className='input-group-append'>
                    <button id='search_btn' className='btn'>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>

    )
}
