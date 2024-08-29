import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./NameSong.scss";
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';

class NameSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: {}
        };
    }

    componentDidMount() {
        this.setState({ song: { ...this.props.song } });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.song !== prevProps.song) {
            this.setState({ song: { ...this.props.song } });
        }
    }

    goProfile = (id) => {
        this.props.history.push(`/details-song/${id}`)
    }

    render() {
        const { song } = this.state

        return (
            <>
                <a
                    href={`/details-song/${song.id}`}
                    className='song-username'
                    onClick={(e) => {
                        e.preventDefault();
                        this.goProfile(song.id);
                    }}
                >
                    {song && song.name}
                </a>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        likeSong: (idUser, idSong) => dispatch(actions.likeSongStart(idUser, idSong)),
        unLikeSong: (idUser, idSong) => dispatch(actions.unLikeSongStart(idUser, idSong)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NameSong));