import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { loginAction, clearErrors } from '../../redux/actions/usersAction'
import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'

export const Login = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const { isAuthenticated, loading, error } = useSelector(state => state.userReducer)
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginAction(email, password))
    }
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, loading, error, history])
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div className="row wrapper">
                        <div className="col-9 col-lg-5">
                            <form className="shadow-lg" style={{ minHeight: '48vh' }} onSubmit={(e) => submitHandler(e)}>
                                <h1 className="mb-3 text-center">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="text" className="form-control" id="email_field" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input type="password" className="form-control" id="password_field" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <Link to="/forgot-password" className="float-right mb-4">Forgot Password?</Link>
                                <button type="submit" id="login_button" className="btn btn-block py-3">LOGIN</button>
                                <Link to="/register" className="float-right m-3">Sign-in Account</Link>
                            </form>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}
