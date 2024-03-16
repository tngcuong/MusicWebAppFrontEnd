import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class SongManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSongs: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {},
            currentPage: 1,
            pageSize: 5,
            pageCount: 1
        }
    }

    componentDidMount() {
    }


    render() {
        let { arrSongs } = this.state
        return (
            <div className='song-container'>
                <div className='title text-center'><FormattedMessage id="manage-song.title"/></div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'><i class="fas fa-plus-circle"></i></button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th><FormattedMessage id="manage-song.image"/></th>
                                <th><FormattedMessage id="manage-song.name"/></th>
                                <th><FormattedMessage id="manage-song.action"/></th>
                            </tr>

                            {arrSongs && arrSongs.map((item, index) => {
                                return (
                                    <tr key={item.id} className='user-content'>
                                        <td>{index + 1}</td>
                                        <td><img style={{ height: 20 }} src={item.avatar}></img></td>
                                        <td>{item.name}</td>
                                        <td>
                                            <button
                                                onClick={() => { this.handleEditUser(item) }}
                                                className='btn-edit'><i className="fas fa-user-edit"></i></button>
                                            <button
                                                onClick={() => { this.handleDeleteUser(item) }}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongManage);
