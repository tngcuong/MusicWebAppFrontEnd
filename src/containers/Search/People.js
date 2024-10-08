import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./People.scss";

import { calcuDate } from '../../components/HOC/RandomColor';
import Loader from '../../components/Loader';
import LikeSong from '../Partial/LikeSong';
import FollowBtn from '../Partial/FollowBtn';
import NameUser from '../Partial/NameUser';
import CountFollower from '../Partial/CountFollower';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            People: []
        }
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.searchUser !== preProps.searchUser) {
            this.setState({
                People: [...this.props.searchUser]
            })
        }
    }

    componentDidMount() {
        this.setState({
            People: [...this.props.searchUser]
        })
    }

    render() {
        const { People } = this.state
        const { currentUser, isLoggedIn } = this.props
        return (
            <div className='search-people-container'>
                {this.props.isLoadingAccount === true && <Loader></Loader>}
                <div className='search-people-up-container'>
                    <p className='count-people'>{People.length}  {People.length > 1 ? <span> songs </span> : <span> song </span>} found. </p>
                </div>
                <div className='search-people-down-container'>
                    <div className='search-people-down-list'>
                        {
                            People && People.length > 0 &&
                            People.map((item, index) => {
                                return (
                                    <div className='content' key={item.id}>
                                        <div className='image' style={{
                                            backgroundImage: `url("${item.avatar}")`,
                                            backgroundPosition: 'center center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat'
                                        }}>

                                        </div>
                                        <div className='details'>
                                            <div className='info'>
                                                <h2 className='name'>
                                                    <NameUser user={item} />
                                                </h2>
                                                <div className='description'>
                                                    {item.description}
                                                </div>
                                                <div className='follower'>
                                                    <i className="fas fa-user-friends"></i> <CountFollower idUser={item.id} /> 
                                                </div>
                                                {isLoggedIn == true && currentUser.id !== item.id && <FollowBtn idUser={item.id} />}
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        searchUser: state.user.searchUser,
        currentUser: state.user.currentUser,
        isLoggedIn: state.account.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(People));