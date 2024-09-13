import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./FollowBtn.scss";
import * as actions from '../../store/actions';
import { injectIntl, FormattedMessage } from 'react-intl';

class FollowBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFollow: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isFollow === !prevState.isFollow) {
            this.props.getCurrentUser()
        }
    }

    toggleFollow = async () => {
        const { idUser, currentUser } = this.props;
        await this.props.followToggle(currentUser.id, idUser)
        this.setState({
            isFollow: !this.state.isFollow
        })
    }

    componentDidMount() {

    }


    render() {
        const { idUser, currentUser, intl } = this.props;
        return (
            <>
                <div className='follow-container'>
                    {currentUser && currentUser.following && currentUser.following.includes(idUser) ?

                        <div className='btn-followed' onClick={() => this.toggleFollow()}>
                            <span className="icon-follow"
                            ><i className='fas fa-user-friends'></i></span>
                            <span className="text-follow">
                                {intl.formatMessage({ id: 'follow.followed' })}
                            </span>
                        </div>
                        :
                        <div className='btn-follow' onClick={() => this.toggleFollow()}>
                            <span className="icon-follow" style={{
                                backgroundImage: `url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8cGF0aCBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNTQyIDEuMTY3YzIuNzcgMCAzLjM4NiAyLjkxNiAyLjE1NSA2LjEyNSAzLjE2OSAxLjMwOCAzLjM4NiAzLjk3NyAzLjM4NiA0Ljk1OEgwYzAtLjk4MS4yMTgtMy42NSAzLjM4Ny00Ljk1OC0xLjIzMi0zLjIxOC0uNjE2LTYuMTI1IDIuMTU1LTYuMTI1em0wIDEuMTY2Yy0xLjU4NCAwLTIuMTI3IDEuNzctMS4wNjYgNC41NDIuMjI2LjU5LS4wNiAxLjI1NC0uNjQ0IDEuNDk1LTEuNTE3LjYyNi0yLjI2MyAxLjU3Mi0yLjUzNyAyLjcxM2g4LjQ5NGMtLjI3NS0xLjE0MS0xLjAyLTIuMDg3LTIuNTM3LTIuNzEzYTEuMTY3IDEuMTY3IDAgMCAxLS42NDQtMS40OTZjMS4wNi0yLjc2NC41MTYtNC41NC0xLjA2Ni00LjU0em02LjQxNC0uNTgzYy4xNyAwIC4yOTQuMTMuMjk0LjI5MlYzLjVoMS40NThjLjE1NyAwIC4yOTIuMTMyLjI5Mi4yOTR2LjU3OGMwIC4xNy0uMTMuMjk1LS4yOTIuMjk1SDEyLjI1djEuNDU4YS4yOTYuMjk2IDAgMCAxLS4yOTQuMjkyaC0uNTc4YS4yODkuMjg5IDAgMCAxLS4yOTUtLjI5MlY0LjY2N0g5LjYyNWEuMjk2LjI5NiAwIDAgMS0uMjkyLS4yOTV2LS41NzhjMC0uMTcuMTMxLS4yOTQuMjkyLS4yOTRoMS40NThWMi4wNDJjMC0uMTU3LjEzMi0uMjkyLjI5NS0uMjkyaC41Nzh6Ii8+Cjwvc3ZnPgo=")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}></span>
                            <span className="text-follow">
                                {intl.formatMessage({ id: 'follow.follow' })}
                            </span>
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFollow: state.user.isFollow,
        currentUser: state.user.currentUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        followToggle: (id, idFollow) => dispatch(actions.FollowStart(id, idFollow)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart())
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FollowBtn));
