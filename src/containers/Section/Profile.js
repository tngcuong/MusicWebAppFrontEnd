import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='profile-container'>
                <div className='profile-banner'>
                    <div className='profile-avatar'>
                        <div className='btn-upload-avatar'></div>
                    </div>
                    <div className='profile-name'>

                    </div>
                    <div className='btn-upload-header'>

                    </div>
                </div>
                <div className='profile-middle'>
                    <div className='profile-item'>
                        <ul>
                            <li>All</li>
                            <li>Tracks</li>
                            <li>Popular Tracks</li>
                            <li>PlayLists</li>
                        </ul>
                    </div>
                    <div className='btn-edit'>

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
        userAlbums: state.album.userAlbums
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailAlbum: (id) => dispatch(actions.getDetailAlbumStart(id)),
        getAlbumByUserId: (id) => dispatch(actions.getAlbumByUserIdStart(id)),
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));