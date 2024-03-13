import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { getCurrentUser } from '../../services/userService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser : {}
        }
    }

    getCurrentUser = async () =>{
        let currentUser =  await getCurrentUser()
        if(currentUser){
            
        }
    }

    handleChangeLanguage = (language) => {
        this.props.handleChangeLanguage(language)
    }

    componentDidMount =  async() =>{
        await this.getCurrentUser()
    }

    render() {
        const { processLogout, language } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='languages'>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => { this.handleChangeLanguage(LANGUAGES.VI) }}><FormattedMessage id="home-header.vi" /></span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => { this.handleChangeLanguage(LANGUAGES.EN) }}><FormattedMessage id="home-header.en" /></span>
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                {/* nút logout */}

            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        handleChangeLanguage: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
