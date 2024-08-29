import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./CountFollower.scss";
import * as actions from '../../store/actions';
import { countFollowerByUserId } from '../../services/userService';

class CountFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countFollower: 0,
        };
    }

    async componentDidMount() {
        await this.countFollower()
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.isFollow === !prevProps.isFollow) {
            await this.countFollower()
        }
    }

    countFollower = async () => {
        const { idUser } = this.props;
        try {
            let data = await countFollowerByUserId(idUser)
            if (data && data.errorCode === 200) {
                this.setState({
                    countFollower: data.content
                })
            } else {
                console.log("count error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { countFollower } = this.state;
        return (
            <div>
                <span>
                    {countFollower}
                </span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        song: state.song.currentSong,
        isFollow: state.user.isFollow,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountFollower);