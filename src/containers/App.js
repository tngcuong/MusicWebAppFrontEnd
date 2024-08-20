import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated, userIsNotAdmin, userIsAdmin } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
import SingUp from './Auth/SignUp.js';

import System from '../routes/System';

import * as actions from '../store/actions';
import "./App.scss";
import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js';
import Carousel from './HomePage/Section/Carousel.js';
import CustomScrollbars from '../components/CustomScrollbars.js';
import AlbumMusic from './Section/AlbumMusic.js';
import MusicPlayer from './Partial/MusicPlayer.js';
import Profile from './Section/Profile/Profile.js';
import Search from './Search/Search.js';
import SongDetail from './Section/SongDetail.js';
import { isEmpty } from '../components/HOC/RandomColor.js';

class App extends Component {
    interval;

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn && this.props.isLoggedIn == true && this.props.accountInfo) {
            this.props.getRole();

        }
    }

    refreshToken = () => {
        if (this.props.isLoggedIn && this.props.isLoggedIn == true) {
            this.props.refreshToken()
        }
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
        this.interval = setInterval(() => {
            this.refreshToken();
        }, 7 * 60 * 1000);
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <div className="main-container">
                            <div className="content-container">
                                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                    <Switch >
                                        <Route path={path.HOME} exact component={(Home)} />
                                        <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                        <Route path={path.SIGNUP} component={userIsNotAuthenticated(SingUp)} />
                                        <Route path={path.SYSTEM} component={userIsAuthenticated(userIsAdmin(System))} />
                                        <Route path={path.HOMEPAGE} component={HomePage} />
                                        <Route path={path.DETAIL_ALBUM} component={AlbumMusic} />
                                        <Route path={path.PROFILE} component={Profile} />
                                        <Route path={path.SEARCH} component={Search} />
                                        <Route path={path.DETAIL_SONG} component={SongDetail} />
                                    </Switch>
                                </CustomScrollbars>
                            </div>

                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </div>

                    </div>
                    <MusicPlayer />
                </Router>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        song: state.song.currentSong,
        isLoggedIn: state.account.isLoggedIn,
        accountInfo: state.account.accountInfo,
        role: state.account.role
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshToken: () => dispatch(actions.refreshTokenStart()),
        getRole: () => dispatch(actions.getRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
