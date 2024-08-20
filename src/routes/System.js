import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin//User/UserManage';
import SongManage from '../containers/System/Admin/Song/SongManage';
import CommentManage from '../containers/System/Admin/Comment/CommentManage';
import PlayListManage from '../containers/System/Admin/PlayList/PlayListManage';
import Header from '../containers/Header/Header';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div div className="system-container" >
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/comment-manage" component={CommentManage} />
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/song-manage" component={SongManage} />
                            <Route path="/system/playlist-manage" component={PlayListManage} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
