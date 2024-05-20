import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./EditProfile.scss"
import { updateProfile } from "../../../../services/accountService"

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Image: null,
            userProfile: {},
            previewImg: ""
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentUser !== prevProps.currentUser) {
            this.setState({
                userProfile: { ...this.props.currentUser },
                Image: this.props.currentUser.image
            })
        }
    }


    componentDidMount() {
        this.setState({
            userProfile: { ...this.props.currentUser }
        })
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    updateProfile = () => {
        let { userProfile } = this.state
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.updateInfo({
                id: userProfile.id,
                img: this.state.Image,
                name: userProfile.name,
                description: userProfile.description
            }
            )
        }
        if (this.props.isFailded === false) {
            this.toggle()
        }
    }

    handleChangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        let objUrl = URL.createObjectURL(file)
        if (file) {
            this.setState({
                Image: file,
                previewImg: objUrl
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['name', "description"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.userProfile[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleChangeInfo = (event, id) => {
        let copyState = { ...this.state.userProfile }
        copyState[id] = event.target.value
        this.setState({
            userProfile: { ...copyState }
        })
    }


    render() {
        let { isLoading } = this.props
        let { userProfile, Image, previewImg } = this.state
        return (
            <>
                <div >
                    <Modal className='upload-profile-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Edit your Profile</ModalHeader>
                        <ModalBody>
                            <div className='edit-profile-container'>
                                <div className='edit-profile'>
                                    <div className='edit-profile-avatar'>
                                        <div className='edit-profile-avatar-container'>
                                            <div className='avatar-display' style={{
                                                backgroundImage: `url("${previewImg == "" ? userProfile.avatar : previewImg}")`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}>

                                            </div>
                                            <label className='lb-upload-avatar' htmlFor='edit-upload-avatar'><i className="fas fa-camera"></i> Upload avatar </label>
                                            <input
                                                onChange={(e) => { this.handleChangeImage(e) }}
                                                id='edit-upload-avatar'
                                                type='file'
                                                accept='image/jpeg,image/pjpeg,image/gif,image/png'
                                                hidden></input>
                                        </div>
                                    </div>

                                    <div className='edit-profile-info'>
                                        <div className='edit-profile-info-container'>
                                            <div className='edit-display-name'>
                                                <label
                                                    className='lb-upload-display-name'
                                                    htmlFor='upload-display-name'
                                                >Display name</label>
                                                <div>
                                                    <input
                                                        id='upload-display-name'
                                                        type='text'
                                                        value={userProfile.name}
                                                        onChange={(e) => { this.handleChangeInfo(e, "name") }}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className='edit-bio'>
                                                <label
                                                    className='lb-upload-bio'
                                                    htmlFor='upload-bio'

                                                >Bio</label>
                                                <div>
                                                    {userProfile.description ? <textarea
                                                        id='upload-bio'
                                                        type='text'
                                                        value={userProfile.description}
                                                        onChange={(e) => { this.handleChangeInfo(e, "description") }}
                                                    ></textarea> : <textarea
                                                        id='upload-bio'
                                                        type='text'
                                                        value={userProfile.description}
                                                        placeholder='Tell the world a little bit about yourself. The shorter is the better'
                                                        onChange={(e) => { this.handleChangeInfo(e, "description") }}
                                                    ></textarea>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={() => { this.updateProfile() }}>
                                Save changes
                            </Button>{' '}
                            <Button color="secondary" onClick={() => { this.toggle() }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoading: state.song.isLoading,
        isFailded: state.account.isApiFailded

    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteAlbum: (id) => dispatch(actions.deletePlayListStart(id)),
        updateInfo: (info) => dispatch(actions.updateInfoStart(info))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
