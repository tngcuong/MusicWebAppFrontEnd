import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';

import HomeHeader from '../HomePage/HomeHeader';

import HomeFooter from '../HomePage/HomeFooter';
import MusicPlayer from '../Partial/MusicPlayer';
import { getRandomColor, totalTime, calcuDate } from '../../components/HOC/RandomColor';

import "./AlbumMusic.scss";

class AlbumMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailAlbum: {},
            bg: "",
            totalSong: 0,
            totalTime: 0,
            createAt: ""
        }
    }

    componentDidMount() {
        this.props.getDetailSong(this.props.match.params.album)
        this.setState({
            bg: getRandomColor(),
            totalSong: this.props.detailAlbum.songList ? this.props.detailAlbum.songList.length : 0,
            totalTime: totalTime(this.props.detailAlbum.songList),
            createAt: calcuDate(this.props.detailAlbum.createAt)
        })

    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.detailAlbum != preProps.detailAlbum) {
            this.setState({
                detailAlbum: { ...this.props.detailAlbum },
                bg: getRandomColor(),
                totalSong: this.props.detailAlbum.songList ? this.props.detailAlbum.songList.length : 0,
                totalTime: totalTime(this.props.detailAlbum.songList),
                createAt: calcuDate(this.props.detailAlbum.createAt)
            })
        }
    }

    render() {
        console.log(this.state);
        let { detailAlbum } = this.state

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
                                <div className='play'>{
                                    this.props.isPlaying == false ?
                                        <i className="fas fa-play-circle"></i> :
                                        <i className="fas fa-pause-circle"></i>
                                }</div>
                                <div className='title-artist'>
                                    <div className='title'>{detailAlbum.name}</div>
                                    <div className='artist'>By {detailAlbum.createBy && detailAlbum.createBy.name}</div>
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
                        <div className='album-action'>
                            <div className='like'> <span><i className="far fa-heart"></i></span>Like</div>
                            <div className='liked'> <span><i className="fas fa-heart"></i></span>10</div>
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
                                    {detailAlbum.createBy && detailAlbum.createBy.name}
                                </div>
                                <div className='album-info-quantity'>
                                    <i class="fas fa-user-friends"></i> 100
                                </div>
                                <div className='album-info-btn-follow'>
                                    <button className='btn-follow'>Follow</button>
                                </div>
                            </div>
                            <div className='album-content-center'>
                                <div className='track-avatar'></div>
                                <div className='track-number'></div>
                                <div className='track-artist'></div>
                                <div className='track-name'></div>
                            </div>
                            <div className='album-content-right'>

                            </div>
                        </div>
                    </div>

                </div>


                {/* <div className='album-content-left'>
                        <img className='thumbnail' src={detailAlbum.thumbnail}></img>
                        <div className='info'>
                            <h3 className='name'>{detailAlbum.name}</h3>
                            <span className='create'>
                                <span>Create at: </span>
                                <span className='create-at'>{moment.utc(detailAlbum.createAt).format("DD/MM/YYYY")}</span>
                            </span>
                            <span className='artist'></span>
                            <span className='liked'>1k</span>
                        </div>
                    </div>
                    <div className='album-content-right'>
                        <div className=''>
                            <div className='album-list-song'>
                                <div className='album-list-title'>
                                    <span>Bai hat</span>
                                    <span>Tac gia</span>
                                    <span>Thoi gian</span>
                                </div>
                                <div className='list-song-container'>
                                    {

                                        detailAlbum.songList &&
                                        detailAlbum.songList.map((item, index) => {
                                            return (
                                                <div className='list-song' key={item.id}>
                                                    <div className='col-1'>
                                                        <span><i className="fas fa-music"></i></span>
                                                        <img src={item.image} alt='thumbnail' className='img-music'></img>
                                                        <span className='artist-music'>
                                                            <span className='artist-name'>{item.name}</span>
                                                            <span>{item.user && item.user.name}</span>
                                                        </span>
                                                    </div>
                                                    <div className='col-2'>

                                                    </div>
                                                    <div className='col-3'>
                                                        {moment.utc(item.durationTime * 1000).format("mm:ss")}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div> */}

                <div className='album-player'>
                    <MusicPlayer />
                </div>

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        detailAlbum: state.album.detailAlbum,
        isPlaying: state.album.isPlaying,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailSong: (id) => dispatch(actions.getDetailAlbumStart(id)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumMusic));