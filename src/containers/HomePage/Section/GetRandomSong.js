import React, { Component } from "react";
import "./GetRandomSong.scss";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import CountFollower from "../../Partial/CountFollower";
import NameSong from "../../Partial/NameSong";
import NameUser from "../../Partial/NameUser";
import CountLike from "../../Partial/CountLiked"

class GetRandomSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSongs: [],
            refresh: false
        }
    }

    componentDidMount() {
        this.props.getRandomSong(3);
    }

    refreshRandomUser = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.randomSong !== this.props.randomSong) {
            this.setState({
                arrSongs: [...this.props.randomSong]
            })
        }

        if (prevState.refresh !== this.state.refresh) {
            this.props.getRandomSong(3);
        }
    }

    handleViewAll = () => {
        this.props.history.push(`/search/`)
    }

    render() {
        const { arrSongs } = this.state

        return (
            <div className="container-down">
                <div className="container-down-header">
                    <div><i className="fas fa-music"></i> <FormattedMessage id={"feature.song-maybe-like"} /></div>
                    <div className="view-all" onClick={() => { this.handleViewAll() }}><FormattedMessage id={"feature.view-all"} /></div>
                </div>
                {arrSongs && arrSongs.map((item, index) => {
                    return (
                        <div key={item.id} className="container">
                            <div className="container-down-content">
                                <div className='track-avatar' style={{
                                    backgroundImage: `url("${item.image}")`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}></div>
                                <div className='artist-info'>
                                    <div className="name">{item.user && <NameUser user={item.user} />}</div>
                                    <div className="name-song"><NameSong song={item} /></div>
                                    <div className="like"><i className="fas fa-heart"></i> <CountLike idSong={item.id} /></div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        randomSong: state.song.randomSong,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRandomSong: (size) => dispatch(actions.GetRandomSongStart(size))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GetRandomSong));