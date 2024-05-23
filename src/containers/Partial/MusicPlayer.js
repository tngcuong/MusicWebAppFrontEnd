import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./MusicPlayer.scss";
import * as actions from '../../store/actions';
import moment from 'moment';
import PlayList from './PlayList';
import Loader from "../../components/Loader";
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'
import { likeSong } from '../../services/songService';
import LikeSong from './LikeSong';
import { withRouter } from 'react-router';

let intervalId
class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: {},
            sourceMusic: new Audio(),
            timeRef: React.createRef(),
            currentTime: 0,
            progressRef: React.createRef(),
            isOpenModal: false,
            volume: 100,
            isRepeat: 0,
            isShuffle: false,
            isLoading: false,
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
        if (this.props.isPlaying != prevProps.isPlaying) {
            this.props.playSong(this.props.isPlaying)
            const { isPlaying } = this.props;
            if (isPlaying === true) {
                this.checkLoadMusic()
                this.getCurrentTime()
                this.endMusic()
            } else {
                // let percent = Math.round(this.state.sourceMusic.currentTime * 10000 / this.state.sourceMusic.duration) / 100;
                // this.state.timeRef.current.style.cssText = `right: ${100 - percent}%`;
                this.state.sourceMusic.pause()
                this.endMusic()
                clearInterval(intervalId)
            }
        }

        if (this.props.song != prevProps.song) {
            this.state.sourceMusic.pause()
            this.setState({
                currentSong: { ...this.props.song },
                sourceMusic: new Audio(this.props.song.source),
                currentTime: 0
            }, () => {

            })
            await this.state.sourceMusic.load()
            this.props.playSong(true)
            await this.checkLoadMusic()

            this.endMusic()
        }

        if (this.state.volume != prevState.volume) {
            this.state.sourceMusic.volume = this.state.volume / 100
        }

        if (this.props.currentUser !== prevProps.currentUser) {

        }

    }

    endMusic = () => {
        const handleEndMusic = () => {
            let { currentAlbum, song } = this.props
            let { isShuffle, isRepeat } = this.state
            if (isRepeat === 1) {
                this.handleRepeatSong()
            } else if (isRepeat === 2 || isRepeat === 0) {
                if (isShuffle === true) {
                    this.handleShuffle()
                } else {
                    if (song && currentAlbum.length > 0 && this.checkSongIsLast(song, currentAlbum) === false) {
                        let index = currentAlbum.findIndex(item => JSON.stringify(this.props.song) === JSON.stringify(item))
                        this.props.setCurrentSong(currentAlbum[index + 1])
                    } else {
                        if (isRepeat === 2) {
                            this.handleRepeatAlbum()
                        }
                        this.state.timeRef.current.style.cssText = `right: 100%`;
                        this.setState({
                            currentTime: 0,
                        })
                        this.state.sourceMusic.currentTime = 0
                        this.props.playSong(false)
                    }
                }
            }



        }

        this.state.sourceMusic.addEventListener("ended", handleEndMusic)
        return this.state.sourceMusic.addEventListener("ended", handleEndMusic)
    }

    handleShuffle = () => {
        let { currentAlbum, song } = this.props
        const randomIndex = Math.floor(Math.random() * currentAlbum?.length)
        if (randomIndex === -1) {
            randomIndex = 0
        }
        this.props.setCurrentSong(currentAlbum[randomIndex])
    }

    handleRepeatSong = () => {
        this.state.sourceMusic.play()
    }

    handleRepeatAlbum = () => {
        let { currentAlbum } = this.props
        this.props.setCurrentSong(currentAlbum[0])
    }

    checkLoadMusic = async () => {
        let source = this.state.sourceMusic;
        source.play()
        this.setState({
            isPlaying: true
        })
        source.addEventListener("canplaythrough", () => {
            this.setState({
                isPlaying: false
            })
        });
    }

    async componentDidMount() {
        let { isFirstMount } = this.props
        if (isFirstMount === false) {
            this.props.firstMount()
            this.setState({
                currentSong: { ...this.props.song },
                sourceMusic: new Audio(this.props.song.source)
            }, () => {

            })
            this.state.sourceMusic.load()
            this.props.playSong(false)
            this.endMusic()
        }

    }

    checkToPlay() {
        const { isPlaying } = this.props;
        if (isPlaying) {
            this.checkLoadMusic()
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
            this.checkLoadMusic()
        } else {
            this.state.sourceMusic.pause()
        }
    };

    openPlayList = () => {
        this.toggleSongModal()
    }

    handlePrevSong = () => {
        let { currentAlbum, song } = this.props
        if (song && currentAlbum && this.checkSongIsFirst(song, currentAlbum) === false) {
            let index = currentAlbum.findIndex(item => JSON.stringify(this.props.song) === JSON.stringify(item))
            this.props.setCurrentSong(currentAlbum[index - 1])
        }
    }

    checkSongIsLast = (item, array) => {
        if (JSON.stringify(array[array.length - 1]) === JSON.stringify(item)) {
            return true
        }
        return false
    }

    checkSongIsFirst = (item, array) => {
        if (JSON.stringify(array[0]) === JSON.stringify(item)) {
            return true
        }
        return false
    }

    handleNextSong = () => {
        let { currentAlbum, song } = this.props
        if (this.state.isShuffle === true) {
            this.handleShuffle()
        } else if (song && currentAlbum && this.checkSongIsLast(song, currentAlbum) === false) {
            let index = currentAlbum.findIndex(item => JSON.stringify(this.props.song) === JSON.stringify(item))
            this.props.setCurrentSong(currentAlbum[index + 1])
        }

    }

    toggleShuffle = () => {
        this.setState({
            isShuffle: !this.state.isShuffle
        })
    }

    toggleRepeat = () => {
        this.setState({
            isRepeat: this.state.isRepeat === 2 ? 0 : this.state.isRepeat + 1
        })
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

    toggleSongModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    handleChangeVolume = (e) => {
        this.setState({
            volume: e.target.value
        })
    }

    toggleVolume = () => {
        if (this.state.volume === 0) {
            this.setState({
                volume: 70
            })
        } else {
            this.setState({
                volume: 0
            })
        }
    }

    goProfile = (id) => {
        this.props.history.push(`/profile/${id}`)
    }

    componentWillUnmount() {
        clearInterval(intervalId)
        this.setState({
            currentTime: 0
        })
        this.props.playSong(false)
        this.state.sourceMusic.pause()
    }

    render() {
        const { currentSong, volume, isShuffle, isRepeat } = this.state;
        const { isPlaying, song, isShowPlayer, currentUser } = this.props;
        const { intl } = this.props;

        return (
            <>
                {isShowPlayer === true &&
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
                                <span className='song-username' onClick={() => { this.goProfile(currentSong?.user.id) }} >{currentSong.user && currentSong.user.name}</span>
                            </div>
                            <LikeSong idSong={currentSong.id}></LikeSong>
                            {/* <div>
                                <span>
                                    {currentUser && currentUser.listSong && currentUser.listSong.includes(currentSong.id) ?
                                        <i className="fas fa-heart" onClick={() => this.unLikeSong()}></i>
                                        :
                                        <i className="far fa-heart" onClick={() => this.likeSong()} ></i>
                                    }

                                </span>

                            </div> */}
                        </div>
                        <div className='player-center'>
                            <div className='player-action'>
                                {isShuffle === true ?
                                    <span title={intl.formatMessage({ id: 'player.random' })} onClick={() => { this.toggleShuffle() }} style={{ color: "purple" }}>
                                        <i className="fas fa-random"></i>
                                    </span>
                                    :
                                    <span title={intl.formatMessage({ id: 'player.random' })} onClick={() => { this.toggleShuffle() }}>
                                        <i className="fas fa-random"></i>
                                    </span>}
                                {this.props.currentAlbum?.length > 0 && this.checkSongIsFirst(this.props.song, this.props.currentAlbum) === false ?
                                    <span title={intl.formatMessage({ id: 'player.back' })}>
                                        <i className="fas fa-step-backward"
                                            onClick={() => { this.handlePrevSong() }}
                                        ></i>
                                    </span>
                                    :
                                    <span style={{ opacity: "0.3" }} title={intl.formatMessage({ id: 'player.back' })}>
                                        <i className="fas fa-step-backward"

                                        ></i>
                                    </span>
                                }


                                <span className='play-btn' onClick={() => { this.handlePlayMusic() }} >
                                    {isPlaying === true ? <i className="fas fa-pause" title={intl.formatMessage({ id: 'player.pause' })}></i> : <i className="fas fa-play" title={intl.formatMessage({ id: 'player.play' })}></i>}
                                </span>
                                {this.props.currentAlbum?.length > 0 && this.checkSongIsLast(this.props.song, this.props.currentAlbum) === false ?
                                    <span title={intl.formatMessage({ id: 'player.next' })}>
                                        <i className="fas fa-step-forward"
                                            onClick={() => { this.handleNextSong() }}
                                        ></i>
                                    </span>
                                    :
                                    <span title={intl.formatMessage({ id: 'player.next' })}>
                                        <i className="fas fa-step-forward" style={{ opacity: "0.3" }}
                                        ></i>
                                    </span>
                                }
                                {isRepeat === 1 &&
                                    <span title={intl.formatMessage({ id: 'player.repeat.song' })} onClick={() => { this.toggleRepeat() }} className='repeat1' style={{ color: "purple" }} >
                                        <i className="fas fa-redo-alt"></i>
                                    </span>
                                }
                                {isRepeat === 2 &&
                                    <span title={intl.formatMessage({ id: 'player.repeat.playList' })} onClick={() => { this.toggleRepeat() }} style={{ color: "purple" }}>
                                        <i className="fas fa-redo-alt"></i>
                                    </span>

                                }
                                {isRepeat === 0 &&
                                    <span title={intl.formatMessage({ id: 'player.repeat.repeat' })} onClick={() => { this.toggleRepeat() }}  >
                                        <i className="fas fa-redo-alt"></i>
                                    </span>
                                }
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
                            <div className='volume'>
                                <span onClick={() => this.toggleVolume()}>{+volume === 0 ? <i className="fas fa-volume-off" title={intl.formatMessage({ id: 'player.volume' })}></i> : <i className="fas fa-volume-up" title={intl.formatMessage({ id: 'player.mute' })}></i>}</span>

                                <input type='range' step={1} min={0} max={100} value={volume} onChange={(e) => { this.handleChangeVolume(e) }}></input>
                            </div>
                            <div>
                                <div className='album' onClick={() => { this.openPlayList() }}><i className="fas fa-stream"></i>
                                </div>
                                {this.state.isOpenModal && <PlayList
                                    toggleFromParent={this.toggleSongModal}
                                    isOpen={this.state.isOpenModal}
                                    size="xl"
                                ></PlayList>}
                            </div>
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
        currentAlbum: state.album.currentAlbum,
        isFirstMount: state.song.firstMount,
        isShowPlayer: state.song.isShowPlayer,
        currentUser: state.user.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        firstMount: () => dispatch(actions.firstMount()),
        likeSong: (idUser, idSong) => dispatch(actions.likeSongStart(idUser, idSong)),
        unLikeSong: (idUser, idSong) => dispatch(actions.unLikeSongStart(idUser, idSong)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(MusicPlayer)));