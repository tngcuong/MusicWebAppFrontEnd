import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import moment from 'moment';

import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../components/CustomScrollbars';
import HomeFooter from '../HomePage/HomeFooter';
import MusicPlayer from '../Partial/MusicPlayer';
import CountLikedPLayList from '../Partial/CountLikedPLayList';
import LikePlayList from '../Partial/LikePlayList';
import FollowBtn from '../Partial/FollowBtn';
import { getRandomColor, totalTime, calcuDate } from '../../components/HOC/RandomColor';


import "./Comment.scss";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [],
            content: "",
            hoveredCommentId: null
        }
    }

    componentDidMount() {
        this.props.getCommentBySong(this.props.songId)
        this.setState({
            comment: [...this.props.commentSong]
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['content']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.addComment !== preProps.addComment || preProps.isReload !== this.props.isReload) {
            this.props.getCommentBySong(this.props.songId)
        }

        if (this.props.commentSong !== preProps.commentSong) {
            this.setState({
                comment: [...this.props.commentSong]
            });
        }

        if (this.props.songId != preProps.songId) {
            this.props.getCommentBySong(this.props.songId)
        }

    }

    handleAddComment = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.handleAddComment({
                userId: this.props.currentUser.id,
                songId: this.props.songId,
                content: this.state.content
            })
        }
        this.setState({
            content: ""
        })
    }

    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    handleDeleteComment = (id) => {
        this.props.deleteComment(id)
    }

    render() {
        let { comment, content, hoveredCommentId } = this.state
        let { currentUser, isLoggedIn, intl } = this.props

        return (
            <>
                <div className="comment-container">
                    {isLoggedIn == true &&
                        <div className='action'>
                            <div className="avatar">
                                <img src={currentUser.avatar} alt={currentUser.name} className="avatar-image" />
                            </div>
                            <input
                                value={this.state.content}
                                type="text"
                                onChange={(e) => this.handleContent(e)}
                                placeholder={intl.formatMessage({ id: 'comment.write' })}
                                className="comment-input" />
                            <button className="send-button" onClick={() => this.handleAddComment()}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M22 2L11 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M22 2L15 22 11 13 2 9 22 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>}

                    <div className="comment-list">
                        {comment && comment.length > 0 && comment.map((item, index) => {
                            return (
                                <div
                                    className='comment'
                                    onMouseEnter={() => this.setState({ hoveredCommentId: item.id })} // Thiết lập hoveredCommentId khi hover
                                    onMouseLeave={() => this.setState({ hoveredCommentId: null })} // Đặt lại hoveredCommentId khi không hover
                                >
                                    <div className="avatar">
                                        <img src={item.user?.avatar} alt={item.user?.name} className="avatar-image" />
                                        <div className="avatar-fallback">{item.user?.name}</div>
                                    </div>
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <div className="username">{item.user?.name}</div>
                                            <div className="timestamp">{calcuDate(item.createAt)} ago</div>
                                        </div>
                                        <div className="comment-text">
                                            {item.isApproved == false ? intl.formatMessage({ id: 'comment.approve' }) : item.content}
                                        </div>
                                        {currentUser.id === item.user.id && hoveredCommentId == item.id && (
                                            <button className="delete-icon" onClick={() => this.handleDeleteComment(item.id)}>
                                                { }
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        isPlaying: state.album.isPlaying,
        currentUser: state.user.currentUser,
        detailSong: state.song.detailSong,
        addComment: state.comment.addComment,
        commentSong: state.comment.commentSong,
        isReload: state.comment.isReload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailAlbum: (id) => dispatch(actions.getDetailAlbumStart(id)),
        getAlbumByUserId: (id) => dispatch(actions.getAlbumByUserIdStart(id)),
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        getDetailSong: (id) => dispatch(actions.getSongByIdStart(id)),
        getCommentBySong: (id) => dispatch(actions.GetCommentBySongStart(id)),
        handleAddComment: (data) => dispatch(actions.AddCommentStart(data)),
        deleteComment: (id) => dispatch(actions.DeleteCommentStart(id))
    };
};
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Comment));