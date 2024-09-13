import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import "./ModalAddSong.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Loader from '../../../../components/Loader';

class ModalAddSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Image: null,
            Name: '',
            Source: null,
            previewImg: "",
            isOpenPreview: false,
            currentUser: {},
            duration: 0
        };
        this.audioElement = React.createRef();
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
    }

    handleChangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objUrl = URL.createObjectURL(file)
            this.setState({
                Image: file,
                previewImg: objUrl
            })
        }
    }

    handleChangeSource = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objUrl = URL.createObjectURL(file)
            this.setState({
                Source: file,
            })
            this.audioElement.current.src = objUrl;
            this.handleLoadedMetadata()
        }
    }

    handleLoadedMetadata = () => {
        this.setState({ duration: this.audioElement.current.duration });
    };


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentUser !== this.props.currentUser) {
            this.setState({
                currentUser: { ...this.props.currentUser }
            }, () => { })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpenPreview: true
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['Name', "Image", "Source"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter ' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    handleAddNewSong = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.createSong({
                UserId: this.state.currentUser.id,
                Img: this.state.Image,
                Name: this.state.Name,
                Source: this.state.Source,
                Duration: this.state.duration
            }
            )
        }
    }

    componentDidMount() {
        this.props.getCurrentUser()
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    render() {
        let { isLoading } = this.props
        return (
            <>
                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className='modalUserContainer'>
                    <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id="manage-song.add-title"></FormattedMessage></ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label><FormattedMessage id="manage-song.name" /></label>
                                <input value={this.state.Name} type='text' onChange={(e) => { this.handleChangeInput(e, "Name") }} />
                            </div>
                            <div className='input-container'>
                                <label><FormattedMessage id="manage-song.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' hidden type='file' onChange={(e) => { this.handleChangeImage(e) }} />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-song.upload-img" />  <i className="fas fa-upload"></i></label>
                                    <div className='preview-img'
                                        onClick={() => { this.openPreviewImage() }}
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}></div>
                                </div>
                            </div>
                            <div className='input-container'>
                                <label><FormattedMessage id="manage-song.source" /></label>
                                <input type='file' onChange={(e) => { this.handleChangeSource(e) }} />
                            </div>
                        </div>
                        {this.state.isOpenPreview == true &&
                            <Lightbox
                                id="lightbox"
                                mainSrc={this.state.previewImg}
                                onCloseRequest={() => this.setState({ isOpenPreview: false })}
                            />
                        }
                        <audio ref={this.audioElement} onLoadedMetadata={this.handleLoadedMetadata} controls hidden />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className='px-3'
                            color="primary"
                            onClick={() => { this.handleAddNewSong() }}>
                            <FormattedMessage id="manage-song.add" />
                        </Button>
                        <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                            <FormattedMessage id="manage-song.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoading: state.song.isLoading,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddSong);
