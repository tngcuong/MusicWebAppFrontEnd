import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Loader from '../../../../components/Loader';
import * as actions from '../../../../store/actions';
import moment from 'moment';
import "./commentManage.scss";
import Paging from '../../../../components/Paging/Paging';

class CommentManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenEditModal: false,
            currentPage: 1,
            pageSize: 5,
            selectedCommentType: 'approved',
        };
    }

    componentDidMount() {
        this.loadComments();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedCommentType !== this.state.selectedCommentType ||
            prevState.currentPage !== this.state.currentPage || prevProps.isReload !== this.props.isReload) {
            this.loadComments();
        }
    }

    handleChangePage = async (pageIndex) => {
        await this.setState({
            currentPage: pageIndex
        });
        this.props.getSongStart(this.state.currentPage, this.state.pageSize);
    };

    loadComments = () => {
        const { selectedCommentType, currentPage, pageSize } = this.state;
        if (selectedCommentType === 'approved') {
            this.props.getApprovedComment(currentPage, pageSize);
        } else {
            this.props.getUnApprovedComment(currentPage, pageSize);
        }
    };

    handleCommentTypeChange = (type) => {
        this.setState({ selectedCommentType: type, currentPage: 1 });
    };

    handleToggleApproval = (id) => {
        this.props.toggleAppproveComment(id);
    };

    handleDeleteComment = (id) => {
        this.props.deleteComment(id)
    }

    render() {
        const { isLoading, approvedComment, unApprovedComment } = this.props;
        const { selectedCommentType } = this.state;
        const commentsToDisplay = selectedCommentType === 'approved' ? approvedComment : unApprovedComment;

        return (
            <div className='comment-container'>
                <div>{isLoading && <Loader />}</div>
                <div className='title text-center'><FormattedMessage id="manage-comment.title" /></div>

                <div className='mx-1'>
                    <button
                        onClick={() => this.handleCommentTypeChange('approved')}
                        className={`btn ${selectedCommentType === 'approved' ? 'btn-primary' : 'btn-secondary'} px-3`}
                    >
                        Approved Comments
                    </button>
                    <button
                        onClick={() => this.handleCommentTypeChange('unapproved')}
                        className={`btn ${selectedCommentType === 'unapproved' ? 'btn-primary' : 'btn-secondary'} px-3`}
                    >
                        Unapproved Comments
                    </button>
                </div>

                <div className='comments-table mt-3 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th><FormattedMessage id="manage-comment.image" /></th>
                                <th><FormattedMessage id="manage-comment.name" /></th>
                                <th><FormattedMessage id="manage-comment.createAt" /></th>
                                <th><FormattedMessage id="manage-comment.content" /></th>
                                <th><FormattedMessage id="manage-comment.isApproved" /></th>
                                <th><FormattedMessage id="manage-comment.action" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {commentsToDisplay && commentsToDisplay.map((item, index) => (
                                <tr key={item.id} className='comment-content'>
                                    <td>{index + 1}</td>
                                    <td style={{ width: "10%", textAlign: "center" }}>
                                        <div
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundImage: `url(${item.user.avatar})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundColor: "#f0f0f0",
                                                display: "inline-block"
                                            }}
                                        >
                                        </div>
                                    </td>
                                    <td>{item.user.name}</td>
                                    <td>{moment(item.createAt).format("DD/MM/YYYY h:MM:ss")}</td>
                                    <td>{item.content}</td>
                                    <td>
                                        <div className="toggle-switch">
                                            <button
                                                type="button"
                                                className={`toggle-button ${item.isApproved ? "bg-primary" : "bg-muted"}`}
                                                onClick={() => this.handleToggleApproval(item.id)}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`toggle-thumb ${item.isApproved ? "translate-x-5" : "translate-x-0"}`}
                                                />
                                            </button>
                                            <span className={`toggle-label ${item.isApproved ? "text-primary" : "text-muted-foreground"}`}>
                                                {item.isApproved ? "Approved" : "UnApproved"}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.handleDeleteComment(item.id)}
                                            className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {commentsToDisplay.length > 0 && <Paging
                        pageIndex={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        pageCount={this.props.pageCount}
                        changePage={this.handleChangePage}
                    ></Paging>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.comment.isLoading,
        approvedComment: state.comment.approvedComment,
        unApprovedComment: state.comment.unApprovedComment,
        isReload: state.comment.isReload,
        pageCount: state.comment.pageCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getApprovedComment: (pageIndex, pageSize) => dispatch(actions.GetApprovedCommentStart(pageIndex, pageSize)),
        getUnApprovedComment: (pageIndex, pageSize) => dispatch(actions.GetUnApprovedCommentStart(pageIndex, pageSize)),
        toggleAppproveComment: (id) => dispatch(actions.ToggleApproveCommentStart(id)),
        deleteComment: (id) => dispatch(actions.DeleteCommentStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentManage);
