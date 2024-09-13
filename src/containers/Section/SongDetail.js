import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';

import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../components/CustomScrollbars';
import HomeFooter from '../HomePage/HomeFooter';
import MusicPlayer from '../Partial/MusicPlayer';
import CountLiked from '../Partial/CountLiked';
import LikeSong from '../Partial/LikeSong';
import LikePlayList from '../Partial/LikePlayList';
import FollowBtn from '../Partial/FollowBtn';
import { getRandomColor, totalTime, calcuDate } from '../../components/HOC/RandomColor';
import Comment from './Comment';
import { toast } from 'react-toastify';
import NameUser from '../Partial/NameUser';
import NameSong from '../Partial/NameSong';

import "./SongDetail.scss";

class SongDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailSong: {},
            bg: "",
            totalSong: 0,
            totalTime: 0,
            createAt: "",

        }
    }

    componentDidMount() {
        this.props.showPlayer(true)
        this.props.getDetailSong(this.props.match.params.id)
    }


    componentDidUpdate(preProps, prevState) {
        if (this.props.detailSong != preProps.detailSong) {
            this.setState({
                detailSong: { ...this.props.detailSong },
                bg: getRandomColor(),
                totalSong: this.props.detailSong.songList ? this.props.detailSong.songList.length : 0,
                totalTime: totalTime(this.props.detailSong.songList),
                createAt: calcuDate(this.props.detailSong.createAt)
            }, () => {
                this.props.getAlbumByUserId(this.state.detailSong?.createById)
                this.props.getSongByUserId(this.state.detailSong?.userId, 1, 3)
            })
        }

        if (this.props.userAlbums != preProps.userAlbums) {
            this.setState({
                userAlbums: [...this.props.userAlbums]
            })
        }

        if (this.props.match.params.id != preProps.match.params.id) {
            this.props.getDetailSong(this.props.match.params.id)
        }
    }

    handleViewAll = (id) => {
        this.props.history.push(`/profile/${id}`)
    }

    handleAddSongToCurrentPlaylist = () => {
        const { currentAlbum, intl } = this.props
        const { detailSong } = this.state
        if (currentAlbum.some(song => song.id === detailSong.id)) {
            toast.info(intl.formatMessage(
                { id: 'song-detail.add-already' }
            ));
        } else {
            this.props.addSongToCurrentPlaylist(detailSong);
            toast.success(intl.formatMessage(
                { id: 'song-detail.add-success' }
            ));
        }

    }

    playSong = async () => {
        let { isPlaying, currentSong } = this.props;
        const { detailSong } = this.state
        if (JSON.stringify(this.props.currentSong) !== JSON.stringify(detailSong)) {
            this.props.setCurrentSong(detailSong);
        } else {
            this.props.playSong(!isPlaying);
        }
    };

    render() {
        let { detailSong } = this.state

        let { songDes, intl, currentSong } = this.props
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='song-detail-container'>
                    <div className='album-banner' style={{
                        // backgroundImage: `url("${detailSong.thumbnail}")`,
                        // backgroundPosition: 'center center',
                        // backgroundSize: 'cover',
                        // backgroundRepeat: 'no-repeat'
                        background: "" + this.state.bg + ""
                    }}>
                        <div className='album-banner-left'>

                            <div className='album-info-up'>
                                <div className='play'>{
                                    this.props.isPlaying == true && currentSong.id == detailSong.id ?
                                        <i className="fas fa-pause-circle" onClick={() => { this.playSong() }}></i> :
                                        <i className="fas fa-play-circle" onClick={() => { this.playSong() }}></i>
                                }</div>
                                <div className='title-artist'>
                                    <div className='title'>&ensp;{detailSong.name}</div>
                                    <div className='artist'>&ensp; By {detailSong.user && detailSong.user.name} &ensp;</div>
                                </div>
                            </div>
                            {/* <div className='album-info-down'>
                                <div className='song-count'>
                                    <p className='total-song'>{this.state.totalSong} </p>
                                    {this.state.totalSong > 1 ? <p>Tracks</p> : <p>Track</p>}
                                </div>
                                <div className='total-time'>
                                    {this.state.totalTime <= 36000 ? moment.utc(this.state.totalTime * 1000).format("mm:ss")
                                        : moment.utc(this.state.totalTime * 1000).format('HH:mm:ss')}
                                </div>
                            </div> */}
                        </div>
                        <div className='album-banner-center'>
                            <div className='create-at'>
                                <p>{this.state.detailSong.createAt &&
                                    this.state.createAt + " ago"

                                }</p>
                            </div>
                        </div>
                        <div className='album-banner-right'>
                            <div className='album-thumbnail' style={{
                                backgroundImage: `url("${detailSong.image}")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>

                            </div>
                        </div>
                    </div >
                    <div className='actions'>
                        <div className='actions-container'>
                            <div className='like' >
                                <LikeSong
                                    idSong={this.props.match.params.id}
                                ></LikeSong>
                                <div><CountLiked idSong={this.props.match.params.id}></CountLiked></div>
                            </div>
                            <div className='add'
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyMHYyMEgweiIvPgogICAgICAgIDxwYXRoIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNCA5aDEwdjJINFY5em0wIDRoMTB2Mkg0di0yem0wLThoOHYySDRWNXptMTAtNGw0IDMtNCAzVjF6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'contain'
                                }}
                                onClick={() => { this.handleAddSongToCurrentPlaylist() }}
                            >
                            </div>
                            <a className='download' href={detailSong.source} download>
                                <i className="far fa-arrow-alt-circle-down"></i>
                            </a>

                        </div>

                    </div>
                    <div className='content'>
                        <div className='left-content'>
                            <div className='album-info-avatar' style={{
                                backgroundImage: `url("${detailSong.user && detailSong.user.avatar}")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>

                            </div>
                            <div className='album-info-name'>
                                {detailSong.user && <NameUser user={detailSong.user} />}
                            </div>
                            <div className='album-info-quantity'>
                            </div>
                            {
                                this.props.currentUser.id !== detailSong.userId &&
                                <FollowBtn idUser={detailSong.userId} />
                            }

                        </div>
                        <div className='middle-content'>
                            <Comment songId={this.props.match.params.id} />
                        </div>
                        <div className='right-content'>
                            <div className='list-liked-song'>
                                <div className='liked-song-stat'>
                                    <a className='link-liked-song'>
                                        <div>
                                            <span> {intl.formatMessage({ id: 'song-detail.another-song' })}</span>
                                        </div>
                                        <span className='view-all' onClick={() => { this.handleViewAll(detailSong.user.id) }}>{intl.formatMessage({ id: 'song-detail.view-all' })}</span>
                                    </a>
                                </div>
                                <div className='list'>
                                    {songDes.length && songDes.length > 0 &&
                                        songDes.slice(0, 3).map((item, index) => {
                                            return (
                                                <div className='liked-song' key={item.id}>
                                                    <div className='liked-song-img'>
                                                        <div className='img' style={{
                                                            backgroundImage: `url("${item.image}")`,
                                                            backgroundPosition: 'center center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}>
                                                        </div>
                                                    </div>
                                                    <div className='details'>
                                                        <div className='name'>
                                                            <p className='artist-name'>{item.user?.name && <NameUser user={item.user} />}</p>
                                                            <p className='song-name'>{item.name && <NameSong song={item} />}</p>
                                                        </div>
                                                        <div className='count-like'>
                                                            <i className="fas fa-heart"></i>
                                                            <CountLiked idSong={item.id}></CountLiked>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        isPlaying: state.song.isPlaying,
        currentUser: state.user.currentUser,
        detailSong: state.song.detailSong,
        songDes: state.song.songDes,
        currentAlbum: state.album.currentAlbum,
        currentSong: state.song.currentSong,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailAlbum: (id) => dispatch(actions.getDetailAlbumStart(id)),
        getAlbumByUserId: (id) => dispatch(actions.getAlbumByUserIdStart(id)),
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        getDetailSong: (id) => dispatch(actions.getSongByIdStart(id)),
        getSongByUserId: (id, pageIndex, pageSize) => dispatch(actions.getSongDesByUserIdStart(id, pageIndex, pageSize)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
        addSongToCurrentPlaylist: (song) => dispatch(actions.AddSongToCurrentPlaylist(song)),
    };
};
export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(SongDetail)));