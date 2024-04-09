import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';

import HomeHeader from '../HomePage/HomeHeader';

import HomeFooter from '../HomePage/HomeFooter';
import MusicPlayer from '../Partial/MusicPlayer';


import "./AlbumMusic.scss";

class AlbumMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailAlbum: {}
        }
    }

    componentDidMount() {
        this.props.getDetailSong(this.props.match.params.album)
        // this.setState({
        //     detailAlbum: { ...this.props.detailAlbum }
        // })

    }

    async componentDidUpdate(preProps, prevState) {
        if (this.props.detailAlbum != preProps.detailAlbum) {
            this.setState({
                detailAlbum: { ...this.props.detailAlbum }
            })
        }
    }

    render() {
        console.log(this.state);
        let { detailAlbum } = this.state
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className='album-container'>
                    <div className='album-content-left'>
                        <img className='thumbnail' src={detailAlbum.thumbnail}></img>
                        <div className='info'>
                            <h3 className='name'>{detailAlbum.name}</h3>
                            <span className='create'>
                                <span>Create at: </span>
                                <span className='create-at'>{moment.utc(detailAlbum.createAt).format("DD/MM/YYYY")}</span>
                            </span>
                            <span className='artist'></span>
                            <span className='liked'>1k</span>
                        </div>
                    </div>
                    <div className='album-content-right'>
                        <div className=''>
                            <div className='album-list-song'>
                                <div className='album-list-title'>
                                    <span>Bai hat</span>
                                    <span>Tac gia</span>
                                    <span>Thoi gian</span>
                                </div>
                                <div className='list-song-container'>
                                    {

                                        detailAlbum.songList &&
                                        detailAlbum.songList.map((item, index) => {
                                            return (
                                                <div className='list-song' key={item.id}>
                                                    <div className='col-1'>
                                                        <span><i className="fas fa-music"></i></span>
                                                        <img src={item.image} alt='thumbnail' className='img-music'></img>
                                                        <span className='artist-music'>
                                                            <span className='artist-name'>{item.name}</span>
                                                            <span>{item.user && item.user.name}</span>
                                                        </span>
                                                    </div>
                                                    <div className='col-2'>

                                                    </div>
                                                    <div className='col-3'>
                                                        {moment.utc(item.durationTime * 1000).format("mm:ss")}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='album-player'>
                    <MusicPlayer />
                </div>

            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        detailAlbum: state.album.detailAlbum,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailSong: (id) => dispatch(actions.getDetailAlbumStart(id)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumMusic));