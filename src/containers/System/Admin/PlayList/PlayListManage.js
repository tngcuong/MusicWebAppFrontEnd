import React, { Component } from 'react';
import "./PlayListManage.scss";
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import moment from 'moment';
import Loader from "../../../../components/Loader";
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'
import { calcuDate } from '../../../../components/HOC/RandomColor';
import { withRouter } from 'react-router';
import { getDetailAlbumByUserId } from '../../../../services/albumService';
import CustomScrollbars from '../../../../components/CustomScrollbars'
import DeleteAlbumBtn from '../../../Section/Profile/Partial/DeleteAlbumBtn';
import AddSongToPlayListManage from './AddSongToPlayListManage';
import ModalAddPlayList from './ModalAddPlayList';

class PlaylistManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentPLayList: [],
            isClick: false,
            isOpenEditModal: false,
            selectedItem: "",
            currentPage: 1,
            pageSize: 5,
            pageCount: 1,
            isOpenModal: false
        }
    }

    async componentDidMount() {
        await this.props.getAllAlbums(this.state.currentPage, this.state.pageSize)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.albums !== this.props.albums) {
            this.setState({
                recentPLayList: [...this.props.albums]
            })
        }

        if (this.props.isLiked !== prevProps.isLiked || this.props.isFailed !== prevProps.isFailed) {
            await this.props.getAllAlbums(this.state.currentPage, this.state.pageSize)
        }
    }

    getRecentPlaylist = async (id) => {
        try {
            let data = await getDetailAlbumByUserId(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                this.setState({
                    recentPLayList: [...data.content]
                })
            } else {
                console.log("get liked song error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    openEditModal = (id) => {
        this.setState({
            isOpenEditModal: true,
            selectedItem: id
        })
    }

    toggleEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    handleAddNewPlayList = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUploadModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    render() {
        const { recentPLayList, selectedItem } = this.state
        const { currentUser, isLoading } = this.props

        return (
            <>
                {isLoading == true && <Loader />}
                {this.state.isOpenModal && <ModalAddPlayList
                    toggleFromParent={this.toggleUploadModal}
                    isOpen={this.state.isOpenModal}
                    size="xl"
                    createSong={this.createNewSong}
                    centered
                ></ModalAddPlayList>}
                <div className="profile-playLists-manage">
                    <div className='spotlight'>
                        <div className='spotlight-header title text-center'>
                            <h2>Playlist Manage</h2>
                        </div>
                        <div className='mx-1'>
                            <button
                                onClick={() => { this.handleAddNewPlayList() }}
                                className='btn btn-primary px-3'><i className="fas fa-user-plus"></i></button>
                        </div>
                        <div className='spotlight-content'>
                            {
                                recentPLayList && recentPLayList.length > 0 &&
                                recentPLayList.map((item, index) => {
                                    return (
                                        <div className='content' key={item.id}>
                                            <div className='image' style={{
                                                backgroundImage: `url("${item.thumbnail}")`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}>

                                            </div>
                                            <div className='details'>
                                                <div className='sound-title'>
                                                    <div className='sound-header'>
                                                        {/* <div className='play-btn'>
                                                            <div className='play'>
                                                                <i className="fas fa-play-circle"></i>
                                                            </div>
                                                        </div> */}
                                                        <div className='name'>
                                                            <div className='artist'>
                                                                <a href=''>{item.user?.name}</a>
                                                            </div>
                                                            <a className='name-song'>{item.name}</a>
                                                        </div>
                                                        <div className='time-make'>
                                                            <span>{calcuDate(item.createAt)} ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='sound-wave'>
                                                    {item.songList && item.songList.length > 0 &&
                                                        <CustomScrollbars>
                                                            <div className='list-song'>
                                                                <div className='sub-list-song'>
                                                                    {item.songList && item.songList.length > 0
                                                                        && item.songList.map((subItem, subIndex) => {
                                                                            return (
                                                                                <div className='song' key={subItem.id}>
                                                                                    <div className='img-song' style={{
                                                                                        backgroundImage: `url("${subItem.image == null ? "" : subItem.image}")`,
                                                                                        backgroundPosition: 'center center',
                                                                                        backgroundSize: 'cover',
                                                                                        backgroundRepeat: 'no-repeat'
                                                                                    }}></div>
                                                                                    <span className='number-song'>{subIndex + 1}</span>
                                                                                    <div className='info'>
                                                                                        <div className='artist-name'>{subItem.user?.name} </div>
                                                                                        <span> - </span>
                                                                                        <div className='song-name'> {subItem.name}</div>
                                                                                    </div>

                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            </div>
                                                        </CustomScrollbars>
                                                    }

                                                </div>
                                                <div className='actions'>
                                                    <div className='actions-container'>
                                                        {/* <div className='like' >
                                                        <LikePlayList
                                                            idPlayList={item.id}
                                                        ></LikePlayList>
                                                        <div><CountLikedPLayList idPlayList={item.id}></CountLikedPLayList></div>
                                                    </div> */}

                                                        <div className='update'>
                                                            <div className='btn-update' onClick={() => { this.openEditModal(item.id) }}>
                                                                <i className="far fa-edit"></i>

                                                            </div>
                                                        </div>

                                                        {this.state.isOpenEditModal === true && selectedItem == item.id && <AddSongToPlayListManage
                                                            toggleFromParent={this.toggleEditModal}
                                                            playlist={item}
                                                            isOpen={this.state.isOpenEditModal}
                                                            size="xl"
                                                            centered
                                                        ></AddSongToPlayListManage>}
                                                        <DeleteAlbumBtn idAlbum={item.id} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )

                                })

                            }

                        </div>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        song: state.song.currentSong,
        isPlaying: state.song.isPlaying,
        currentAlbum: state.album.currentAlbum,
        isShowPlayer: state.song.isShowPlayer,
        currentUser: state.user.currentUser,
        isLiked: state.album.isLiked,
        isFailed: state.album.isFailed,
        albums: state.album.albums,
        isLoading: state.album.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        likeSong: (idUser, idSong) => dispatch(actions.likeSongStart(idUser, idSong)),
        unLikeSong: (idUser, idSong) => dispatch(actions.unLikeSongStart(idUser, idSong)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
        getAllAlbums: (pageIndex, pageSize) => dispatch(actions.fetchAlbumStart(pageIndex, pageSize))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(PlaylistManage)));