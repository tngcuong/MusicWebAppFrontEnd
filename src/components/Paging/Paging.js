import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from "react-paginate";

class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 1,
            pageCount: 1,
        }
    };

    handlePageClick = (e) => {
        this.props.changePage(+e.selected + 1)
        this.setState = ({
            pageSize: this.props.pageSize,
            pageCount: this.props.pageCount
        },()=>{console.log(this.state)})
    }

    componentDidMount = () => {
        this.setState = ({
            pageSize: this.props.pageSize,
            pageCount: this.props.pageCount
        })
    }

    render() {
        return (
            <>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={this.handlePageClick}
                    pageRangeDisplayed={this.props.pageSize}
                    pageCount={this.props.pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        contentOfConfirmModal: state.app.contentOfConfirmModal
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);