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
            if (this.props.result !== null) {
                this.setState({
                    item: { ...this.props.item },
                    playlist: [...this.props.result],
                }, this.checkChecked);
            } else {
                this.setState({
                    item: { ...this.props.item },
                    playlist: [...this.props.playlist.songList],
                }, this.checkChecked);
            }

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

    }

    handleCheckboxClick = () => {
        const { item, playlist } = this.state;
        let { result } = this.props
        let newPlaylist;
        if (result !== null) {
            if (result.find(i => i.id === item.id)) {
                newPlaylist = result.filter(i => i.id !== item.id);
            } else {
                newPlaylist = [...result, item];
            }

            this.setState({
                playlist: newPlaylist,
                isChecked: !this.state.isChecked
            }, () => {
                this.props.updatePlayList(newPlaylist);
            });
        } else {
            if (playlist.find(i => i.id === item.id)) {
                newPlaylist = playlist.filter(i => i.id !== item.id);
            } else {
                newPlaylist = [...playlist, item];
            }

            this.setState({
                playlist: newPlaylist,
                isChecked: !this.state.isChecked
            }, () => {
                this.props.updatePlayList(this.state.playlist);
            });
        }

    }

    render() {
        console.log(this.state.playlist);
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
