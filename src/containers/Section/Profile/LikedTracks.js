import React, { Component } from 'react';
import "./LikedTracks.scss";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import moment from 'moment';
import Loader from "../../../components/Loader";
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'
import LikeSong from '../../Partial/LikeSong';
import CountLiked from '../../Partial/CountLiked';
import { calcuDate } from '../../../components/HOC/RandomColor';
import { withRouter } from 'react-router';
import { getLikedSongByUserId } from '../../../services/songService';
import DeteleSongBtn from './Partial/DeteleSongBtn';

class LikedTracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentSong: [],
            isClick: false,
        }
    }

    async componentDidMount() {
        await this.getRecentSong(this.props.match.params.profile)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.profile !== prevProps.match.params.profile) {
            await this.getRecentSong(this.props.match.params.profile)
        }

        if (this.props.isLiked !== prevProps.isLiked) {
            await this.getRecentSong(this.props.match.params.profile)
        }
    }

    getRecentSong = async (id) => {
        try {
            let data = await getLikedSongByUserId(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                this.setState({
                    recentSong: [...data.content.listSong]
                })
            } else {
                console.log("get liked song error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { recentSong } = this.state
        const { currentUser } = this.props
        const idUser = this.props.match.params.profile

        const hasSongs = (recentSong && recentSong.length > 0);

        if (!hasSongs) {
            return (
                <div className="profile-all">
                    <div className="no-songs-message">No songs found</div>
                </div>
            );
        }
        return (
            <div className="profile-liked-tracks">
                <div className='spotlight'>
                    <div className='spotlight-header'>
                        <h2>Liked Tracks</h2>
                    </div>
                    <div className='spotlight-content'>
                        {
                            recentSong && recentSong.length > 0 &&
                            recentSong.map((item, index) => {
                                return (
                                    <div className='content' key={item.id}>
                                        <div className='image' style={{
                                            backgroundImage: `url("${item.image}")`,
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
                                                <div className='chat'>

                                                </div>
                                            </div>
                                            <div className='actions'>
                                                <div className='actions-container'>
                                                    <div className='like' >
                                                        <LikeSong
                                                            idSong={item.id}
                                                        ></LikeSong>
                                                        <div><CountLiked idSong={item.id}></CountLiked></div>
                                                    </div>
                                                    {item.userId === currentUser.id
                                                        && idUser === currentUser.id
                                                        && <DeteleSongBtn idSong={item.id} />}
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
        isLiked: state.song.isLiked
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LikedTracks)));