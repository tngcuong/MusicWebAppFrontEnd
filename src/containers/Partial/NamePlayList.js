import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./NamePlayList.scss";
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';

class NamePlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: {}
        };
    }

    componentDidMount() {
        this.setState({ playlist: { ...this.props.playlist } });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.playlist !== prevProps.playlist) {
            this.setState({ playlist: { ...this.props.playlist } });
        }
    }

    goProfile = (id) => {
        this.props.history.push(`/details-album/${id}`)
    }

    render() {
        const { playlist } = this.state

        return (
            <>
                <a
                    href={`/details-album/${playlist.id}`}
                    className='playlist-username'
                    onClick={(e) => {
                        e.preventDefault();
                        this.goProfile(playlist.id);
                    }}
                >
                    {playlist && playlist.name}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NamePlayList));