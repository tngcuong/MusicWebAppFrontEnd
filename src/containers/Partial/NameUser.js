import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./NameUser.scss";
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';

class NameUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        this.setState({ user: { ...this.props.user } });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user !== prevProps.user) {
            this.setState({ user: { ...this.props.user } });
        }
    }

    goProfile = (id) => {
        this.props.history.push(`/profile/${id}`)
    }

    render() {
        const { user } = this.state
        return (
            <>
                <a
                    href={`/profile/${user.id}`}
                    className='song-username'
                    onClick={(e) => {
                        e.preventDefault();
                        this.goProfile(user.id);
                    }}
                >
                    {user && user.name}
                </a>
            </>
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

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NameUser));