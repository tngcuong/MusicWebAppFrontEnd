import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DeteleSongBtn.scss";
import * as actions from '../../../../store/actions';
import { countLiked } from '../../../../services/songService';
import ModalDeleteAlbum from "./ModalDeleteAlbum"

class DeleteAlbumBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            idAlbum: ""
        };
    }

    async componentDidMount() {
        this.setState({
            idAlbum: this.props.idAlbum
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.idAlbum !== prevProps.idAlbum) {
            this.setState({
                idAlbum: this.props.idAlbum
            })
        }
    }

    toggleSongModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    deleteAlbum = () => {
        this.setState({
            isOpenModal: true
        })
    }

    render() {
        let { idAlbum } = this.state
        return (
            <div>
                {this.state.isOpenModal === true && <ModalDeleteAlbum
                    toggleFromParent={this.toggleSongModal}
                    isOpen={this.state.isOpenModal}
                    idAlbum={idAlbum}
                    size="xl"
                    centered
                ></ModalDeleteAlbum>}
                <div className='delete' onClick={() => { this.deleteAlbum() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAlbumBtn);