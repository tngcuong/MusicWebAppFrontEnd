import React, { Component } from 'react';
import "./PlayLists.scss";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import moment from 'moment';
import Loader from "../../../components/Loader";
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'
import LikePlayList from '../../Partial/LikePlayList';
import CountLikedPLayList from '../../Partial/CountLikedPLayList';
import { calcuDate } from '../../../components/HOC/RandomColor';
import { withRouter } from 'react-router';
import { getDetailAlbumByUserId } from '../../../services/albumService';
import CustomScrollbars from '../../../components/CustomScrollbars'
import DeleteAlbumBtn from './Partial/DeleteAlbumBtn';

class PlayLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentPLayList: [],
            isClick: false,
        }
    }

    async componentDidMount() {
        await this.getRecentPlaylist(this.props.match.params.profile)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.profile !== prevProps.match.params.profile) {
            await this.getRecentPlaylist(this.props.match.params.profile)
        }

        if (this.props.isLiked !== prevProps.isLiked) {
            await this.getRecentPlaylist(this.props.match.params.profile)
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

    render() {
        const { recentPLayList } = this.state
        const { currentUser } = this.props
        const idUser = this.props.match.params.profile
        return (
            <div className="profile-playLists">
                <div className='spotlight'>
                    <div className='spotlight-header'>
                        <h2>PlayLists</h2>
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
                                                    <div className='play-btn'>
                                                        <div className='play'>
                                                            <i className="fas fa-play-circle"></i>
                                                        </div>
                                                    </div>
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
                                                                                    backgroundImage: `url("${subItem.image}")`,
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
                                                    <div className='like' >
                                                        <LikePlayList
                                                            idPlayList={item.id}
                                                        ></LikePlayList>
                                                        <div><CountLikedPLayList idPlayList={item.id}></CountLikedPLayList></div>
                                                    </div>
                                                    <div className='update'>
                                                        <div className='btn-update'>
                                                            <i className="far fa-edit"></i>
                                                        </div>
                                                    </div>
                                                    {idUser === currentUser.id && <DeleteAlbumBtn idAlbum={item.id} />}
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
        );
    }
}

const mapStateToProps = state => {
    return {
        song: state.song.currentSong,
        isPlaying: state.song.isPlaying,
        currentAlbum: state.album.currentAlbum,
        isFirstMount: state.song.firstMount,
        isShowPlayer: state.song.isShowPlayer,
        currentUser: state.user.currentUser,
        isLiked: state.album.isLiked
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        firstMount: () => dispatch(actions.firstMount()),
        likeSong: (idUser, idSong) => dispatch(actions.likeSongStart(idUser, idSong)),
        unLikeSong: (idUser, idSong) => dispatch(actions.unLikeSongStart(idUser, idSong)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(PlayLists)));