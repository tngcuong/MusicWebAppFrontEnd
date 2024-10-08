import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/accountService';
import Loader from '../../components/Loader';
import { KeyCodeUtils } from "../../utils";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        };
        this.acceptBtnRef = React.createRef()
    }

    handleOnchangeusername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleOnclickLogin = async () => {
        this.setState({
            errMessage: ''
        })
        this.props.accountLogin(this.state.username, this.state.password)

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    componentDidMount() {
        this.props.showPlayer(false)
        document.addEventListener('keydown', this.handlerKeyDown);
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            if (!this.acceptBtnRef.current || this.acceptBtnRef.current.disabled) return;
            this.acceptBtnRef.current.click();
        }
    }

    render() {

        return (
            <>
                {this.props.isLoading === true &&
                    <Loader />
                }
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>UserName: </label>
                                <input onChange={(e) => { this.handleOnchangeusername(e) }} value={this.state.username} placeholder='Enter your username' type='text' className='form-control'></input>
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password: </label>
                                <div className='custom-input-password'>
                                    <input
                                        onChange={(e) => { this.handleOnchangePassword(e) }}
                                        value={this.state.password}
                                        placeholder='Enter your password'
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control'></input>
                                    <span onClick={() => { this.handleShowHidePassword() }}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>

                                </div>

                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12'>
                                <button ref={this.acceptBtnRef} onClick={() => { this.handleOnclickLogin() }} className='btn-login'>Login</button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password '>Forgot your password?</span>
                            </div>
                            {/* <div className='col-12 text-center mt-3 '>
                                <span className='text-other-login'>Or login with:</span>
                            </div> */}
                            {/* <div className='col-12 social-login'>
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div> */}
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
        isLoading: state.account.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // navigate: (path) => dispatch(push(path)),
        accountLogin: (username, password) => dispatch(actions.accountLoginStart(username, password)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
