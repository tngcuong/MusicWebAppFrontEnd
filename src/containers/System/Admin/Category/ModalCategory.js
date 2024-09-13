import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Lightbox from 'react-image-lightbox';

class ModalCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImg: "",
            currentUser: {},
            isOpenPreview: false,
            name: '',
            image: null,
        }
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        if (id === 'image') {
            copyState[id] = event.target.files[0]
        } else {
            copyState[id] = event.target.value
        }
        this.setState({
            ...copyState,
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['name']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter ' + arrInput[i])
                break
            }
        }
        return isValid;
    }

    handleAddNewCategory = () => {
        let isValid = this.checkValidateInput()

        if (isValid) {
            this.props.createCategory({
                id: this.state.currentUser.id,
                name: this.state.name,
                img: this.state.image
            })
        }
    }


    componentDidMount() {
        this.props.getCurrentUser()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentUser !== this.props.currentUser) {
            this.setState({
                currentUser: { ...this.props.currentUser }
            }, () => { })
        }
    }


    toggle = () => {
        this.props.toggleFromParent()
    }

    handleChangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objUrl = URL.createObjectURL(file)
            this.setState({
                image: file,
                previewImg: objUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpenPreview: true
        })
    }

    render() {
        let { language, isLoading } = this.props

        return (
            <>
                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className='modalUserContainer'>
                    <ModalHeader toggle={() => { this.toggle() }}><FormattedMessage id="manage-category.add-title"></FormattedMessage></ModalHeader>
                    <div>{isLoading === true ? "loading" : ''}</div>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Name</label>
                                <input value={this.state.name} type='text' onChange={(e) => { this.handleChangeInput(e, "name") }} />
                            </div>
                            <div className='input-container'>
                                <label><FormattedMessage id="manage-song.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' hidden type='file' onChange={(e) => { this.handleChangeImage(e) }} accept="image/*" />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-category.upload-img" />  <i className="fas fa-upload"></i></label>
                                    <div className='preview-img'
                                        onClick={() => { this.openPreviewImage() }}
                                        style={{ backgroundImage: `url(${this.state.previewImg})` }}></div>
                                </div>
                            </div>
                        </div>
                        {this.state.isOpenPreview == true &&
                            <Lightbox
                                id="lightbox"
                                mainSrc={this.state.previewImg}
                                onCloseRequest={() => this.setState({ isOpenPreview: false })}
                            />
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className='px-3'
                            color="primary"
                            onClick={() => { this.handleAddNewCategory() }}>
                            Add
                        </Button>
                        <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoading: state.user.isLoading,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCategory);
