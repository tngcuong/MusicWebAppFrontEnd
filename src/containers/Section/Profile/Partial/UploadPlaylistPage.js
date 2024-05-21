import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./UploadPlaylistPage.scss"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UploadPlaylistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Image: null,
            Name: '',
            previewImg: "",
            isOpenPreview: false,
        };
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
        this.props.setNamePlaylist(copyState[id])
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
            this.props.setImgPlaylist(file)
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
                <div className='upload-playlist-container'>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPlaylistPage);
