import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';

import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }

    render() {
        let language = this.props.language
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fa fa-bars"></i>
                            <img className='header-logo' src={logo} />
                            {/* <div className='header-logo'></div> */}
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.explore" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.explore-title" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.artist" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.fav-artist" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.music-charts" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.top-music" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.library" /></b></div>
                                <div className='subs-title'></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'}><span onClick={() => { this.handleChangeLanguage(LANGUAGES.VI) }}><FormattedMessage id="home-header.vi" /></span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.handleChangeLanguage(LANGUAGES.EN) }}><FormattedMessage id="home-header.en" /></span></div>
                            <div className='avatar'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='header-banner-title1'>
                            Museek
                        </div>
                        <div className='header-banner-title2'>
                            <FormattedMessage id="home-header.free-service" />
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <FormattedMessage id="home-header.search-plh" > {placeholder =>
                                <input type='text' placeholder={placeholder} />
                            }</FormattedMessage>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-music"></i></div>
                                <div className='text-child'>EDM</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-music"></i></div>
                                <div className='text-child'>JAZZ</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-music"></i></div>
                                <div className='text-child'>POP</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-music"></i></div>
                                <div className='text-child'>ROCK</div>
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
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
