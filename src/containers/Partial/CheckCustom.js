import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./CheckCustom.scss";
import * as actions from '../../store/actions';

class CheckCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            item: {},
            playlist: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.checkChecked();
        }

        if (this.state.playlist !== prevState.playlist) {
            this.checkChecked();

        }
    }

    componentDidMount() {
        this.setState({
            item: { ...this.props.item },
            playlist: [...this.props.playlist.songList],
        }, this.checkChecked);
    }

    checkChecked = () => {
        const { item, playlist } = this.state;
        if (playlist.find(i => i.id === item.id)) {
            this.setState({
                isChecked: true
            });
        } else {
            this.setState({
                isChecked: false
            });
        }
        console.log(this.state.playlist);
        this.props.setIdPlaylist(this.props.playlist.id)
    }

    handleCheckboxClick = () => {
        const { item, playlist } = this.state;
        if (playlist.find(i => i.id === item.id)) {
            const playlistNew = playlist.filter(i => i.id !== item.id);
            this.setState({
                playlist: playlistNew,
                isChecked: false
            });
        } else {
            const playlistNew = [...playlist, item];
            this.setState({
                playlist: playlistNew,
                isChecked: true
            });
        }
        let playlistNew = playlist.map(obj => obj.id)
        this.props.updatePlayList(playlistNew)
    }

    render() {
        const { isChecked } = this.state;
        return (
            <div
                className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
                onClick={this.handleCheckboxClick}
            ></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // Add your state mappings here if needed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Add your dispatch mappings here if needed
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckCustom);
