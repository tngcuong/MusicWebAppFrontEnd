import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
            playlist: false
        };

    }



    componentDidUpdate(prevProps, prevState) {

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

    setSongData = (data) => {
        this.setState({ songData: data });
    }

    uploadPlaylist = () => {
    }

    render() {
        let { isLoading } = this.props
        let { song, playlist } = this.state
        return (
            <>
                <div>
                    {isLoading === true && <Loader />}
                    <Modal className='upload-modal-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Choose the thing what you wanna upload</ModalHeader>
                        <ModalBody>
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
                                                song === true && <UploadSongPage setSongData={this.setSongData} />
                                            }
                                            {
                                                playlist === true && <UploadPlaylistPage />
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
                                        Upload
                                    </Button> :
                                    <Button color="danger" onClick={() => { this.uploadPlaylist() }}>
                                        Upload
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
        isLoading: state.song.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadSong: (song) => dispatch(actions.uploadSongStart(song)),
        uploadPlaylist: (playlist) => dispatch(actions.uploadPlaylistStart(playlist)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
