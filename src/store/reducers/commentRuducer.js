import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoading: false,
    commentSong: [],
    addComment: false,
    approvedComment: [],
    unApprovedComment: [],
    isReload: false
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMMENT_BY_SONG_ID_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_COMMENT_BY_SONG_ID_SUCCESS:
            state.isLoading = false
            state.commentSong = [...action.data]
            return {
                ...state,
            }
        case actionTypes.GET_COMMENT_BY_SONG_ID_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.ADD_COMMENT_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.ADD_COMMENT_SUCCESS:
            state.isLoading = false
            state.addComment = !state.addComment
            return {
                ...state,
            }
        case actionTypes.ADD_COMMENT_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.GET_APPROVED_COMMENT_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_APPROVED_COMMENT_SUCCESS:
            state.isLoading = false
            state.approvedComment = [...action.data.data]
            return {
                ...state,
            }
        case actionTypes.GET_APPROVED_COMMENT_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.GET_UNAPPROVED_COMMENT_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_UNAPPROVED_COMMENT_SUCCESS:
            state.isLoading = false
            state.unApprovedComment = [...action.data.data]
            return {
                ...state,
            }
        case actionTypes.GET_UNAPPROVED_COMMENT_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.DELETE_ALBUM_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.DELETE_ALBUM_SUCCESS:
            state.isLoading = false
            state.isReload = !state.isReload
            return {
                ...state,
            }
        case actionTypes.DELETE_ALBUM_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.TOGGLE_APPROVE_COMMENT_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.TOGGLE_APPROVE_COMMENT_SUCCESS:
            state.isLoading = false
            state.isReload = !state.isReload
            return {
                ...state,
            }
        case actionTypes.TOGGLE_APPROVE_COMMENT_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        default:
            return state;

    }
}

export default commentReducer;