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
                                            onClick={() => { this.handleToDetailAlbum(item) }} />
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

        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language,
        albums: state.album.albums,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAlbumStart: (pageIndex, pageSize) => dispatch(actions.fetchAlbumStart(pageIndex, pageSize)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carousel));
