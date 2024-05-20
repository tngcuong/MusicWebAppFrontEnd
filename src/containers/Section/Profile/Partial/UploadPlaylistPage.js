import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Loader from '../../../../components/Loader';
import "./UploadPlaylistPage.scss"

class UploadPlaylistPage extends Component {
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
                    sss
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoading: state.song.isLoading,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteSong: (id) => dispatch(actions.deleteSongStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPlaylistPage);
