import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Carousel.scss';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import SliderImage1 from '../../../assets/Slider/portfolio-1.jpg'
import NamePlayList from '../../Partial/NamePlayList';


class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrAlbums: [],
            currentPage: 1,
            pageSize: 100,
        }
    }

    async componentDidMount() {
        this.props.getAlbumStart(this.state.currentPage, this.state.pageSize)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.albums !== this.props.albums) {
            this.setState({
                arrAlbums: [...this.props.albums]
            })
        }
    }

    handleToDetailAlbum = (item) => {
        this.props.history.push(`/details-album/${item.id}`)
    }



    setAlbum = async (item) => {
        this.props.setCurrentAlbum(item)
        if (item.length > 0) {
            await this.props.setCurrentSong(item[0])
            await this.props.playSong(true)
        }
    }

    render() {
        let { arrAlbums } = this.state
        return (
            <div className='section-share section-carousel'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Playlist noi bat</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props.settings}>
                            {arrAlbums && arrAlbums.map((item, index) => {
                                return (

                                    <div className='section-customize' key={item.id}>
                                        <div className='bg-image section-slider' style={{
                                            width: "150px",
                                            height: "150px",
                                            backgroundImage: `url("${item.thumbnail}")`,
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                            onClick={() => { this.setAlbum(item.songList) }} />
                                        <div className='album-name' ><NamePlayList playlist={item} /></div>
                                    </div>
                                )
                            })}
                            <div className='section-customize'>
                                <div className='bg-image section-carousel' />
                                <div>Anh 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-carousel' />
                                <div>Anh 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-carousel' />
                                <div>Anh 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-carousel' />
                                <div>Anh 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-carousel' />
                                <div>Anh 6</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language,
        albums: state.album.albums,
        currentAlbum: state.album.currentAlbum,
        songs: state.song.songs,
        isPlaying: state.song.isPlaying,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        getAlbumStart: (pageIndex, pageSize) => dispatch(actions.fetchAlbumStart(pageIndex, pageSize)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carousel));
