import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

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

class App extends Component {
    interval;

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    refreshToken = () => {
        this.props.refreshToken()
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
                <div>

                    <Router history={history}>
                        <div className="main-container">
                            <div className="content-container">
                                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                    <Switch >
                                        <Route path={path.HOME} exact component={(Home)} />
                                        <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                        <Route path={path.SIGNUP} component={userIsNotAuthenticated(SingUp)} />
                                        <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                        <Route path={path.HOMEPAGE} component={HomePage} />
                                        <Route path={path.DETAIL_ALBUM} component={AlbumMusic} />
                                        <Route path={path.PROFILE} component={Profile} />
                                    </Switch>
                                </CustomScrollbars>
                            </div>

                            {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

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
                    </Router>
                </div>
                <MusicPlayer />
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.account.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshToken: () => dispatch(actions.refreshTokenStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);