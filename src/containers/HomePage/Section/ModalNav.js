import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import "./ModalNav.scss";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


class ModalNav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    toggle = () => {
        this.props.toggleFromParent()
    }

    handleCloseNav = () => {

    }

    render() {
        let isLogin = this.props.isLoggedIn
        return (
            <>
                <div className='Nav-Container'>
                    <div className='logo-nav'
                        style={{
                            backgroundImage: `url("")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        <div className='close-nav'><i className='fas fa-times' onClick={() => { this.toggle() }}></i></div>
                    </div>
                    <div className='Nav-body'>
                        {isLogin && isLogin === true && <div className='Nav-item'><i class="fas fa-user-circle"></i><FormattedMessage id='nav.profile' /></div>}
                        {isLogin && isLogin === true && <div className='Nav-item'><i class="fas fa-heart"></i><FormattedMessage id='nav.liked' /></div>}
                        {isLogin && isLogin === true && <div className='Nav-item'><i class="fas fa-headphones"></i><FormattedMessage id='nav.playlists' /></div>}
                        <div className='Nav-item'><i class="fas fa-search"></i><FormattedMessage id='nav.search' /></div>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNav);