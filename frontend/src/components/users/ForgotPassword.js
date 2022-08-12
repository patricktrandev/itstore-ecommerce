import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { forgotPasswordAction, clearErrors } from '../../redux/actions/usersAction'
import { MetaData } from '../layout/MetaData'
export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(state => state.forgotPasswordReducer)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.set('email', email);
        dispatch(forgotPasswordAction(formData))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message)

        }

    }, [dispatch, alert, error, message, loading])



    return (
        <Fragment>
            <MetaData title={'Forgot Password | ShopIT'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e) => submitHandler(e)} encType="multipart/form-data">
                        <h2 className="mb-3 mt-2 text-center">Forgot Password?</h2>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input type="text" placeholder='Enter your email...' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="email_field" />
                        </div>


                        <button type="submit" id='forgot_password_button' className="btn btn-block py-3" disabled={loading ? true : false} >Send Email</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
