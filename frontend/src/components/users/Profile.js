import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../layout/Loader'
import { MetaData } from '../layout/MetaData'

export const Profile = () => {

    const { user, loading } = useSelector(state => state.userReducer)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${user.name} - Profile | ShopIT`} />

                    <div className="mt-5 ml-5 font-weight-bold text-warning display-4">MY PROFILE</div>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className="avatar avatar-profile">
                                <img src={user.avatar.url} className="rounded-circle img-fluid" style={{ border: '5px solid #ff4000', boxShadow: 'rgb(200 200 200) 0px 2px 8px 6px' }} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">Edit Profile</Link>
                        </div>
                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                            <h5 className='font-italic small'>Joined on</h5>
                            <p className='font-italic small'>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block my-5">My Orders</Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block my-5">Change Password</Link>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}
