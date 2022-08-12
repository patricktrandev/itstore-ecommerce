import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { updatePasswordAction, clearErrors } from '../../redux/actions/usersAction'
import { update_password_reset } from '../../redux/constants/userConstant'
import { MetaData } from '../layout/MetaData'

export const UpdatePassword = ({ history }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isUpdated, error, loading } = useSelector(state => state.userManagementReducer)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        console.log(formData.values)
        dispatch(updatePasswordAction(formData))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Password updated successfully!')
            history.push('/me')
            dispatch({
                type: update_password_reset
            })
        }
    }, [dispatch, alert, loading, error, history, isUpdated])
    return (
        <Fragment>
            <MetaData title={'Change Password | ShopIT'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e) => submitHandler(e)} encType="multipart/form-data">
                        <h3 className="mb-3 mt-2 text-center">Update Password</h3>
                        <div className="form-group">
                            <label htmlFor="oldPassword_field">Old Password</label>
                            <input type="password" placeholder='Your old password...' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} className="form-control" id="oldPassword_field" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">New Password</label>
                            <input type="password" placeholder='Your new password...' className="form-control" id="password_field" onChange={(e) => setPassword(e.target.value)} value={password} />

                        </div>

                        <button type="submit" className="btn update-btn btn-block py-3" disabled={loading ? true : false}>Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
