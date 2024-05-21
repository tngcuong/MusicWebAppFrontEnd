import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./UploadPage.scss"
import UploadSongPage from './UploadSongPage';
import UploadPlaylistPage from './UploadPlaylistPage';

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }



    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent()
    }


    render() {
        let { isLoading, isLoadingAlbum } = this.props
        let { song, playlist } = this.state
        return (
            <>
                <div className='add-to-list-container'>

                    <Modal className='upload-modal-container' isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Choose the song which you wanna add</ModalHeader>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>

                            <Button color="danger" onClick={() => { this.uploadSong() }}>
                                Save changes
                            </Button>
                            {' '}
                            <Button color="secondary" onClick={() => { this.toggle() }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoadingAlbum: state.album.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
