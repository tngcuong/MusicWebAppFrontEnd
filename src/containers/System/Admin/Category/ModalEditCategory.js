import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
        }
    }

    componentDidMount() {
        let { currentCategory } = this.props;
        if (currentCategory && currentCategory.id) {
            this.setState({
                id: currentCategory.id,
                name: currentCategory.name,
            });
        }
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveCategory = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editCategory(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={this.props.toggleFromParent} 
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={this.props.toggleFromParent}>Edit Category</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Name</label>
                            <input 
                                type="text" 
                                onChange={(event) => { this.handleChangeInput(event, "name") }}
                                value={this.state.name}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        className="px-3" 
                        onClick={() => { this.handleSaveCategory() }}
                    >
                        Save changes
                    </Button>
                    <Button color="secondary" className="px-3" onClick={this.props.toggleFromParent}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCategory);