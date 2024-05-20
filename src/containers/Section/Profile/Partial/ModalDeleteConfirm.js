import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./ModalDeleteConfirm.scss"

class ModalDeleteConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSong: "",
        };

    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.idSong !== prevProps.idSong) {
            this.setState({
                idSong: this.props.idSong
            })
        }
    }


    componentDidMount() {
        this.setState({
            idSong: this.props.idSong
        })
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    deleteSong = () => {
        this.props.deleteSong(this.props.idSong)
        this.toggle()
    }

    render() {
        let { isLoading } = this.props
        let { idSong } = this.state
        console.log(idSong);
        return (
            <>
                <div>
                    {isLoading === true && <Loader />}
                    <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} >
                        <ModalHeader toggle={() => { this.toggle() }}>Confirm to delete</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={() => { this.deleteSong() }}>
                                Delete
                            </Button>{' '}
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
        isLoading: state.song.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (id) => dispatch(actions.deleteSongStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteConfirm);
