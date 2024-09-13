import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as actions from '../../store/actions';
import { LANGUAGES } from '../../utils';
import Loader from '../../components/Loader';
import "./Search.scss"
import { withRouter } from 'react-router';
import { result } from 'lodash';
import HomeHeader from '../HomePage/HomeHeader';
import Song from './Song';
import Album from './Album';
import People from './People';

class AddSongToPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: true,
            people: false,
            album: false,
            searchText: "",
        };

    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.s !== prevProps.match.params.s) {
            this.props.searchSongByName(this.props.match.params.s)
            this.props.searchPeopleByName(this.props.match.params.s)
            this.props.searchAlbumByName(this.props.match.params.s)
            this.setState({
                searchText: this.props.match.params.s,
            })
        }
    }

    componentDidMount() {
        this.props.searchSongByName(this.props.match.params.s)
        this.props.searchPeopleByName(this.props.match.params.s)
        this.props.searchAlbumByName(this.props.match.params.s)
        this.setState({
            searchText: this.props.match.params.s
        })
        this.props.showPlayer(true)
    }

    handleChangePage = (id) => {
        let updatedState = { ...this.state };
        let i = 1;
        updatedState[id] = true;
        Object.keys(updatedState).forEach(key => {
            if (key !== id && i <= 3) {
                updatedState[key] = false;
            }
            i += 1;
        });
        this.setState({ ...updatedState });
    }



    render() {
        let { song, people, album, searchText } = this.state
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='search-container'>
                    <div className='search'>
                        <div className='search-up-container'>
                            <div className='search-up'>
                                <h3>Search results for “{searchText}”</h3>
                            </div>
                        </div>
                        <div className='search-down-container'>
                            <div className='search-down'>
                                <div className='search-menu-container'>
                                    <div className='search-menu'>
                                        <ul className='list-menu'>
                                            <li className={`list-menu-item ${song === true ? "m-active" : ""}`} onClick={() => { this.handleChangePage("song") }}>
                                                <div className='list-menu-item-content'>
                                                    <p style={{
                                                        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo=")`,
                                                        backgroundPosition: 'center center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }} className='icon'></p>
                                                    <p>Songs</p>
                                                </div>

                                            </li>
                                            <li className={`list-menu-item ${people === true ? "m-active" : ""}`} onClick={() => { this.handleChangePage("people") }}>
                                                <div className='list-menu-item-content'>
                                                    <i className="fas fa-user-friends icon"></i>
                                                    <p>People</p>
                                                </div>

                                            </li>
                                            <li className={`list-menu-item ${album === true ? "m-active" : ""}`} onClick={() => { this.handleChangePage("album") }}>
                                                <div className='list-menu-item-content'>
                                                    <p className='icon' style={{
                                                        backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzLjEgKDM5MDEyKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19wbGF5bGlzdF8xODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzLz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpY19wbGF5bGlzdCIgZmlsbD0icmdiKDE1MywgMTUzLCAxNTMpIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIHg9IjAiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIvPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgtMiIgZmlsbC1vcGFjaXR5PSIwLjciIHBvaW50cz0iMyAwIDE0IDAgMTQgMTAgMTIgMTAgMTIgMiAzIDIiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)',
                                                        backgroundPosition: 'center center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}></p>
                                                    <p>Playlists</p>
                                                </div>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='search-content-container'>
                                    {
                                        song === true && <Song />
                                    }
                                    {
                                        album === true && <Album />
                                    }
                                    {
                                        people === true && <People />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoadingAlbum: state.album.isLoading,
        relatedSong: state.song.relatedSong,
        isFailed: state.album.isFailed,
        searchSong: state.song.searchSong
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRelatedSong: (userId) => dispatch(actions.getRelatedSongStart(userId)),
        updatePlayList: (data) => dispatch(actions.AddSongToAlbumStart(data)),
        searchSongByName: (name) => dispatch(actions.SearchSongByNameStart(name)),
        searchPeopleByName: (name) => dispatch(actions.SearchPeopleByNameStart(name)),
        searchAlbumByName: (name) => dispatch(actions.SearchAlbumByNameStart(name)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSongToPlayList));
