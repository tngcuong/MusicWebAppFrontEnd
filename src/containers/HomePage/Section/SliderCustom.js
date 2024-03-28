import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './SliderCustom.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import Slider from 'react-slick'
import SliderImage1 from '../../../assets/Slider/portfolio-1.jpg'

class SliderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSongs: [],
            currentPage: 1,
            pageSize: 100,
        }
    }

    async componentDidMount() {
        this.props.getSongStart(this.state.currentPage, this.state.pageSize)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.songs !== this.props.songs) {
            this.setState({
                arrSongs: [...this.props.songs]
            })
        }
    }

    playSong = (song) => {
        this.props.setCurrentSong(song)
    }

    render() {
        let { arrSongs } = this.state
        console.log(arrSongs);
        return (
            <div className='section-share section-slider'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Nhac hay</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props.settings}>
                            {arrSongs && arrSongs.map((item, index) => {
                                return (

                                    <div className='section-customize' key={item.id}>
                                        <div className='bg-image section-slider' style={{
                                            width: "150px",
                                            height: "150px",
                                            backgroundImage: `url("${item.image}")`,
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                            onClick={() => { this.playSong(item) }} />
                                        <div>{item.name}</div>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language,
        songs: state.song.songs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSongStart: (pageIndex, pageSize) => dispatch(actions.fetchSongStart(pageIndex, pageSize)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderCustom);
