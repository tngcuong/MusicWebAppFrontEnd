import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./UploadPage.scss"
import UploadSongPage from './UploadSongPage';
import UploadPlaylistPage from './UploadPlaylistPage';

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: true,
            playlist: false,
            imgSong: null,
            sourceSong: null,
            nameSong: "",
            namePlaylist: "",
            thumbnailPlaylist: null,
        };

    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentUser != prevProps.currentUser) {

        }

    }

    handleChangePage = (id) => {
        let state = { ...this.state };
        let i = 1;
        state[id] = true;
        Object.keys(state).forEach(key => {
            if (key !== id && i <= 2) {
                state[key] = false;
            }
            i += 1;
        });
        this.setState({ ...state });

    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    uploadSong = () => {

    }

    setSongImg = (img) => {
        this.setState({
            imgSong: img,
        })
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

    setSongSource = (source) => {
        this.setState({
            sourceSong: source,
        })
    }

    setSongName = (name) => {
        this.setState({
            nameSong: name
        })
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

    checkValidateSongInput = () => {
        let isValid = true
        let arrInput = ["nameSong", 'imgSong', "sourceSong"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter ' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    uploadSong = () => {
        let isValid = this.checkValidateSongInput()
        if (isValid) {
            this.props.uploadSong({
                UserId: this.props.currentUser.id,
                Img: this.state.imgSong,
                Name: this.state.nameSong,
                Source: this.state.sourceSong,
            }
            )
        }
    }

    render() {
        let { isLoading, isLoadingAlbum } = this.props
        let { song, playlist } = this.state
        return (
            <>
                <div>

                    <Modal className='upload-modal-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Choose the thing what you wanna upload</ModalHeader>
                        <ModalBody>
                            {(isLoading === true || isLoadingAlbum === true) && <Loader />}
                            <div className='upload-container'>
                                <div className='upload'>
                                    <ul className='upload-list-item'>
                                        <li className={song === true ? "m-active" : ""} onClick={() => { this.handleChangePage("song") }}>Song</li>
                                        <li className={playlist === true ? "m-active" : ""} onClick={() => { this.handleChangePage("playlist") }}>Playlist</li>
                                    </ul>
                                </div>
                                <div className='upload-content'>
                                    <div className='profile-content'>
                                        <div className='profile-content-left'>
                                            {
                                                song === true && <UploadSongPage
                                                    setSongImg={this.setSongImg}
                                                    setSongSource={this.setSongSource}
                                                    setSongName={this.setSongName}
                                                />
                                            }
                                            {
                                                playlist === true && <UploadPlaylistPage
                                                    setImgPlaylist={this.setImagePlaylist}
                                                    setNamePlaylist={this.setNamePlaylist}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {
                                song === true ?
                                    <Button color="danger" onClick={() => { this.uploadSong() }}>
                                        Upload Song
                                    </Button> :
                                    <Button color="danger" onClick={() => { this.uploadPlaylist() }}>
                                        Upload Playlist
                                    </Button>
                            }
                            {' '}
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
        isFailed: state.song.isFailed,
        isLoading: state.song.isLoading,
        currentUser: state.user.currentUser,
        isLoadingAlbum: state.album.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadSong: (song) => dispatch(actions.uploadSongStart(song)),
        uploadPlaylist: (playlist) => dispatch(actions.uploadPlaylistStart(playlist)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
