import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../store/actions';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            Email: '',
            Role: 'User'
        }
    }


    handleChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.createUser(this.state)
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    render() {
        let roleArr =  [...this.props.arrRoles]
        console.log(roleArr);
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className='modalUserContainer'>
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Username</label>
                            <input value={this.state.Username} type='text' onChange={(e) => { this.handleChangeInput(e, "Username") }} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input value={this.state.Password} type='password' onChange={(e) => { this.handleChangeInput(e, "Password") }} />
                        </div>
                        <div className='input-container'>
                            <label>Email</label>
                            <input value={this.state.Email} type='email' onChange={(e) => { this.handleChangeInput(e, "Email") }} />
                        </div>
                        <div className='input-container'>
                            <label>Role</label>
                            <select value={this.state.Role} onChange={(e) => { this.handleChangeInput(e, "Role") }}>
                                {roleArr && roleArr.length > 0 &&
                                    roleArr.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.name}>{item.name}</option>
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
                        onClick={() => { this.handleAddNewUser() }}>
                        Add
                    </Button>{' '}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
