import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { getAllSongs } from '../../../../services/songService';
import Loader from '../../../../components/Loader';
import Paging from '../../../../components/Paging/Paging';
import * as actions from '../../../../store/actions';
import ModalAddSong from './ModalAddSong';

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
            pageCount: 1
        }
    }

    toggleSongModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
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
                                <th><FormattedMessage id="manage-song.action" /></th>
                            </tr>

                            {arrSongs && arrSongs.map((item, index) => {
                                return (
                                    <tr key={item.id} className='user-content'>
                                        <td>{index + 1}</td>
                                        <td><img style={{ height: 20 }} src={item.image}></img></td>
                                        <td>{item.name}</td>
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
        songs: state.song.songs,
        isLoading: state.song.isLoading,
        pageCount: state.song.pageCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSongStart: (pageIndex, pageSize) => dispatch(actions.fetchSongStart(pageIndex, pageSize)),
        deleteSongStart: (id, pageIndex, pageSize) => dispatch(actions.deleteSongStart(id, pageIndex, pageSize)),
        createASong: (data, pageIndex, pageSize) => dispatch(actions.addSongStart(data, pageIndex, pageSize)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongManage);
