import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Carousel.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SliderImage1 from '../../../assets/Slider/portfolio-1.jpg'



class Carousel extends Component {

    render() {

        return (
            <div className='section-share section-carousel'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Playlist noi bat</span>
                        <button className='btn-section'>Xem them</button>
                    </div>
                    <div className='section-content'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-carousel' />
                                <div>Anh 1</div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
