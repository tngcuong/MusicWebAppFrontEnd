import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DeteleSongBtn.scss";
import * as actions from '../../../../store/actions';
import { countLiked } from '../../../../services/songService';
import ModalDeleteConfirm from "./ModalDeleteConfirm"

class DeteleSongBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            idSong: ""
        };
    }

    async componentDidMount() {
        this.setState({
            idSong: this.props.idSong
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.idSong !== prevProps.idSong) {
            this.setState({
                idSong: this.props.idSong
            })
        }
    }

    toggleSongModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    deleteSong = () => {
        this.setState({
            isOpenModal: true
        })
    }

    render() {
        let { idSong } = this.state
        return (
            <div>
                {this.state.isOpenModal === true && <ModalDeleteConfirm
                    toggleFromParent={this.toggleSongModal}
                    isOpen={this.state.isOpenModal}
                    idSong={idSong}
                    size="xl"
                    centered
                ></ModalDeleteConfirm>}
                <div className='delete' onClick={() => { this.deleteSong() }}>
                    <div className='btn-delete'>
                        <i className="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DeteleSongBtn);