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
            duration: 0,

        };
        this.audioElement = React.createRef();
        this.audio = React.createRef()
    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.isFailed != prevProps.isFailed) {
            
            this.setState({
                Image: null,
                Source: null,
                Name: "",
                previewImg: "",
               
            })
            this.audio.current.value = null
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpenPreview: true
        })
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
        this.props.setSongName(copyState[id])
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
            this.props.setSongImg(file)
        }
    }

    handleChangeSource = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objUrl = URL.createObjectURL(file)
            this.setState({
                Source: file,
            })
            this.audioElement.current.src = objUrl;
            await this.handleLoadedMetadata()
            this.props.setSongSource(file, this.state.duration)
        }
    }

    handleLoadedMetadata = async () => {
        this.setState({ duration: this.audioElement.current.duration });
    };


    render() {
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
                            <input ref={this.audio} type='file' onChange={(e) => { this.handleChangeSource(e) }} />
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
        isFailed: state.song.isFailed,
        isLoading: state.song.isLoading,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSongPage);
