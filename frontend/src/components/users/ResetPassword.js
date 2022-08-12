import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { resetPasswordAction, clearErrors } from '../../redux/actions/usersAction'
import { MetaData } from '../layout/MetaData'
export const ResetPassword = ({ history, match }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    console.log(confirmPassword)
    console.log(password)
    const alert = useAlert();
    const dispatch = useDispatch();

    const { success, error, loading } = useSelector(state => state.forgotPasswordReducer)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPasswordAction(match.params.token, formData))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Password Updated Successfully')
            history.push('/login')
        }
    }, [dispatch, alert, loading, error, history, success])
    return (
        <Fragment>
            <MetaData title={'Reset New Password | ShopIT'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e) => submitHandler(e)} encType="multipart/form-data">
                        <h3 className="mb-3 mt-2 text-center">Reset Your Password</h3>
                        <div className="form-group">
                            <label htmlFor="newPassword_field">New Password</label>
                            <input type="password" placeholder='Enter new password...' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="newPassword_field" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword_field">Confirm New Password</label>
                            <input type="password" placeholder='Enter confirm password...' className="form-control" id="confirmPassword_field" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />

                        </div>

                        <button type="submit" className="btn update-btn btn-block py-3" disabled={loading ? true : false}>Reset Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
