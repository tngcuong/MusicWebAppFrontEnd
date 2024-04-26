import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./PlayList.scss";
import * as actions from '../../store/actions';
import moment from 'moment';
import CustomScrollbars from '../../components/CustomScrollbars';


class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemRef: React.createRef()
        }
    }

    componentDidMount() {

    }

    playSong = (item) => {
        let { song, isPlaying } = this.props
        if (JSON.stringify(this.props.song) !== JSON.stringify(item)) {
            this.props.setCurrentSong(item)
        } else {
            this.props.playSong(!isPlaying)
        }

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    render() {
        return (
            <div className='playList-container'>
                <div className='header-playList'>
                    <span className='next-playList'>Next Up</span>
                    <button className='btn-clear'>Clear</button>
                    <button className='btn-close' onClick={() => { this.toggle() }}></button>
                </div>
                <CustomScrollbars style={{ width: '100%' }}>
                    <div className='content-playList'>
                        {
                            this.props.currentAlbum?.length > 0 &&
                            this.props.currentAlbum.map((item, index) => {
                                return (
                                    <div key={item.id} onClick={() => { this.playSong(item) }}>
                                        {JSON.stringify(this.props.song) !== JSON.stringify(item) ?
                                            <div className='list-song' ref={this.state.itemRef}
                                                style={{
                                                    opacity: "0.5"
                                                }}
                                            >
                                                <div className='user-album-thumbnail' style={{
                                                    backgroundImage: `url("${item.image}")`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}>
                                                </div>

                                                <div className='user-album-info'>
                                                    <div className='artist'>
                                                        {item.user.name}
                                                    </div>
                                                    <div className='user-album-name'>
                                                        {item.name}
                                                    </div>
                                                </div>
                                                <div className='current-play'>
                                                    {moment.utc(item.durationTime * 1000).format("mm:ss")}
                                                </div>
                                            </div>
                                            : <div className='list-song' ref={this.state.itemRef} style={{
                                                backgroundColor: '#f2f2f2',
                                                opacity: "1"
                                            }} >
                                                <div className='user-album-thumbnail' style={{
                                                    backgroundImage: `url("${item.image}")`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                }}>
                                                </div>

                                                <div className='user-album-info'>
                                                    <div className='artist'>
                                                        {item.user.name}
                                                    </div>
                                                    <div className='user-album-name'>
                                                        {item.name}
                                                    </div>
                                                </div>
                                                <div className='current-play'>
                                                    {moment.utc(item.durationTime * 1000).format("mm:ss")}
                                                </div>
                                            </div>}

                                    </div>

                                )
                            })

                        }
                    </div>
                </CustomScrollbars>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);