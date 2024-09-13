import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./SongHover.scss";
import * as actions from '../../store/actions';
import moment from 'moment';
import CustomScrollbars from '../../components/CustomScrollbars';


class SongHover extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <>
                <button className="play-button" >
                    <i className="fas fa-play"></i>
                </button>
                <button className="pause-button" >
                    <i className="fas fa-pause"></i>
                </button>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentAlbum: state.album.currentAlbum,
        song: state.song.currentSong,
        isPlaying: state.song.isPlaying
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongHover);