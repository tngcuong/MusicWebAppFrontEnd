import React, { Component } from 'react';
import "./All.scss";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import moment from 'moment';
import Loader from "../../../components/Loader";
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'
import { top5likedSong } from '../../../services/songService';
import { calcuDate } from '../../../components/HOC/RandomColor';
import WaveSurfer from "wavesurfer.js";
import LikeSong from '../../Partial/LikeSong';
import CountLiked from '../../Partial/CountLiked';
import { withRouter } from 'react-router';

import { getSongDesByUserId } from '../../../services/songService';

class All extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Top5LikedSong: [],
            waveformRef: React.createRef(),
            wavesurfer: React.createRef(),
            isClick: false,
            recentSong: [],
            pageIndexRecent: 1,
            pageSize: 5
        }
    }


    async componentDidMount() {
        this.props.getTop5LikedSong(this.props.match.params.profile)
        await this.getRecentSong(this.props.match.params.profile, this.state.pageIndexRecent, this.state.pageSize)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.profile !== prevProps.match.params.profile) {
            this.props.getTop5LikedSong(this.props.match.params.profile)
            await this.getRecentSong(this.props.match.params.profile, this.state.pageIndexRecent, this.state.pageSize)
        }

        if (this.props.isLiked !== prevProps.isLiked) {
            this.props.getTop5LikedSong(this.props.match.params.profile)
        }
    }

    getRecentSong = async (id, pageIndexRecent, pageSize) => {
        try {
            let data = await getSongDesByUserId(id, pageIndexRecent, pageSize)
            console.log(data);
            if (data && data.errorCode === 200) {
                this.setState({
                    recentSong: [...data.content.data]
                })
            } else {
                console.log("get recent song error");
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        const { waveformRef, isClick, recentSong } = this.state
        const { top5likedSong } = this.props

        return (
            <div className="profile-all">
                <div className='spotlight'>
                    <div className='spotlight-header'>
                        <h2>Spotlight</h2>
                    </div>
                    <div className='spotlight-content'>
                        {
                            top5likedSong && top5likedSong.length > 0 &&
                            top5likedSong.map((item, index) => {
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className='recent'>
                    <div className='recent-header'>
                        <h2>Recent</h2>
                    </div>
                    <div className='recent-content'>
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
        profileUser: state.user.user,
        top5likedSong: state.song.top5likedSong,
        isLiked: state.song.isLiked
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        getTop5LikedSong: (idUser) => dispatch(actions.getTop5LikedSongStart(idUser))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(All)));