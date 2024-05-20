import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./UploadSongPage.scss"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UploadSongPage extends Component {
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



    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentUser !== prevProps.currentUser) {
            this.setState({
                currentUser: { ...this.props.currentUser },
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpenPreview: true
        })
    }


    componentDidMount() {
        this.setState({
            idSong: this.props.idSong
        })
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    deleteSong = () => {
        this.props.deleteSong(this.props.idSong)
        this.toggle()
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

    handleLoadedMetadata = () => {
        this.setState({ duration: this.audioElement.current.duration });
    };


    render() {
        let { isLoading } = this.props
        let { idSong } = this.state
        return (
            <>
                <div className='upload-song-container'>
                    <div className='input-container'>
                        <label><FormattedMessage id="manage-song.name" /></label>
                        <div className='song-name'>
                            <input value={this.state.Name} type='text' onChange={(e) => { this.handleChangeInput(e, "Name") }} />
                        </div>

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
                        <div>
                            <input type='file' onChange={(e) => { this.handleChangeSource(e) }} />
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

                <audio ref={this.audioElement} onLoadedMetadata={this.handleLoadedMetadata} controls hidden />
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoading: state.song.isLoading,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (id) => dispatch(actions.deleteSongStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSongPage);
