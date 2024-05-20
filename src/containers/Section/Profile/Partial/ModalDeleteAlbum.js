import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./ModalDeleteAlbum.scss"

class ModalDeleteAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idAlbum: "",
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.idAlbum !== prevProps.idAlbum) {
            this.setState({
                idAlbum: this.props.idAlbum
            })
        }
    }


    componentDidMount() {
        this.setState({
            idAlbum: this.props.idAlbum
        })
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    deleteAlbum = () => {
        this.props.deleteAlbum(this.props.idAlbum)
        this.toggle()
    }

    render() {
        let { isLoading } = this.props
        let { idAlbum } = this.state
        console.log(idAlbum);
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
                            <Button color="danger" onClick={() => { this.deleteAlbum() }}>
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
        deleteAlbum: (id) => dispatch(actions.deletePlayListStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteAlbum);
