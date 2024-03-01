import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ModalUser from './ModalUser';
import { getAllUsers,deleteUserService, createNewUserService } from '../../services/userService';

import "./UserManage.scss";
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false
        }
    }

    getAllUserFromManage = async () => {
        let res = await getAllUsers(1, 100);
        if (res && res.errorCode === 200) {
            this.setState({
                arrUsers: res.content.data
            })
        }
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

    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            await this.getAllUserFromManage()
            this.setState({
                isOpenModal: false
            })
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let data = await  deleteUserService(user.id)
            if(data && data.errorCode ===200){
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
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-user-edit"></i></button>
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
