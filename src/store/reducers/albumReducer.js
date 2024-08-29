import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoading: false,
    isPlaying: false,
    albums: [],
    detailAlbum: {},
    userAlbums: [],
    isAlbum: true,
    currentAlbum: [],
    isLiked: false,
    isFailed: true,
    searchAlbum: [],
    pageCount: 0
}

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALBUM_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALBUM_SUCCESS:
            let copyState = { ...state }
            copyState.albums = [...action.data.data]
            copyState.isLoading = false
            copyState.pageCount = action.data.totalPages
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ALBUM_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_ALBUM_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_ALBUM_SUCCESS:
            state.isLoading = false;
            state.detailAlbum = { ...action.data }
            return {
                ...state,
            }
        case actionTypes.GET_DETAIL_ALBUM_FAILED:
            state.isLoading = false;
            toast.error(action.error)
            return {
                ...state,
            }

        case actionTypes.GET_ALBUM_START_BY_ID:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_ALBUM_SUCCESS_BY_ID:
            state.isLoading = false;
            state.userAlbums = [...action.data]
            return {
                ...state,
            }
        case actionTypes.GET_ALBUM_FAILED_BY_ID:
            state.isLoading = false;
            toast.error(action.error)
            return {
                ...state,
            }
        case actionTypes.SET_CURRENT_ALBUM:
            state.currentAlbum = [...action.data]
            return {
                ...state,
            }
        case actionTypes.TOGGLE_LIKE_ALBUM_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.TOGGLE_LIKE_ALBUM_SUCCESS:
            state.isLoading = false
            state.isLiked = !state.isLiked
            return {
                ...state,
            }
        case actionTypes.TOGGLE_LIKE_ALBUM_FAILED:
            state.isLoading = false
            toast.success(action.error)
            return {
                ...state
            }
        case actionTypes.DELETE_ALBUM_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.DELETE_ALBUM_SUCCESS:
            state.isLoading = false
            state.isLiked = !state.isLiked
            toast.success('delete successfully')
            return {
                ...state
            }
        case actionTypes.DELETE_ALBUM_FAILED:
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.UPLOAD_PLAYLIST_START:
            state.isLoading = true
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.UPLOAD_PLAYLIST_SUCCESS:
            state.isLoading = false
            state.isFailed = false
            toast.success('Upload playlist successfully')
            return {
                ...state
            }
        case actionTypes.UPLOAD_PLAYLIST_FAILDED:
            toast.success(action.error)
            state.isLoading = false
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.ADD_SONG_TO_ALBUM_START:
            state.isLoading = true
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.ADD_SONG_TO_ALBUM_SUCCESS:
            state.isLoading = false
            state.isFailed = false
            toast.success('Update song to playlist successfully')
            return {
                ...state
            }
        case actionTypes.ADD_SONG_TO_ALBUM_FAILDED:
            state.isLoading = false
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.SEARCH_ALBUM_BY_NAME_START:
            state.isLoading = true
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.SEARCH_ALBUM_BY_NAME_SUCCESS:
            state.isLoading = false
            state.isFailed = false
            state.searchAlbum = [...action.data]
            return {
                ...state
            }
        case actionTypes.SEARCH_ALBUM_BY_NAME_FAILED:
            state.isLoading = false
            state.isFailed = true
            state.searchAlbum = []
            return {
                ...state
            }
        default:
            return state;

    }
}

export default albumReducer;