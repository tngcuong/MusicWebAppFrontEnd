import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import ModalEditCategory from './ModalEditCategory';
import ModalCategory from './ModalCategory';
import { addCategory, deleteCategoryById, getAllCategory, getCategoryBySongId, updateCategory } from '../../../../services/categoryService';
import Paging from '../../../../components/Paging/Paging';


import "./CategoryManage.scss";
class CategoryManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCate: [],
            isOpenModal: false,
            isOpenEditModal: false,
            cateEdit: {},
            currentPage: 1,
            pageSize: 5,
            pageCount: 1,
            isDelete: false
        }
    }

    getAllCateFromManage = async () => {
        try {
            let res = await getAllCategory(this.state.currentPage, this.state.pageSize);
            if (res && res.errorCode === 200) {
                await this.setState({
                    arrCate: res.content.data,
                    pageCount: res.content.totalPages
                });


            }
        } catch (error) {
            console.log(error);
        }

    }

    handleChangePage = async (pageIndex) => {
        await this.setState({
            currentPage: pageIndex
        })
        await this.getAllCateFromManage()
    }

    async componentDidMount() {
        await this.getAllCateFromManage()
    }

    handleAddNewCate = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleCateModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    toggleEditCateModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    createNewCate = async (data) => {
        try {
            let res = await addCategory(data);
            await this.getAllCateFromManage()
            this.setState({
                isOpenModal: false
            })

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    handleEditCate = (cate) => {
        this.setState({
            isOpenEditModal: true,
            cateEdit: cate
        })
    }

    editCategory = async (cate) => {
        try {
            let res = await updateCategory(cate.id, cate)
            await this.getAllCateFromManage()
            this.setState({
                isOpenEditModal: false
            })
        } catch (err) {

        }

    }

    componentDidUpdate(prevProps, prevState) {


        if (prevProps.isDelete !== this.props.isDelete) {

        }

    }

    handleDeleteCate = async (cate) => {
        try {
            let data = await deleteCategoryById(cate.id)
            if (data && data.errorCode === 200) {
                await this.getAllCateFromManage()
                alert("deleted successfully")
                this.setState({
                    isDelete: !this.state.isDelete
                })
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    render() {
        let { arrCate } = this.state
        return (

            <div className="user-container">
                {this.state.isOpenModal && <ModalCategory
                    toggleFromParent={this.toggleCateModal}
                    isOpen={this.state.isOpenModal}
                    size="xl"
                    createCategory={this.createNewCate}
                    centered
                ></ModalCategory>}
                {this.state.isOpenEditModal &&
                    <ModalEditCategory
                        toggleFromParent={this.toggleEditCateModal}
                        isOpen={this.state.isOpenEditModal}
                        currentCategory={this.state.cateEdit}
                        size="xl"
                        centered
                        editCategory={this.editCategory}
                    >
                    </ModalEditCategory>
                }

                <div className='title text-center'>Quản lý thể loại</div>
                <div className='mx-1'>
                    <button
                        onClick={() => { this.handleAddNewCate() }}
                        className='btn btn-primary px-3'><i className="fas fa-user-plus"></i></button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th><FormattedMessage id="manage-category.image" /></th>
                                <th><FormattedMessage id="manage-category.name" /></th>
                                <th><FormattedMessage id="manage-category.createAt" /></th>
                                <th><FormattedMessage id="manage-category.action" /></th>
                            </tr>

                            {arrCate && arrCate.map((item, index) => {
                                return (
                                    <tr key={item.id} className='user-content'>
                                        <td>{index + 1}</td>
                                        <td style={{ width: "10%", textAlign: "center" }}>
                                            <div
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    backgroundImage: `url(${item.image})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundColor: "#f0f0f0",
                                                    display: "inline-block"
                                                }}
                                            >
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.createAt}</td>
                                        <td>
                                            <button
                                                onClick={() => { this.handleEditCate(item) }}
                                                className='btn-edit'><i className="fas fa-user-edit"></i></button>
                                            <button
                                                onClick={() => { this.handleDeleteCate(item) }}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    {arrCate.length > 0 && <Paging
                        pageIndex={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        pageCount={this.state.pageCount}
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        updateUser: (user) => dispatch(actions.updateUserStart(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
