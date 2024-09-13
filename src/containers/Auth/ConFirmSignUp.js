import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import * as actions from "../../store/actions";

import './ConFirmSignUp.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/accountService';

class ConFirmSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            errMessage: '',
            otpId: "",
            arrInput: ['', '', '', '', '', '']
        }
    }

    componentDidMount() {
        this.setState({
            email: this.props.data.email,
            username: this.props.data.username,
            password: this.props.data.password,
            otpId: this.props.data.otpId,
        })
    }

    handleInputChange = (index, value) => {
        if (!isNaN(value) && !/[^\d]/.test(value)) {
            const newOtpValues = [...this.state.arrInput];
            newOtpValues[index] = value;
            this.setOtpValues(newOtpValues);
        }

    };

    handleSubmitValidate = () => {
        if (this.state.arrInput.every(value => value.length === 1)) {
            const result = this.state.arrInput.join('');
            console.log(result);
            this.props.verify({
                "userName": this.state.username,
                "password": this.state.password,
                "email": this.state.email,
                "otp":result,
                "otpId":this.state.otpId
            })
        } else {
            alert('Please enter OTP in all fields');
        }
    };

    toggle = () => {
        this.props.toggleFromParent()
    }


    setOtpValues = (arrInput) => {
        this.setState({
            arrInput: [...arrInput]
        })
    }

    render() {
        return (
            <>
                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} centered>
                    <ModalHeader toggle={() => { this.toggle() }} >
                        OTP Verification
                    </ModalHeader>
                    <ModalBody>
                        <div className="container height-100 d-flex justify-content-center align-items-center">
                            <div className="position-relative">
                                <div className="card p-2 text-center">
                                    <h6>
                                        Please enter the one-time password <br />
                                        to verify your account
                                    </h6>
                                    <div>
                                        <span>A code has been sent to</span> <small>{this.state.email}</small>
                                    </div>
                                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                        {this.state.arrInput.map((value, index) => (
                                            <Input
                                                key={index}
                                                className="m-2 text-center rounded"
                                                value={value}
                                                maxLength={1}
                                                onChange={(e) => this.handleInputChange(index, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                    {/* <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                        <Input className="m-2 text-center rounded" maxLength="1" />
                                        <Input className="m-2 text-center rounded" maxLength="1" />
                                        <Input className="m-2 text-center rounded" maxLength="1" />
                                        <Input className="m-2 text-center rounded" maxLength="1" />
                                        <Input className="m-2 text-center rounded" maxLength="1" />
                                        <Input className="m-2 text-center rounded" maxLength="1" />
                                    </div> */}
                                    <div className="mt-4">
                                        <Button color="danger" onClick={() => { this.handleSubmitValidate() }} className="px-4 validate" >Verify</Button>
                                    </div>
                                </div>
                                <div className="card-2">
                                    <div className="content d-flex justify-content-center align-items-center">
                                        {/* <span>Didn't get the code</span>
                                        <a href="#" className="text-decoration-none ms-3">Resend(1/3)</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>{this.toggle()}} color="secondary" >Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        verify :(data) => dispatch(actions.verifyStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConFirmSignUp);
