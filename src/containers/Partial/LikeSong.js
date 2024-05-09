import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./LikeSong.scss";
import * as actions from '../../store/actions';

class LikeSong extends Component {
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

    likeSong = async () => {
        const { idSong, currentUser } = this.props;
        await this.props.likeSong(currentUser.id, idSong)
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    unLikeSong = async () => {
        const { idSong, currentUser } = this.props;
        await this.props.unLikeSong(currentUser.id, idSong)
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render() {
        const { idSong, currentUser } = this.props;
        return (
            <div>
                <span>
                    {currentUser && currentUser.listSong && currentUser.listSong.includes(idSong) ?
                        <i className="fas fa-heart" onClick={() => this.unLikeSong()}></i>
                        :
                        <i className="far fa-heart" onClick={() => this.likeSong()} ></i>
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
        isLiked: state.song.isLiked,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        likeSong: (idUser, idSong) => dispatch(actions.likeSongStart(idUser, idSong)),
        unLikeSong: (idUser, idSong) => dispatch(actions.unLikeSongStart(idUser, idSong)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeSong);