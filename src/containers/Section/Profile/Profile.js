import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./Profile.scss";
import HomeHeader from '../../HomePage/HomeHeader';

import AllComponent from './All';
import TracksComponent from './Tracks';
import LikedTracksComponent from './LikedTracks';
import PlayListsComponent from './PlayLists';
import PopularTracksComponent from './PopularTracks';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            All: true,
            PopularTracks: false,
            Tracks: false,
            PlayLists: false,
            LikedTracks: false,
            ProfileUser: {}
        }
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.profileUser !== preProps.profileUser) {
            this.setState({
                ProfileUser: { ...this.props.profileUser }
            })
        }

        if (this.props.match.params.profile !== preProps.match.params.profile) {
            this.props.getUser(this.props.match.params.profile)
        }

    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.profile)
        this.setState({
            ProfileUser: { ...this.props.profileUser }
        })
        this.props.showPlayer(true)
    }

    handleChangePage = (id) => {
        let updatedState = { ...this.state };
        let i = 1;
        updatedState[id] = true;
        Object.keys(updatedState).forEach(key => {
            if (key !== id && i <= 5) {
                updatedState[key] = false;
            }
            i += 1;
        });
        this.setState({ ...updatedState });

    }

    render() {
        const { ProfileUser, All, PopularTracks, Tracks, PlayLists, LikedTracks } = this.state;
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <div className='profile-container'>

                    <div className='profile-banner'>
                        <div className='profile-avatar' style={{
                            backgroundImage: `url("${ProfileUser.avatar}")`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <div className='btn-upload-avatar'>
                                <label className='lb-upload-avatar' htmlFor='upload-avatar'><i className="fas fa-camera"></i> Upload image </label>
                                <input id='upload-avatar' type='file' accept='image/jpeg,image/pjpeg,image/gif,image/png' hidden></input>
                            </div>
                            <div className='profile-name'>
                                <h2>{ProfileUser.name}</h2>
                                <h3>{ }</h3>
                            </div>
                        </div>

                        <div className='upload-header'>
                            <div className='btn-upload-header'>
                                <label className='lb-upload-header' htmlFor='upload-header'><i className="fas fa-camera"></i> Upload header </label>
                                <input id='upload-header' type='file' accept='image/jpeg,image/pjpeg,image/gif,image/png' hidden></input>
                            </div>
                        </div>
                    </div>
                    <div className='profile-middle'>
                        <div className='profile-item'>
                            <ul className='profile-list-item'>
                                <li className={All === true ? "m-active" : ""} onClick={() => { this.handleChangePage("All") }}>All</li>
                                <li className={Tracks === true ? "m-active" : ""} onClick={() => { this.handleChangePage("Tracks") }}>Tracks</li>
                                <li className={LikedTracks === true ? "m-active" : ""} onClick={() => { this.handleChangePage("LikedTracks") }}>Liked Tracks</li>
                                <li className={PopularTracks === true ? "m-active" : ""} onClick={() => { this.handleChangePage("PopularTracks") }}>Popular Tracks</li>
                                <li className={PlayLists === true ? "m-active" : ""} onClick={() => { this.handleChangePage("PlayLists") }}>PlayLists</li>
                            </ul>
                        </div>
                        <div className='btn-edit'>
                            <span><i className="fas fa-pencil-alt"></i> Edit</span>
                        </div>
                    </div>
                    <div className='profile-content'>
                        <div className='profile-content-left'>
                            {
                                All === true && <AllComponent />
                            }
                            {
                                Tracks === true && <TracksComponent />
                            }
                            {
                                LikedTracks === true && <LikedTracksComponent />
                            }
                            {
                                PlayLists === true && <PlayListsComponent />
                            }
                            {
                                PopularTracks === true && <PopularTracksComponent />
                            }
                        </div>
                        <div className='profile-content-right'>
                            <div className='content-right'>
                                <div className='header'>
                                    <table className='table-stat'>
                                        <tbody>
                                            <tr>
                                                <td className='info-stat'>
                                                    <a>
                                                        <h3>Followers</h3>
                                                        <div>200</div>
                                                    </a>
                                                </td>
                                                <td className='info-stat'>
                                                    <a>
                                                        <h3>Following</h3>
                                                        <div>1</div>
                                                    </a>
                                                </td>
                                                <td className='info-stat'>
                                                    <a>
                                                        <h3>Tracks</h3>
                                                        <div>2</div>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        detailAlbum: state.album.detailAlbum,
        isPlaying: state.album.isPlaying,
        userAlbums: state.album.userAlbums,
        profileUser: state.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailAlbum: (id) => dispatch(actions.getDetailAlbumStart(id)),
        getAlbumByUserId: (id) => dispatch(actions.getAlbumByUserIdStart(id)),
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        getUser: (id) => dispatch(actions.getUserIdStart(id)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));