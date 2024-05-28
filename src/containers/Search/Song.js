import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./Profile.scss";

import HomeHeader from '../../HomePage/HomeHeader';

import CountLiked from '../../Partial/CountLiked';
import Loader from '../../../components/Loader';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidUpdate(preProps, prevState) {

    }

    componentDidMount() {

    }


    render() {

        return (
            <div>
                {this.props.isLoadingAccount === true && <Loader></Loader>}
               
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));