import React, { Component } from "react";
import "./Feature.scss";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import CountFollower from "../../Partial/CountFollower";

class Feature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            refresh: false
        }
    }

    componentDidMount() {
        this.props.getRandomUser(3);
    }

    refreshRandomUser = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.randomUser !== this.props.randomUser) {
            this.setState({
                arrUsers: [...this.props.randomUser]
            })
        }

        if (prevState.refresh !== this.state.refresh) {
            this.props.getRandomUser(3);
        }
    }

    render() {
        const { arrUsers } = this.state

        return (
            <div className="feature-container">
                <div className="container-up">
                    <div className="container-up-header">
                        <div className="header-icon">
                            <i className="fas fa-user-friends"></i><span><FormattedMessage id={"feature.artist-should-know"} /></span>
                        </div>
                        <div className="btn-refresh" onClick={() => { this.refreshRandomUser() }}>
                            <i className="fas fa-sync"></i><span><FormattedMessage id={"feature.refresh"} /></span>
                        </div>
                    </div>
                    <div className="container-up-content">
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <div key={item.id} className="container">
                                    <div className="avatar" style={{
                                        backgroundImage: `url("${item.avatar}")`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}>

                                    </div>
                                    <div className="info-song">
                                        <div className="name">
                                            {item.name}
                                        </div>
                                        <div className="info">
                                            <div className="follower">
                                                <i className="fas fa-user-friends"></i> <CountFollower idUser={item.id} />
                                            </div>
                                            <div className="tracks">
                                                <a style={{
                                                    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo=")`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></a>
                                                <span>{item.listSong.length}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        randomUser: state.user.randomUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRandomUser: (size) => dispatch(actions.GetRandomUserStart(size))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Feature));