import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./Song.scss";

import { calcuDate } from '../../components/HOC/RandomColor';
import CountLiked from '../Partial/CountLiked';
import Loader from '../../components/Loader';
import LikeSong from '../Partial/LikeSong';
import NameSong from '../Partial/NameSong';
import NameUser from '../Partial/NameUser';

class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSong: []
        }
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.searchSong !== preProps.searchSong) {
            this.setState({
                listSong: [...this.props.searchSong]
            })
        }
    }

    componentDidMount() {
        this.setState({
            listSong: [...this.props.searchSong]
        })
    }


    render() {
        const { listSong } = this.state
        return (
            <div className='search-song-container'>
                {this.props.isLoadingAccount === true && <Loader></Loader>}
                <div className='search-song-up-container'>
                    <p className='count-song'>{listSong.length}  {listSong.length > 1 ? <span> songs </span> : <span> song </span>} found. </p>
                </div>
                <div className='search-song-down-container'>
                    <div className='search-song-down-list'>
                        {
                            listSong && listSong.length > 0 &&
                            listSong.map((item, index) => {
                                return (
                                    <div className='content' key={item.id}>
                                        <div className='image' style={{
                                            backgroundImage: `url("${item.image}")`,
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>

                                        </div>
                                        <div className='details'>
                                            <div className='sound-title'>
                                                <div className='sound-header'>
                                                    <div className='play-btn'>
                                                        <div className='play'>
                                                            <i className="fas fa-play-circle"></i>
                                                        </div>
                                                    </div>
                                                    <div className='name'>
                                                        <div className='artist'>
                                                            <a href=''><NameUser user={item.user} /></a>
                                                        </div>
                                                        <a className='name-song'><NameSong song={item} /></a>
                                                    </div>
                                                    <div className='time-make'>
                                                        <span>{calcuDate(item.createAt)} ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='sound-wave'>
                                                <div className='chat'>

                                                </div>
                                            </div>
                                            <div className='actions'>
                                                <div className='actions-container'>
                                                    <div className='like' >
                                                        <LikeSong
                                                            idSong={item.id}
                                                        ></LikeSong>
                                                        <div><CountLiked idSong={item.id}></CountLiked></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        searchSong: state.song.searchSong
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Song));