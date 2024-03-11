import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ModalEditUser from './ModalEditUser';
import ModalUser from './ModalUser';
import { getAllUsers, editUser, deleteUserService, createNewUserService } from '../../services/userService';
import { emitter } from '../../utils/emitter';
import Paging from '../../components/Paging/Paging';

import "./UserManage.scss";
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {},
            currentPage: 1,
            pageSize: 5,
            pageCount: 1
        }
    }

    getAllUserFromManage = async () => {
        try {
            let res = await getAllUsers(this.state.currentPage, this.state.pageSize);
            if (res && res.errorCode === 200) {
                this.setState({
                    arrUsers: res.content.data,
                    pageCount: res.content.totalPages
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    handleChangePage = async (pageIndex) => {
        this.setState({
            currentPage: pageIndex
        })
        await this.getAllUserFromManage()
    }

    async componentDidMount() {
        await this.getAllUserFromManage()
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUsersModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    toggleEditUsersModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            await this.getAllUserFromManage()
            this.setState({
                isOpenModal: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUser(user)
            this.setState({
                isOpenEditModal: false
            })

            await this.getAllUserFromManage(1, 100)
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    handleDeleteUser = async (user) => {
        try {
            let data = await deleteUserService(user.id)
            if (data && data.errorCode === 200) {
                await this.getAllUserFromManage()
                alert("deleted successfully")

            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    render() {
        let { arrUsers } = this.state
        return (

            <div className="user-container">
                <ModalUser
                    toggleFromParent={this.toggleUsersModal}
                    isOpen={this.state.isOpenModal}
                    size="xl"
                    createUser={this.createNewUser}
                    centered
                ></ModalUser>
                {this.state.isOpenEditModal &&
                    <ModalEditUser
                        toggleFromParent={this.toggleEditUsersModal}
                        isOpen={this.state.isOpenEditModal}
                        currentUser={this.state.userEdit}
                        size="xl"
                        centered
                        editUser={this.doEditUser}
                    >
                    </ModalEditUser>
                }

                <div className='title text-center'></div>
                <div className='mx-1'>
                    <button
                        onClick={() => { this.handleAddNewUser() }}
                        className='btn btn-primary px-3'><i className="fas fa-user-plus"></i></button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id} className='user-content'>
                                        <td>{index + 1}</td>
                                        <td><img style={{ height: 20 }} src={item.avatar}></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button
                                                onClick={() => { this.handleEditUser(item) }}
                                                className='btn-edit'><i className="fas fa-user-edit"></i></button>
                                            <button
                                                onClick={() => { this.handleDeleteUser(item) }}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    {arrUsers.length > 0 && <Paging
                        pageIndex={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        pageCount={this.state.pageCount}
                        changePage={this.handleChangePage}
                    ></Paging>
                    }
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
