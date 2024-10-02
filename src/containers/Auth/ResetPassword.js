import React from 'react';
import './ResetPassword.scss';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import HomeHeader from '../HomePage/HomeHeader';
import { push } from "connected-react-router";
import { randomUniqueString } from "../../components/HOC/RandomColor"
import ComfirmChange from './ComfirmChange';
import Loader from '../../components/Loader';

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false,
            message: null,
            otpId: "",
            isOpenModal: false,
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.reqChangePW({
            email: this.state.email,
            otpId: this.state.otpId
        })
    }

    toggleSignupModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    componentDidUpdate(preprops, prestates) {
        if (this.state.isOpenModal !== prestates.isOpenModal) {
            this.setState({
                otpId: randomUniqueString(16)
            })
        }
        if (this.props.reqChangePassword !== preprops.reqChangePassword && this.props.reqChangePassword === true) {
            this.toggleSignupModal()
        }
    }



    componentDidMount() {
        this.setState({
            otpId: randomUniqueString(16)
        })
    }

    render() {
        const { email, message } = this.state;
        const { isLoading } = this.props
        return (
            <>
                <HomeHeader isShowBanner={false} />
                {isLoading == true && <Loader />}
                {this.state.isOpenModal && <ComfirmChange
                    data={{
                        "email": this.state.email,
                        "otpId": this.state.otpId,
                    }}
                    toggleFromParent={this.toggleSignupModal}
                    isOpen={this.state.isOpenModal}
                    size="xl"
                    signUp={this.handleSignUp}
                    centered
                ></ComfirmChange>}
                <div>
                    <div className="password-reset">
                        <h2 className="title">Quên mật khẩu</h2>
                        <p className="description">Nhập email của bạn để nhận mã đặt lại mật khẩu.</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={this.handleEmailChange}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Đang gửi...' : 'Gửi mã đặt lại'}
                            </button>
                            {message && (
                                <p className={`message ${message.type}`}>
                                    {message.text}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoading: state.account.isLoading,
        reqChangePassword: state.account.reqChangePassword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        verify: (data) => dispatch(actions.verifyStart(data)),
        reqChangePW: (data) => dispatch(actions.changePasswordStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);