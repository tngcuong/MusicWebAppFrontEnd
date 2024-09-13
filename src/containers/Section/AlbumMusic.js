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
import CountLikedPLayList from '../Partial/CountLikedPLayList';
import LikePlayList from '../Partial/LikePlayList';
import FollowBtn from '../Partial/FollowBtn';
import { getRandomColor, totalTime, calcuDate } from '../../components/HOC/RandomColor';
import NameUser from '../Partial/NameUser';
import NamePlayList from '../Partial/NamePlayList';
import NameSong from '../Partial/NameSong';
import "./AlbumMusic.scss";
import NamePlaylist from '../Partial/NamePlayList';
import SongHover from '../Partial/SongHover';


class AlbumMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailAlbum: {},
            bg: "",
            totalSong: 0,
            totalTime: 0,
            createAt: "",
            userAlbums: []
        }
    }

    componentDidMount() {
        this.props.showPlayer(true)
        this.props.getDetailAlbum(this.props.match.params.album)
    }

    setCurrentAlbum = async (item, index) => {
        let { currentSong, isPlaying, intl, currentAlbum } = this.props
        if (this.areAlbumsEqual(currentAlbum, this.state.detailAlbum.songList.filter(items => items.user.id != null))) {
            if (currentSong.id == item.id) {
                if (isPlaying == true) {
                    await this.props.playSong(false)
                } else {
                    await this.props.playSong(true)
                }
            } else {
                await this.props.setCurrentSong(item)
            }
        } else {
            this.props.setCurrentAlbum(this.state.detailAlbum.songList.filter(items => items.user.id != null))
            await this.props.setCurrentSong(this.state.detailAlbum.songList.filter(items => items.user.id != null)[0])
            await this.props.playSong(true)
        }
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.detailAlbum != preProps.detailAlbum) {
            this.setState({
                detailAlbum: { ...this.props.detailAlbum },
                bg: getRandomColor(),
                totalSong: this.props.detailAlbum.songList ? this.props.detailAlbum.songList.filter(item => item.user.id != null).length : 0,
                totalTime: totalTime(this.props.detailAlbum.songList.filter(item => item.user.id != null)),
                createAt: calcuDate(this.props.detailAlbum.createAt)
            }, () => {
                this.props.getAlbumByUserId(this.state.detailAlbum?.createById)

            })
        }

        if (this.props.match.params.album != preProps.match.params.album) {
            this.props.getDetailAlbum(this.props.match.params.album)
        }

        if (this.props.userAlbums != preProps.userAlbums) {
            this.setState({
                userAlbums: [...this.props.userAlbums]
            })
        }
    }

    setAlbum = async (item) => {
        let { currentSong, isPlaying, intl, currentAlbum } = this.props
        if (this.areAlbumsEqual(currentAlbum, item.filter(item => item.user.id != null))) {
            if (isPlaying == true) {
                await this.props.playSong(false)
            } else {
                await this.props.playSong(true)
            }

        } else {
            this.props.setCurrentAlbum(item.filter(item => item.user.id != null))
            await this.props.setCurrentSong(item[0])
            await this.props.playSong(true)
        }
    }

    areAlbumsEqual = (album1, album2) => {
        if (!album1 || !album2) return false;
        if (album1.length !== album2.length) return false;

        const sortedAlbum1 = [...album1].sort((a, b) => a.id - b.id);
        const sortedAlbum2 = [...album2].sort((a, b) => a.id - b.id);

        return sortedAlbum1.every((song, index) => song.id === sortedAlbum2[index].id);
    }

    render() {
        let { detailAlbum } = this.state
        let { currentSong, isPlaying, intl, currentAlbum } = this.props
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className='album-container'>
                    <div className='album-banner' style={{
                        // backgroundImage: `url("${detailAlbum.thumbnail}")`,
                        // backgroundPosition: 'center center',
                        // backgroundSize: 'cover',
                        // backgroundRepeat: 'no-repeat'
                        background: "" + this.state.bg + ""
                    }}>
                        <div className='album-banner-left'>

                            <div className='album-info-up'>
                                <div className='play'>
                                    {this.props.isPlaying == false && this.areAlbumsEqual(currentAlbum, detailAlbum.songList?.filter(item => item.user.id != null)) ?
                                        <i className="fas fa-play-circle" onClick={() => this.setAlbum(detailAlbum.songList)}></i> :
                                        <i className="fas fa-pause-circle" onClick={() => this.setAlbum(detailAlbum.songList)}></i>}
                                </div>
                                <div className='title-artist'>
                                    <div className='title'>&ensp;{detailAlbum.name}</div>
                                    <div className='artist'>&ensp; By {detailAlbum.createBy && <NameUser user={detailAlbum.createBy} />} &ensp;</div>
                                </div>
                            </div>
                            <div className='album-info-down'>
                                <div className='song-count'>
                                    <p className='total-song'>{this.state.totalSong} </p>
                                    {this.state.totalSong > 1 ? <p>Tracks</p> : <p>Track</p>}
                                </div>
                                <div className='total-time'>
                                    {this.state.totalTime <= 36000 ? moment.utc(this.state.totalTime * 1000).format("mm:ss")
                                        : moment.utc(this.state.totalTime * 1000).format('HH:mm:ss')}
                                </div>
                            </div>
                        </div>
                        <div className='album-banner-center'>
                            <div className='create-at'>
                                <p>{this.state.detailAlbum.createAt &&
                                    this.state.createAt + " ago"

                                }</p>
                            </div>
                        </div>
                        <div className='album-banner-right'>
                            <div className='album-thumbnail' style={{
                                backgroundImage: `url("${detailAlbum.thumbnail}")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>

                            </div>
                        </div>
                    </div >
                    <div className='album-content'>
                        <div className='left'>
                            <div className='album-action'>
                                <div className='like'> <LikePlayList idPlayList={this.props.match.params.album} />
                                    <div><CountLikedPLayList idPlayList={this.props.match.params.album}></CountLikedPLayList></div>
                                </div>

                            </div>
                            <div className='album-info'>
                                <div className='album-content-left'>
                                    <div className='album-info-avatar' style={{
                                        backgroundImage: `url("${detailAlbum.createBy && detailAlbum.createBy.avatar}")`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>

                                    </div>
                                    <div className='album-info-name'>
                                        {detailAlbum.createBy && <NameUser user={detailAlbum.createBy} />}
                                    </div>
                                    <div className='album-info-quantity'>
                                    </div>
                                    {
                                        this.props.currentUser.id !== detailAlbum.createById &&
                                        <FollowBtn idUser={detailAlbum.createById} />
                                    }


                                </div>
                                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                    <div className='album-content-center'>
                                        {

                                            detailAlbum?.songList &&
                                            detailAlbum.songList?.filter(item => item.user.id != null).map((item, index) => {
                                                return (
                                                    <div className={`song list-song  ${isPlaying == true && currentSong.id == item.id && 'playing'}`} key={item.id} onClick={() => this.setCurrentAlbum(item, index)}>
                                                        <div className='track-avatar' style={{
                                                            backgroundImage: `url("${item.image}")`,
                                                            backgroundPosition: 'center center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}>
                                                            <SongHover />
                                                        </div>
                                                        <div className='track-number'>{index + 1}</div>
                                                        <div className='artist-info'>
                                                            <span className='track-artist' onClick={(e) => e.stopPropagation()}>{item.user?.name && <NameUser user={detailAlbum.createBy} />}</span>
                                                            <span> - </span>
                                                            <span className='track-name' onClick={(e) => e.stopPropagation()}>{item.name && <NameSong song={item} />}</span>
                                                        </div>

                                                        <div className='track-play'>  {moment.utc(item.durationTime * 1000).format("mm:ss")}</div>
                                                        <div></div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </CustomScrollbars>
                            </div>
                        </div>

                        <div className='album-content-right'>
                            <div className='relative-album'>
                                <div className='title-relative'>
                                    <div className='icon' style={{
                                        backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzLjEgKDM5MDEyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19wbGF5bGlzdF8xODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzLz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpY19wbGF5bGlzdCIgZmlsbD0icmdiKDE1MywgMTUzLCAxNTMpIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIvPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtMiIgZmlsbC1vcGFjaXR5PSIwLjciIHBvaW50cz0iMyAwIDE0IDAgMTQgMTAgMTIgMTAgMTIgMiAzIDIiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)',
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}></div>
                                    <span className='another'>{intl.formatMessage({ id: 'playlist-detail.another-playlist' })}</span>
                                    <span className='view-all' onClick={() => { this.handleViewAll(detailAlbum.createBy.id) }}>{intl.formatMessage({ id: 'playlist-detail.view-all' })}</span>
                                </div>
                                <div className='content-relative'>
                                    {this.state.userAlbums && this.state.userAlbums?.map((item, index) => {
                                        return (
                                            <div key={item.id} >
                                                {
                                                    JSON.stringify(this.state.detailAlbum) !== JSON.stringify(item) &&
                                                    <div className='user-album' >
                                                        <div className='round-user-album-th' style={{
                                                            backgroundImage: 'url(https://a-v2.sndcdn.com/assets/images/playlist-cover-bg_small-1e402003.png)',
                                                            backgroundPosition: 'center center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}>
                                                            <div className='user-album-thumbnail' style={{
                                                                backgroundImage: `url("${item.thumbnail}")`,
                                                                backgroundPosition: 'center center',
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}>
                                                            </div>
                                                        </div>

                                                        <div className='user-album-info'>
                                                            <div className='artist'>
                                                                {item.createBy && <NameUser user={item.createBy} />}
                                                            </div>
                                                            <div className='user-album-name'>
                                                                {item.name && <NamePlaylist playlist={item} />}
                                                            </div>
                                                            <div className='user-album-liked'>
                                                                <i className="fas fa-heart"></i> <CountLikedPLayList idPlayList={item.id} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}


                                </div>
                            </div>

                            <div className=''></div>
                        </div>
                    </div >


                </div >
                <div className='album-player' >

                </div >

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        detailAlbum: state.album.detailAlbum,
        isPlaying: state.song.isPlaying,
        userAlbums: state.album.userAlbums,
        currentUser: state.user.currentUser,
        currentAlbum: state.album.currentAlbum,
        currentSong: state.song.currentSong
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailAlbum: (id) => dispatch(actions.getDetailAlbumStart(id)),
        getAlbumByUserId: (id) => dispatch(actions.getAlbumByUserIdStart(id)),
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
    };
};
export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumMusic)));