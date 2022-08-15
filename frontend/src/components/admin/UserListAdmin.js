import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import { MetaData } from '../layout/MetaData'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAdminAction, clearErrors, deleteUserAdminAction } from '../../redux/actions/usersAction'
import { Loader } from '../layout/Loader'
import { Title } from '../layout/TagTitle'
import { Sidebar } from './Sidebar'
import { delete_user_reset } from '../../redux/constants/userConstant'
export const UserListAdmin = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.allUsersAdminReducer)
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector(state => state.userManagementReducer)

    const renderUserTable = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Activate from',
                    field: 'activate',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role:
                    user.role && <Title>#{user.role}</Title>,
                activate: String(user.createdAt).substring(0, 10),
                actions:
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="mx-2 btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button className="mx-2 btn btn-danger py-1 px-2" onClick={() => deleteUserHandler(user._id)} disabled={deleteLoading ? true : false} ><i className="fa fa-trash-alt"></i></button>

                    </Fragment>
            })
        })
        return data;
    }

    const submitDelete = (id) => {
        console.log("id", id)
        dispatch(deleteUserAdminAction(id));
    }

    const deleteUserHandler = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => submitDelete(id)
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        });


    }

    useEffect(() => {
        dispatch(getAllUsersAdminAction())
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Delete user successfully!')
            history.push('/admin/users')
            dispatch({
                type: delete_user_reset
            })
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history])


    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 text-center">
                    <Fragment>
                        <h3 className="my-5">Users Management</h3>
                        <hr />

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={renderUserTable()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
