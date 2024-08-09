import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./LikePlayList.scss";
import * as actions from '../../store/actions';

class LikePlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isLiked === !prevState.isLiked) {
            this.props.getCurrentUser()
        }
    }

    toggleLikeSong = async () => {
        const { idPlayList, currentUser } = this.props;
        await this.props.toggleLikePlayList(currentUser.id, idPlayList)
        this.setState({
            isLiked: !this.state.isLiked
        })
    }


    render() {
        const { idPlayList, currentUser } = this.props;
        return (
            <div>
                <span>
                    {currentUser && currentUser.likedPlayList && currentUser.likedPlayList.includes(idPlayList) ?
                        <i className="fas fa-heart" onClick={() => this.toggleLikeSong()}></i>
                        :
                        <i className="far fa-heart" onClick={() => this.toggleLikeSong()} ></i>
                    }
                </span>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        song: state.song.currentSong,
        currentUser: state.user.currentUser,
        isLiked: state.album.isLiked,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleLikePlayList: (idUser, idPlayList) => dispatch(actions.toggleLikeAlbumStart(idUser, idPlayList)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikePlayList);