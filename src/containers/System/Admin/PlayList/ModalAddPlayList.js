import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./ModalAddPlayList.scss"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class ModalAddPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Image: null,
            Name: '',
            previewImg: "",
            isOpenPreview: false,
            namePlaylist: "",
            thumbnailPlaylist: ""
        };
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
        this.setNamePlaylist(copyState[id])
    }

    checkValidatePlaylistInput = () => {
        let isValid = true
        let arrInput = ["namePlaylist", 'thumbnailPlaylist']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter ' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    setNamePlaylist = (name) => {
        this.setState({
            namePlaylist: name,
        })

    }

    setImagePlaylist = (img) => {
        this.setState({
            thumbnailPlaylist: img
        })
    }

    uploadPlaylist = () => {
        let isValid = this.checkValidatePlaylistInput()
        if (isValid) {
            this.props.uploadPlaylist({
                id: this.props.currentUser.id,
                img: this.state.thumbnailPlaylist,
                name: this.state.namePlaylist,
            }
            )
        }
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
            this.setImagePlaylist(file)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isFailed != prevProps.isFailed) {
            this.setState({
                Image: null,
                Name: "",
                previewImg: "",

            })
        }
    }


    componentDidMount() {

    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpenPreview: true
        })
    }


    toggle = () => {
        this.props.toggleFromParent()
    }

    render() {
        let { isLoading } = this.props
        return (
            <>
                <Modal className='upload-modal-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                    <ModalHeader toggle={() => { this.toggle() }}>Choose the thing what you wanna upload</ModalHeader>
                    <ModalBody>
                        {isLoading === true && <Loader></Loader>}
                        <div className='upload-playlist-container' style={{ margin: "30px" }}>
                            <div className='input-container'>
                                <label><FormattedMessage id="manage-song.name" /></label>
                                <div className='playlist-name'>
                                    <input value={this.state.Name} type='text' onChange={(e) => { this.handleChangeInput(e, "Name") }} />
                                </div>

                            </div>
                            <div className='input-container'>
                                <label><FormattedMessage id="manage-song.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImgPlaylist' hidden type='file' onChange={(e) => { this.handleChangeImage(e) }} />
                                    <label className='label-upload' htmlFor='previewImgPlaylist'><FormattedMessage id="manage-song.upload-img" />  <i className="fas fa-upload"></i></label>
                                    <div className='preview-img'
                                        onClick={() => { this.openPreviewImage() }}
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}></div>
                                </div>
                            </div>
                        </div>
                        {this.state.isOpenPreview == true &&
                            <Lightbox
                                id="lightbox"
                                mainSrc={this.state.previewImg}
                                onCloseRequest={() => this.setState({ isOpenPreview: false })}
                            />
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            <Button color="danger" onClick={() => { this.uploadPlaylist() }}>
                                Upload Playlist
                            </Button>
                        }
                        {' '}
                        <Button color="secondary" onClick={() => { this.toggle() }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isFailed: state.album.isFailed,
        isLoading: state.album.isLoading,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadPlaylist: (playlist) => dispatch(actions.uploadPlaylistStart(playlist)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddPlayList);
