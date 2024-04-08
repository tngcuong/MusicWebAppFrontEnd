import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./MusicPlayer.scss";
import * as actions from '../../store/actions';
import moment from 'moment';


let intervalId
class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: {},
            sourceMusic: new Audio(),
            timeRef: React.createRef(),
            currentTime: 0,
            progressRef: React.createRef()
        };

    }

    getCurrentTime = () => {

        if (this.props.isPlaying === true) {
            intervalId = setInterval(() => {
                let percent = Math.round(this.state.sourceMusic.currentTime * 10000 / this.state.sourceMusic.duration) / 100;
                this.state.timeRef.current.style.cssText = `right: ${100 - percent}%`;
                this.setState({
                    currentTime: this.state.sourceMusic.currentTime
                })
            }, 200)
        } else {
            clearInterval(intervalId)
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.song != prevProps.song) {
            this.state.sourceMusic.pause()
            this.setState({
                currentSong: { ...this.props.song },
                sourceMusic: new Audio(this.props.song.source),
                currentTime: 0
            }, () => {
                this.state.sourceMusic.load()
                this.props.playSong(true)
                this.state.sourceMusic.play()
            })
        }


        if (this.props.isPlaying != prevProps.isPlaying) {
            this.props.playSong(this.props.isPlaying)
            const { isPlaying } = this.props;
            if (isPlaying) {
                this.state.sourceMusic.play()
                this.getCurrentTime()
            } else {
                this.state.sourceMusic.pause()
            }
        }
    }


    async componentDidMount() {
        this.setState({
            currentSong: { ...this.props.song },
            sourceMusic: new Audio(this.props.song.source)
        }, () => {
            this.state.sourceMusic.load()
            this.props.playSong(false)
        })
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

    handlePlayMusic = () => {
        const { isPlaying } = this.props;
        let play = !isPlaying
        this.props.playSong(play)

        if (play) {
            this.state.sourceMusic.play()
        } else {
            this.state.sourceMusic.pause()
        }
    };

    handlePrevSong = () => {

    }

    handleNextSong = () => {

    }

    handleProgress = (e) => {
        const progressRect = this.state.progressRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - progressRect.left) * 10000 / progressRect.width) / 100
        this.state.timeRef.current.style.cssText = `right: ${100 - percent}%`;
        let currentTime = this.state.currentSong.durationTime * percent / 100
        this.setState({
            currentTime: currentTime,
        })
        this.state.sourceMusic.currentTime = currentTime
    }

    render() {
        const { currentSong } = this.state;
        const { isPlaying } = this.props;

        return (
            <>
                {currentSong &&
                    <div className='player-container'>
                        <div className='player-left'>
                            <div className='bg-image section-slider' style={{
                                width: "5rem",
                                height: "5rem",
                                backgroundImage: `url("${currentSong?.image}")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </div>
                            {/* <img src={currentSong?.image} alt={currentSong?.name}></img> */}
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
                                    <i className="fas fa-step-backward"
                                        onClick={() => { this.handlePrevSong() }}
                                    ></i>
                                </span>
                                <span className='play-btn' onClick={() => { this.handlePlayMusic() }}>
                                    {isPlaying === true ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
                                </span>
                                <span>
                                    <i className="fas fa-step-forward"
                                        onClick={() => { this.handleNextSong() }}
                                    ></i>
                                </span>
                                <span title='phat lai'>
                                    <i className="fas fa-redo-alt"></i>
                                </span>
                            </div>
                            <div className='progress'>
                                <span className='time-left'>{moment.utc(this.state.currentTime * 1000).format("mm:ss")}</span>
                                <div className='progress-down'
                                    ref={this.state.progressRef}
                                    onClick={(e) => { this.handleProgress(e) }}
                                >
                                    <div ref={this.state.timeRef} className='progress-up'></div>
                                </div>
                                <span className='time-right'>{moment.utc(this.state.currentSong.durationTime * 1000).format("mm:ss")}</span>
                            </div>
                        </div>
                        <div className='player-right'>

                        </div>
                    </div >
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
        playSong: (flag) => dispatch(actions.playMusic(flag)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);