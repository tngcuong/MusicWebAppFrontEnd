import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./People.scss";

import { calcuDate } from '../../components/HOC/RandomColor';
import CountLiked from '../Partial/CountLiked';
import Loader from '../../components/Loader';
import LikeSong from '../Partial/LikeSong';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            People: []
        }
    }

    componentDidUpdate(preProps, prevState) {
        if (this.props.match.params.s !== preProps.match.params.s) {
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
                                                    {item.name}
                                                </h2>
                                                <div className='description'>
                                                    {item.description}
                                                </div>
                                                <div className='follower'>
                                                    <i className="fas fa-user-friends"></i> {item.followers.length} followers
                                                </div>
                                                <div className='btn-follow'>
                                                    <span className="icon-follow" style={{
                                                        backgroundImage: `url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8cGF0aCBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNTQyIDEuMTY3YzIuNzcgMCAzLjM4NiAyLjkxNiAyLjE1NSA2LjEyNSAzLjE2OSAxLjMwOCAzLjM4NiAzLjk3NyAzLjM4NiA0Ljk1OEgwYzAtLjk4MS4yMTgtMy42NSAzLjM4Ny00Ljk1OC0xLjIzMi0zLjIxOC0uNjE2LTYuMTI1IDIuMTU1LTYuMTI1em0wIDEuMTY2Yy0xLjU4NCAwLTIuMTI3IDEuNzctMS4wNjYgNC41NDIuMjI2LjU5LS4wNiAxLjI1NC0uNjQ0IDEuNDk1LTEuNTE3LjYyNi0yLjI2MyAxLjU3Mi0yLjUzNyAyLjcxM2g4LjQ5NGMtLjI3NS0xLjE0MS0xLjAyLTIuMDg3LTIuNTM3LTIuNzEzYTEuMTY3IDEuMTY3IDAgMCAxLS42NDQtMS40OTZjMS4wNi0yLjc2NC41MTYtNC41NC0xLjA2Ni00LjU0em02LjQxNC0uNTgzYy4xNyAwIC4yOTQuMTMuMjk0LjI5MlYzLjVoMS40NThjLjE1NyAwIC4yOTIuMTMyLjI5Mi4yOTR2LjU3OGMwIC4xNy0uMTMuMjk1LS4yOTIuMjk1SDEyLjI1djEuNDU4YS4yOTYuMjk2IDAgMCAxLS4yOTQuMjkyaC0uNTc4YS4yODkuMjg5IDAgMCAxLS4yOTUtLjI5MlY0LjY2N0g5LjYyNWEuMjk2LjI5NiAwIDAgMS0uMjkyLS4yOTV2LS41NzhjMC0uMTcuMTMxLS4yOTQuMjkyLS4yOTRoMS40NThWMi4wNDJjMC0uMTU3LjEzMi0uMjkyLjI5NS0uMjkyaC41Nzh6Ii8+Cjwvc3ZnPgo=")`,
                                                        backgroundPosition: 'center center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}></span>
                                                    <span className="text-follow">
                                                        Follow
                                                    </span>
                                                </div>
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
        searchUser: state.user.searchUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(People));