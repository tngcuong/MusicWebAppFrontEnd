import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import HomeHeader from './HomeHeader';
import Slider from './Section/SliderCustom';
import './HomePage.scss';
import Carousel from './Section/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from './Section/About';
import HomeFooter from './HomeFooter';
import MusicPlayer from '../Partial/MusicPlayer';
import Feature from './Section/Feature';
import GetRandomSong from './Section/GetRandomSong';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.showPlayer(true)
    }


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        };
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/home' : '/home';

        return (
            <div className='home-container'>
                <HomeHeader isShowBanner={true} />
                <div className='main-content'>
                    <div className='content-left'>
                        <Slider settings={settings} />
                        <Carousel settings={settings} />

                    </div>
                    <div className='content-right'>
                        <Feature />
                        <GetRandomSong />
                    </div>
                    <HomeFooter />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showPlayer: (flag) => dispatch(actions.showPlayer(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
