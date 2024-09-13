import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./CountLiked.scss";
import * as actions from '../../store/actions';
import { countLiked } from '../../services/albumService';

class CountLiked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countLiked: 0
        };
    }

    async componentDidMount() {
        await this.countLiked()
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.isLiked === !prevProps.isLiked) {
            await this.countLiked()
        }

        if (this.props.idPlayList != prevProps.idPlayList) {
            await this.countLiked()
        }
    }

    countLiked = async () => {
        const { idPlayList } = this.props;
        try {
            let data = await countLiked(idPlayList)
            if (data && data.errorCode === 200) {
                this.setState({
                    countLiked: data.content.liked
                })
            } else {
                console.log("count error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { countLiked } = this.state;
        return (
            <div>
                <span>
                    <p>{countLiked}</p>
                </span>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        song: state.song.currentSong,
        isLiked: state.album.isLiked,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountLiked);