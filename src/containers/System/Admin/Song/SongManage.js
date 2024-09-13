import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { getAllSongs, getAllSongAdmin } from '../../../../services/songService';
import Loader from '../../../../components/Loader';
import Paging from '../../../../components/Paging/Paging';
import * as actions from '../../../../store/actions';
import ModalAddSong from './ModalAddSong';
import moment from 'moment';
import "./SongManage.scss";

class SongManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSongs: [],
            isOpenModal: false,
            isOpenEditModal: false,
            songEdit: {},
            currentPage: 1,
            pageSize: 5,
            pageCount: 1,
            songsLoaded: false,
        }
    }

    toggleSongModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    getAllSongFromManage = async () => {
        try {
            let res = await getAllSongAdmin(this.state.currentPage, this.state.pageSize);
            if (res && res.errorCode === 200) {
                await this.setState({
                    arrSongs: res.content.data,
                    pageCount: res.content.totalPages
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    handleAddNewSong = () => {
        this.setState({
            isOpenModal: true
        })
    }

    async componentDidMount() {
        this.props.getSongStart(this.state.currentPage, this.state.pageSize)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.songs !== this.props.songs) {
            this.setState({
                arrSongs: [...this.props.songs]
            })
        }

        if (this.state.currentPage !== prevState.currentPage) {
            this.props.getSongStart(this.state.currentPage, this.state.pageSize)
        }

        if (this.props.isApproved !== prevProps.isApproved) {
            this.props.getSongStart(this.state.currentPage, this.state.pageSize)
        }
    }

    handleDeleteSong = (id) => {
        this.props.deleteSongStart(id, this.state.currentPage, this.state.pageSize)
    }

    createNewSong = (data) => {
        this.props.createASong(data, this.state.currentPage, this.state.pageSize)
        this.setState({
            isOpenModal: false
        })
    }

    handleChangePage = async (pageIndex) => {
        await this.setState({
            currentPage: pageIndex
        });
        this.props.getSongStart(this.state.currentPage, this.state.pageSize);
    };


    handleToggleApproval = (id) => {
        this.props.handleToggleApproval(id);
    };


    render() {
        let { arrSongs } = this.state

        return (
            <div className='song-container'>
                <div>{this.props.isLoading === true && <Loader></Loader>}</div>
                {this.state.isOpenModal && <ModalAddSong
                    toggleFromParent={this.toggleSongModal}
                    isOpen={this.state.isOpenModal}
                    size="xl"
                    createSong={this.createNewSong}
                    centered
                ></ModalAddSong>}
                <div className='title text-center'><FormattedMessage id="manage-song.title" /></div>
                <div className='mx-1'>
                    <button
                        onClick={() => { this.handleAddNewSong() }}
                        className='btn btn-primary px-3'><i className="fas fa-user-plus"></i></button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th><FormattedMessage id="manage-song.image" /></th>
                                <th><FormattedMessage id="manage-song.name" /></th>
                                <th><FormattedMessage id="manage-song.creator" /></th>
                                <th><FormattedMessage id="manage-song.createAt" /></th>
                                <th></th>
                                <th><FormattedMessage id="manage-song.approve" /></th>
                                <th><FormattedMessage id="manage-song.action" /></th>
                            </tr>

                            {arrSongs && arrSongs.map((item, index) => {
                                return (
                                    <tr key={item.id} className='user-content'>
                                        <td>{index + 1}</td>
                                        <td style={{ width: "10%", textAlign: "center" }}>
                                            <div
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    backgroundImage: `url(${item.image})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundColor: "#f0f0f0",
                                                    display: "inline-block"
                                                }}
                                            >
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.user?.name}</td>
                                        <td>{item.createAt}</td>
                                        <td style={{ width: "20%", textAlign: "center" }}>
                                            <audio preload='auto' controls >
                                                <source src={item.source} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </td>
                                        <td>
                                            <div className="toggle-switch">
                                                <button
                                                    type="button"
                                                    className={`toggle-button ${item.isPrivate == true ? "bg-primary" : "bg-muted"}`}
                                                    onClick={() => this.handleToggleApproval(item.id)}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`toggle-thumb ${item.isPrivate == true ? "translate-x-5" : "translate-x-0"}`}
                                                    />
                                                </button>
                                                <span className={`toggle-label ${item.isPrivate == true ? "text-primary" : "text-muted-foreground"}`}>
                                                    {item.isPrivate == true ? "Approved" : "UnApproved"}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            {/* <button
                                                onClick={() => { this.handleEditSong(item) }}
                                                className='btn-edit'><i className="fas fa-pen-square"></i></button> */}
                                            <button
                                                onClick={() => { this.handleDeleteSong(item.id) }}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                    {arrSongs.length > 0 && <Paging
                        pageIndex={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        pageCount={this.props.pageCount}
                        changePage={this.handleChangePage}
                    ></Paging>
                    }
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        songs: state.song.songAdmin,
        isLoading: state.song.isLoading,
        pageCount: state.song.pageCount,
        isApproved: state.song.isApproved
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSongStart: (pageIndex, pageSize) => dispatch(actions.fetchSongAdminStart(pageIndex, pageSize)),
        deleteSongStart: (id, pageIndex, pageSize) => dispatch(actions.deleteSongStart(id, pageIndex, pageSize)),
        createASong: (data, pageIndex, pageSize) => dispatch(actions.addSongStart(data, pageIndex, pageSize)),
        handleToggleApproval: (id) => dispatch(actions.ToggleApproveSongStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongManage);
