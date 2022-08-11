import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { registerAction, clearErrors } from '../../redux/actions/usersAction'
import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'


export const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');
    const alert = useAlert();
    const dispatch = useDispatch();



    const { isAuthenticated, loading, error } = useSelector(state => state.userReducer)
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(registerAction(formData))
    }
    const onChangeHandler = (e) => {

        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            let { name, value } = e.target;
            setUser({
                ...user,
                [name]: value
            })
        }

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
                    <MetaData title={'Register User'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={(e) => submitHandler(e)} encType="'multipart/form-data">
                                <h1 className="mb-3">Register</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="text" className="form-control" name='name' value={name} onChange={(e) => onChangeHandler(e)} id="name_field" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="text" className="form-control" id="email_field" name='email' value={email} onChange={(e) => onChangeHandler(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input type="password" className="form-control" id="password_field" name='password' value={password} onChange={(e) => onChangeHandler(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar_upload">Avatar</label>
                                    <div className="d-flex align-items-center">

                                        <figure className="avatar mr-3 item-rtl ">
                                            <img src={avatarPreview} className="rounded-circle" alt="avatarPreview" />
                                        </figure>
                                        <div className="custom-file ">
                                            <input type="file" name="avatar" id="customFile" className="custom-file-input" accept='image/*' onChange={(e) => onChangeHandler(e)} />
                                            <label htmlFor="customFile" className="custom-file-label">Choose Avatar</label>
                                        </div>

                                    </div>
                                    <button type="submit" id="register_button" className="btn btn-block py-3" disabled={loading ? true : false}>REGISTER</button>
                                </div>
                            </form>
                        </div>
                    </div >



                </Fragment >
            )}
        </Fragment>


    )
}
