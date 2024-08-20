import axios from "../axios"

const addComment = (data) => {
    return axios.post(`/api/Comment/AddComment`, data)
}

const getCommentBySongId = (id) => {
    return axios.get(`/api/Comment/GetAllCommentBySongId?id=${id}`)
}

const getApprovedComment = (pageIndex, pageSize) => {
    return axios.get(`/api/Comment/GetAllApprovedComment?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const getUnApprovedComment = (pageIndex, pageSize) => {
    return axios.get(`/api/Comment/GetAllUnApprovedComment?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const toggleApproveComment = (id) => {
    return axios.put(`/api/Comment/ToggleApproveCommentById?id=${id}`)
}

const deleteCommentById = (id) => {
    return axios.delete(`/api/Comment/DeleteCommentById?id=${id}`)
}

export {
    addComment,
    getCommentBySongId,
    getApprovedComment,
    getUnApprovedComment,
    deleteCommentById,
    toggleApproveComment
}