import actionTypes from './actionTypes';
import { getAllRoles } from '../../services/roleService';
import {
    addComment,
    getCommentBySongId,
    getApprovedComment,
    getUnApprovedComment,
    toggleApproveComment,
    deleteCommentById,
} from '../../services/commentService';


export const GetCommentBySongStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_COMMENT_BY_SONG_ID_START })
            let data = await getCommentBySongId(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(GetCommentBySongSuccess(data.content))
            } else {
                dispatch(GetCommentBySongFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(GetCommentBySongFailed(error.response.data.message))
            }
        }
    }
}

export const GetCommentBySongSuccess = (data) => ({
    type: actionTypes.GET_COMMENT_BY_SONG_ID_SUCCESS,
    data: data
})

export const GetCommentBySongFailed = () => ({
    type: actionTypes.GET_COMMENT_BY_SONG_ID_FAILED,
})

export const AddCommentStart = (dataComment) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.ADD_COMMENT_START })
            let data = await addComment(dataComment)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(AddCommentSuccess(data.content))
            } else {
                dispatch(AddCommentFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(AddCommentFailed(error.response.data.message))
            }
        }
    }
}

export const AddCommentSuccess = (data) => ({
    type: actionTypes.ADD_COMMENT_SUCCESS,
    data: data
})

export const AddCommentFailed = () => ({
    type: actionTypes.ADD_COMMENT_FAILED,
})


export const GetApprovedCommentStart = (pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_APPROVED_COMMENT_START })
            let data = await getApprovedComment(pageIndex, pageSize)
            console.log(data);
            if (data && (data.errorCode === 200 || data.errorCode === 204)) {
                dispatch(GetApprovedCommentSuccess(data.content))
            } else {
                dispatch(GetApprovedCommentFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(GetApprovedCommentFailed(error.response.data.message))
            }
        }
    }
}

export const GetApprovedCommentSuccess = (data) => ({
    type: actionTypes.GET_APPROVED_COMMENT_SUCCESS,
    data: data
})

export const GetApprovedCommentFailed = () => ({
    type: actionTypes.GET_APPROVED_COMMENT_FAILED,
})


export const GetUnApprovedCommentStart = (pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_UNAPPROVED_COMMENT_START })
            let data = await getUnApprovedComment(pageIndex, pageSize)
            console.log(data);
            if (data && (data.errorCode === 200 || data.errorCode === 204)) {
                dispatch(GetUnApprovedCommentSuccess(data.content))
            } else {
                dispatch(GetUnApprovedCommentFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(GetUnApprovedCommentFailed(error.response.data.message))
            }
        }
    }
}

export const GetUnApprovedCommentSuccess = (data) => ({
    type: actionTypes.GET_UNAPPROVED_COMMENT_SUCCESS,
    data: data
})

export const GetUnApprovedCommentFailed = () => ({
    type: actionTypes.GET_UNAPPROVED_COMMENT_FAILED,
})

export const ToggleApproveCommentStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.TOGGLE_APPROVE_COMMENT_START })
            let data = await toggleApproveComment(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(ToggleApproveCommentSuccess(data.content))
            } else {
                dispatch(ToggleApproveCommentFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(ToggleApproveCommentFailed(error.response.data.message))
            }
        }
    }
}

export const ToggleApproveCommentSuccess = (data) => ({
    type: actionTypes.TOGGLE_APPROVE_COMMENT_SUCCESS,
    data: data
})

export const ToggleApproveCommentFailed = () => ({
    type: actionTypes.TOGGLE_APPROVE_COMMENT_FAILED,
})

export const DeleteCommentStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_COMMENT_START })
            let data = await deleteCommentById(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(DeleteCommentSuccess(data.content))
            } else {
                dispatch(DeleteCommentFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(DeleteCommentFailed(error.response.data.message))
            }
        }
    }
}

export const DeleteCommentSuccess = (data) => ({
    type: actionTypes.DELETE_ALBUM_SUCCESS,
    data: data
})

export const DeleteCommentFailed = () => ({
    type: actionTypes.DELETE_ALBUM_FAILED,
})