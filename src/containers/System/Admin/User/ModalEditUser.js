import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES } from '../../../../utils';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            Username: '',
            Password: '',
            Email: '',
            Role: '',
            Roles: [],
        }
    }

    handleChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        }, () => {
         
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['Username', 'Password', 'Email', 'Role']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter ' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    handleUpdateUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.editUser({
                "id": this.state.Id,
                "username": this.state.Username,
                "password": this.state.Password,
                "email": this.state.Email,
                "role": this.state.Role
            })
        }
    }

    componentDidMount() {
        let { currentUser } = this.props
        if (currentUser && !_.isEmpty(currentUser)) {
            this.setState({
                Id: currentUser.id,
                Username: currentUser.username,
                Password: 'ResetPassword@1',
                Email: currentUser.email,
                Role: currentUser.role,
                Roles: [...this.props.arrRoles],
            }, () => { })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    render() {
        let { language } = this.props
        let roleArr = this.state.Roles
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className='modalUserContainer'>
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Username</label>
                            <input disabled value={this.state.Username} type='text' onChange={(e) => { this.handleChangeInput(e, "Username") }} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input disabled value={this.state.Password} type='password' onChange={(e) => { this.handleChangeInput(e, "Password") }} />
                        </div>
                        <div className='input-container'>
                            <label>Email</label>
                            <input disabled value={this.state.Email} type='email' onChange={(e) => { this.handleChangeInput(e, "Email") }} />
                        </div>
                        <div className='input-container'>
                            <label>Role</label>
                            <select value={this.state.Role} onChange={(e) => { this.handleChangeInput(e, "Role") }}>
                                {roleArr && roleArr.length > 0 &&
                                    roleArr.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.name}>{language === LANGUAGES.VI ? item.viName : item.enName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => { this.handleUpdateUser() }}>
                        Save changes
                    </Button>
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
