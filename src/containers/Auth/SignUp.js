import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import ConFirmSignUp from './ConFirmSignUp';
import './SignUp.scss';
import Loader from '../../components/Loader';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/accountService';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            email: '',
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
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
        let arrInput = ['username', "password", "email"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter ' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    handleOnclickSignUp = async () => {
        let valid = this.checkValidateInput()
        if (valid) {
            this.props.handleRegister({
                "userName": this.state.username,
                "password": this.state.password,
                "email": this.state.email
            })
        }
    }

    componentDidUpdate(preprops, prestates) {
        if (this.props.registerSuccess !== preprops.registerSuccess && this.props.registerSuccess === true) {
            this.toggleSignupModal()
        }

        if (this.props.verify == true) {
            this.props.history.push('/login');
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    toggleSignupModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    componentDidMount() {
        this.props.showPlayer(false)
    }

    render() {
        return (
            <>
                {this.props.isLoading &&
                    <Loader />
                }
                {this.state.isOpenModal && <ConFirmSignUp
                    data={{
                        "username": this.state.username,
                        "password": this.state.password,
                        "email": this.state.email
                    }}
                    toggleFromParent={this.toggleSignupModal}
                    isOpen={this.state.isOpenModal}
                    size="xl"
                    signUp={this.handleSignUp}
                    centered
                ></ConFirmSignUp>}
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>SignUp</div>
                            <div className='col-12 form-group login-input'>
                                <label>UserName: </label>
                                <input onChange={(e) => { this.handleChangeInput(e, "username") }} value={this.state.username} placeholder='Enter your username' type='text' className='form-control'></input>
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password: </label>
                                <div className='custom-input-password'>
                                    <input
                                        onChange={(e) => { this.handleChangeInput(e, "password") }}
                                        value={this.state.password}
                                        placeholder='Enter your password'
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control'></input>
                                    <span onClick={() => { this.handleShowHidePassword() }}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>

                                </div>

                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Email: </label>
                                <input onChange={(e) => { this.handleChangeInput(e, "email") }} value={this.state.email} placeholder='Enter your email' type='text' className='form-control'></input>
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12'>
                                <button onClick={() => { this.handleOnclickSignUp() }} className='btn-login'>SignUp</button>
                            </div>
                            <div className='col-12'>
                                <a className='forgot-password ' href='/login'>Have a account?</a>
                            </div>
                            <div className='col-12 text-center mt-3 '>
                                <span className='text-other-login'>Or login with:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        registerSuccess: state.account.registerSuccess,
        isLoading: state.account.isLoading,
        verify: state.account.verify
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        handleRegister: (data) => dispatch(actions.registerStart(data)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
