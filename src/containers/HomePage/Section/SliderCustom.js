import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './SliderCustom.scss';
import * as actions from '../../../store/actions';
import Slider from 'react-slick';
import NameSong from '../../Partial/NameSong';
import { PlayCircle } from 'lucide-react';
import SongHover from '../../Partial/SongHover';

class SliderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSongs: [],
            currentPage: 1,
            pageSize: 100,
        };
    }

    async componentDidMount() {
        this.props.getSongStart(this.state.currentPage, this.state.pageSize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.songs !== this.props.songs) {
            this.setState({
                arrSongs: [...this.props.songs],
            });
        }
    }

    handleToDetailSong = (id) => {
        this.props.history.push(`/details-song/${id}`);
    };

    playSong = async (song) => {
        let { isPlaying, currentSong } = this.props;

        if (JSON.stringify(this.props.currentSong) !== JSON.stringify(song)) {
            this.props.setCurrentSong(song);
        } else {
            this.props.playSong(!isPlaying);
        }
    };

    render() {
        let { arrSongs } = this.state;
        let { isPlaying, currentSong } = this.props;
        return (
            <div className='section-share section-slider'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Nhac hay</span>
                        {/* <button className='btn-section'>Xem them</button> */}
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props.settings}>
                            {arrSongs &&
                                arrSongs.map((item, index) => {
                                    return (
                                        <div className={`song ${isPlaying == true && currentSong.id == item.id ? 'playing' : ''} section-customize`} key={item.id}>
                                            <div
                                                className='carousel__image'
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    backgroundImage: `url("${item.image}")`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}
                                                onClick={() => {
                                                    this.playSong(item);
                                                }}
                                            >
                                                <SongHover />
                                                {/* <div className='carousel__overlay'>
                                                    <PlayCircle size={48} className='carousel__play-icon' />
                                                </div> */}
                                            </div>
                                            <div className='album-name'>
                                                <NameSong song={item} />
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language,
        songs: state.song.songs,
        isPlaying: state.song.isPlaying,
        currentSong: state.song.currentSong,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongStart: (pageIndex, pageSize) => dispatch(actions.fetchSongStart(pageIndex, pageSize)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SliderCustom));