import React, { Fragment, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loadUserAction } from '../../redux/actions/usersAction'
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    //const dispatch = useDispatch()
    const { isAuthenticated, loading, user } = useSelector(state => state.userReducer)
    // useEffect(() => {
    //     if (!user) {
    //         dispatch(loadUserAction())
    //     }
    // }, [dispatch, isAuthenticated, loading, user])

    // if (!loading && isAuthenticated) {
    //     if (user.role !== 'admin') {
    //         return <Redirect to='/' />
    //     }
    //     return children;

    // } else {
    //     return <Redirect to={'/login'} />
    // }


    return (
        <Fragment>
            {loading === false && (
                <Route {...rest}
                    render={props => {
                        if (isAuthenticated === false && user === null) {
                            return <Redirect push to='/login' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}
