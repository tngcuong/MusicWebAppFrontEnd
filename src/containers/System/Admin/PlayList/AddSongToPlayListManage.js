import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./AddSongToPlayListManage.scss"
import { withRouter } from 'react-router';
import CheckCustom from '../../../Partial/CheckCustom';
import { result } from 'lodash';

class AddSongToPlayListManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: {},
            result: null,
            currentId: "",
            currentPage: 1,
            pageSize: 500,
            pageCount: 1
        };

    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.profile != prevProps.match.params.profile) {
            this.props.getAllSong(this.state.currentPage, this.state.pageSize)
        }

        if (this.props.playlist != prevProps.playlist) {
            this.setState({
                album: { ...this.props.playlist }
            })
        }
    }

    componentDidMount() {
        this.props.getAllSong(this.state.currentPage, this.state.pageSize)
        this.setState({
            album: { ...this.props.playlist },
            result: null
        })
    }

    toggle = () => {
        this.props.toggleFromParent()
        this.setState({
            result: null
        })
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
        this.props.updatePlayList({
            idPlayList: this.state.album.id,
            idSong: this.state.result.map(o => o.id)
        })
        this.setState({
            result: null
        })
        if (this.props.isFailed) {
            this.toggle()
        }
    }

    render() {
        let { isLoading, isLoadingAlbum, songs } = this.props
        let { album, result } = this.state

        return (
            <>
                <div className=''>

                    <Modal className='add-to-list-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Choose the song which you wanna add</ModalHeader>
                        <ModalBody>
                            <div className='add-to-list-content'>
                                <div className='song-list'>
                                    {songs && songs.length > 0 && songs.map((item, index) => {
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
                                                        result={result}
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
        isFailed: state.album.isFailed,
        songs: state.song.songs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRelatedSong: (userId) => dispatch(actions.getRelatedSongStart(userId)),
        updatePlayList: (data) => dispatch(actions.AddSongToAlbumStart(data)),
        getAllSong: (pageIndex, pageSize) => dispatch(actions.fetchSongStart(pageIndex, pageSize)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSongToPlayListManage));
