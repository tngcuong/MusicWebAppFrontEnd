import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./MusicPlayer.scss";
import * as actions from '../../store/actions';

class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: {},
            sourceMusic: new Audio()
        };
    }



    async componentDidUpdate(prevProps, prevState) {
        if (this.props.song != prevProps.song) {
         this.state.sourceMusic.pause()
            this.setState({
                currentSong: { ...this.props.song },
                sourceMusic: new Audio(this.props.song.source)
            }, () => {
                this.props.playSong(true)
            })
        }
        this.checkToPlay()
    }


    componentDidMount() {
        this.setState({
            currentSong: { ...this.props.song },
            sourceMusic: new Audio(this.props.song.source)
        }, () => { this.props.playSong(false) })

    }

    checkToPlay() {
        const { isPlaying } = this.props;
        if (isPlaying) {
            this.state.sourceMusic.play()
        } else {
            this.state.sourceMusic.pause()
        }
    }

    // async handlePlayMusic() {
    //     await this.setState({
    //         isPlaying: !this.state.isPlaying
    //     }, () => { this.props.playSong(this.state.isPlaying) })
    // }

    handlePlayMusic =  () => {
        const { isPlaying } = this.props;
        let play = !isPlaying
         this.props.playSong(play)

        if (play) {
             this.state.sourceMusic.play()
        } else {
             this.state.sourceMusic.pause()
        }
    };


    render() {
        const { currentSong } = this.state;
        const { isPlaying } = this.props;
        console.log(this.props);
        return (
            <>
                {currentSong &&
                    <div className='player-container'>
                        <div className='player-left'>
                            <img src={currentSong?.image} alt={currentSong?.name}></img>
                            <div className='info'>
                                <span className='song-name'>{currentSong?.name}</span>
                                <span className='song-username'>{currentSong?.userId}</span>
                            </div>
                            <div>
                                <span>
                                    <i className="far fa-heart"></i>
                                </span>

                            </div>
                        </div>
                        <div className='player-center'>
                            <div className='player-action'>
                                <span title='phat ngau nhien'>
                                    <i className="fas fa-random"></i>
                                </span>
                                <span>
                                    <i className="fas fa-step-backward"></i>
                                </span>
                                <span className='play-btn' onClick={() => { this.handlePlayMusic() }}>
                                    {isPlaying === true ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                                </span>
                                <span>
                                    <i className="fas fa-step-forward"></i>
                                </span>
                                <span title='phat lai'>
                                    <i className="fas fa-redo-alt"></i>
                                </span>
                            </div>
                            <div>
                                b

                            </div>
                        </div>
                        <div className='player-right'>

                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        song: state.song.currentSong,
        isPlaying: state.song.isPlaying,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playSong: (flag) => dispatch(actions.playMusic(flag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);