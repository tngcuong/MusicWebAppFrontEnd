import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./Album.scss";

import { calcuDate } from '../../components/HOC/RandomColor';
import CountLiked from '../Partial/CountLiked';
import Loader from '../../components/Loader';
import LikeSong from '../Partial/LikeSong';
import LikePlayList from '../Partial/LikePlayList';
import CountLikedPLayList from '../Partial/CountLikedPLayList';
import CustomScrollbars from '../../components/CustomScrollbars';
import NamePlayList from '../Partial/NamePlayList';
import NameUser from '../Partial/NameUser';
import NameSong from '../Partial/NameSong';


class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPlaylist: []
        }
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.searchAlbum !== preProps.searchAlbum) {
            this.setState({
                listPlaylist: [...this.props.searchAlbum]
            })
        }
    }

    componentDidMount() {
        this.setState({
            listPlaylist: [...this.props.searchAlbum]
        })
    }


    render() {
        const { listPlaylist } = this.state
        return (
            <div className='search-album-container'>
                {this.props.isLoadingAccount === true && <Loader></Loader>}
                <div className='search-album-up-container'>
                    <p className='count-album'>{listPlaylist.length}  {listPlaylist.length > 1 ? <span> playlists </span> : <span> playlist </span>} found. </p>
                </div>
                <div className='search-album-down-container'>
                    <div className='search-album-down-list'>
                        {
                            listPlaylist && listPlaylist.length > 0 &&
                            listPlaylist.map((item, index) => {
                                return (
                                    <div className='content' key={item.id}>
                                        <div className='image' style={{
                                            backgroundImage: `url("${item.thumbnail}")`,
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
                                                            <a href=''>{item.user?.name}</a>
                                                        </div>
                                                        <a className='name-song'><NamePlayList playlist={item} /></a>
                                                    </div>
                                                    <div className='time-make'>
                                                        <span>{calcuDate(item.createAt)} ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='sound-wave'>
                                                {item.songList && item.songList.length > 0 &&
                                                    <CustomScrollbars>
                                                        <div className='list-song'>
                                                            <div className='sub-list-song'>
                                                                {item.songList && item.songList.length > 0
                                                                    && item.songList.map((subItem, subIndex) => {
                                                                        return (
                                                                            <div className='song' key={subItem.id}>
                                                                                <div className='img-song' style={{
                                                                                    backgroundImage: `url("${subItem.image}")`,
                                                                                    backgroundPosition: 'center center',
                                                                                    backgroundSize: 'cover',
                                                                                    backgroundRepeat: 'no-repeat'
                                                                                }}></div>
                                                                                <span className='number-song'>{subIndex + 1}</span>
                                                                                <div className='info'>
                                                                                    <div className='artist-name'><NameUser user={subItem.user} /></div>
                                                                                    <span> - </span>
                                                                                    <div className='song-name'><NameSong song={subItem} /></div>
                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        </div>
                                                    </CustomScrollbars>
                                                }

                                            </div>
                                            <div className='actions'>
                                                <div className='actions-container'>
                                                    <div className='like' >
                                                        <LikePlayList
                                                            idPlayList={item.id}
                                                        ></LikePlayList>
                                                        <div><CountLikedPLayList idPlayList={item.id}></CountLikedPLayList></div>
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
        searchAlbum: state.album.searchAlbum
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchSongByName: (name) => dispatch(actions.SearchSongByNameStart(name))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album));