import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'


import { updateUserProfileAction, clearErrors, loadUserAction } from '../../redux/actions/usersAction'
import { update_profile_reset } from '../../redux/constants/userConstant'
import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'
export const UpdateProfile = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');

    const alert = useAlert();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer)
    const { loading, isUpdated, error } = useSelector(state => state.userManagementReducer)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateUserProfileAction(formData))
    }
    const onChangeHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Updated User successfully!')
            dispatch(loadUserAction())
            history.push('/me')
            dispatch({
                type: update_profile_reset
            })
        }
    }, [dispatch, alert, loading, error, history, isUpdated])



    return (
        <Fragment>
            <MetaData title={`${user && user.name} | Update Profile - SHOPIT`} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e) => submitHandler(e)} encType="multipart/form-data">
                        <h3 className="mb-3 text-center">Update Profile</h3>
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="name_field" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input type="text" className="form-control" id="email_field" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="avatarPreview" />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input type="file" name="avatar" accept='image/*' id="customFile" className="custom-file-input" onChange={(e) => onChangeHandler(e)} />
                                    <label htmlFor="customFile" className="custom-file-label">Choose Avatar</label>
                                </div>
                            </div>
                            <button type="submit" className="btn update-btn btn-block py-3" disabled={loading ? true : false}>Update</button>
                        </div>
                    </form>
                </div>
            </div>


        </Fragment>
    )
}
