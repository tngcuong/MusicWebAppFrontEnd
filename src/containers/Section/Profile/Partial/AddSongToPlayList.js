import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./AddSongToPlayList.scss"
import UploadSongPage from './UploadSongPage';
import UploadPlaylistPage from './UploadPlaylistPage';
import { withRouter } from 'react-router';
import CheckCustom from '../../../Partial/CheckCustom';

class AddSongToPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: {},
            result: [],
            currentId: ""
        };

    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.profile != prevProps.match.params.profile) {
            this.props.getRelatedSong(this.props.match.params.profile)
        }

        if (this.props.playlist != prevProps.playlist) {
            this.setState({
                album: { ...this.props.playlist }
            })
        }
    }

    componentDidMount() {
        this.props.getRelatedSong(this.props.match.params.profile)
        this.setState({
            album: { ...this.props.playlist }
        })
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    setIdPlaylist = (id) => {
        this.setState({
            currentId: id
        })
    }

    updatePlayList = (data) => {
        this.setState({
            result: [...data]
        })
    }

    handleUpdatePlayList = () => {
        console.log(this.state.currentId);
        this.props.updatePlayList({
            idPlayList: this.state.currentId,
            idSong: this.state.result
        })
    }

    render() {
        let { isLoading, isLoadingAlbum, relatedSong } = this.props
        let { album } = this.state

        return (
            <>
                <div className=''>

                    <Modal className='add-to-list-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Choose the song which you wanna add</ModalHeader>
                        <ModalBody>
                            <div className='add-to-list-content'>
                                <div className='song-list'>
                                    {relatedSong && relatedSong.length > 0 && relatedSong.map((item, index) => {
                                        return (
                                            <div key={index} className='related-song'>
                                                <span className='number-song'>{index + 1}</span>
                                                <div className='img-song' style={{
                                                    backgroundImage: `url("${item.image}")`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></div>

                                                <div className='info'>
                                                    <div className='artist-name'>{item.user?.name} </div>
                                                    <span> - </span>
                                                    <div className='song-name'> {item.name}</div>
                                                </div>
                                                <div className='selected'>
                                                    <CheckCustom
                                                        item={item}
                                                        playlist={album}
                                                        updatePlayList={this.updatePlayList}
                                                        setIdPlaylist={this.setIdPlaylist}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>

                            <Button color="danger" onClick={() => { this.handleUpdatePlayList() }}>
                                Save changes
                            </Button>
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
        isLoadingAlbum: state.album.isLoading,
        relatedSong: state.song.relatedSong
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRelatedSong: (userId) => dispatch(actions.getRelatedSongStart(userId)),
        updatePlayList: (data) => dispatch(actions.AddSongToAlbumStart(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSongToPlayList));
