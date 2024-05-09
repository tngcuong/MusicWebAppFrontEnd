import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./CountLiked.scss";
import * as actions from '../../store/actions';
import { countLiked } from '../../services/songService';

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
    }

    countLiked = async () => {
        const { idSong } = this.props;
        try {
            let data = await countLiked(idSong)
            console.log(data);
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
        isLiked: state.song.isLiked,
        numberCount: state.song.numberCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        countLike: (idSong) => dispatch(actions.getCountNumberStart(idSong)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountLiked);