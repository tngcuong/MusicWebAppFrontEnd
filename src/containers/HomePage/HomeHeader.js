import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Mlogo2.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }


    goHome = () => {
        this.props.history.push("/home");
    }

    componentDidMount() {
        this.props.getCurrentUser()
        this.setState(
            { currentUser: { ...this.props.currentUser } }
        )
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.currentUser != preProps.currentUser) {
            this.setState(
                { currentUser: { ...this.props.currentUser } }
            )
        }

        if (this.props.isLoadingAccount != preProps.isLoadingAccount) {
            this.setState(
                { currentUser: { ...this.props.currentUser } }
            )
        }
    }

    goLogin = () => {
        this.props.history.push(`/login`)
    }

    goRegist = () => {
        this.props.history.push(`/sign-up`)
    }

    HandleToPersonalPage = () => {
        this.props.history.push(`/profile/${this.state.currentUser.id}`)
    }

    render() {
        let { language, processLogout, currentUser } = this.props
        let isLogin = this.props.isLoggedIn
        console.log(this.props);
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {/* <img className='header-logo' src={logo} /> */}
                            <div className='header-logo'
                                onClick={() => this.goHome()}
                                style={{
                                    width: "5rem",
                                    height: "60px",
                                    backgroundImage: `url("${logo}")`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}></div>

                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.explore" /></b></div>
                                {/* <div className='subs-title'><FormattedMessage id="home-header.explore-title" /></div> */}
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.artist" /></b></div>
                                {/* <div className='subs-title'><FormattedMessage id="home-header.fav-artist" /></div> */}
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.music-charts" /></b></div>
                                {/* <div className='subs-title'><FormattedMessage id="home-header.top-music" /></div> */}
                            </div>
                            {isLogin && isLogin === true &&
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.library" /></b></div>
                                    {/* <div className='subs-title'></div> */}
                                </div>
                            }

                        </div>
                        <div className='center-content'>
                            <div className='search-header'>
                                <input type='text' />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                        <div className='right-content'>
                            {isLogin && isLogin === true &&
                                <div>
                                    <div className='child-content' onClick={() => { this.HandleToPersonalPage() }}  >
                                        <div className='profile' style={{
                                            backgroundImage: `url("${currentUser.avatar}")`,
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}><b><FormattedMessage id="home-header.profile" /></b></div>
                                        {/* <div className='subs-title'></div> */}
                                    </div>
                                </div>

                            }
                            <div className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'}><span onClick={() => { this.handleChangeLanguage(LANGUAGES.VI) }}><FormattedMessage id="home-header.vi" /></span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.handleChangeLanguage(LANGUAGES.EN) }}><FormattedMessage id="home-header.en" /></span></div>
                            <div className='login-logout'>
                                {isLogin && isLogin === true ?
                                    <span onClick={processLogout}><FormattedMessage id="home-header.logout" /></span>

                                    :
                                    <span onClick={() => { this.goLogin() }}><FormattedMessage id="home-header.login" /></span>
                                }
                                {isLogin === false &&
                                    <span style={{ marginLeft: "14px" }} onClick={() => { this.goRegist() }}><FormattedMessage id="home-header.register" /></span>
                                }
                            </div>
                        </div>
                    </div>
                </div >
                {
                    this.props.isShowBanner === true &&
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
                }

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language,
        currentUser: state.user.currentUser,
        isLoadingAccount: state.account.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
