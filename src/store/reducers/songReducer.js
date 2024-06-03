import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoading: false,
    currentSong: {},
    songs: [],
    isPlaying: false,
    isSong: true,
    firstMount: false,
    isShowPlayer: false,
    likedSong: [],
    top5likedSong: [],
    isLiked: false,
    numberCount: 0,
    songDes: [],
    isDeleted: false,
    isFailed: true,
    relatedSong: [],
    searchSong: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SONG_START:
            state.isLoading = true
            return {
                ...state
            }

        case actionTypes.FETCH_SONG_SUCCESS:
            let copyState = { ...state }
            copyState.songs = [...action.data]
            copyState.isLoading = false
            return {
                ...copyState
            }
        case actionTypes.FETCH_SONG_FAILED:
            state.songs = []
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.ADD_SONG_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.ADD_SONG_SUCCESS:
            let addSongCopyState = { ...state }
            addSongCopyState.isLoading = false
            toast.success('success')
            return {
                ...addSongCopyState
            }
        case actionTypes.ADD_SONG_FAILED:
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.UPDATE_SONG_START:
            return {

            }
        case actionTypes.UPDATE_SONG_SUCCESS:
            return {

            }
        case actionTypes.UPDATE_SONG_FAILED:
            return {

            }
        case actionTypes.DELETE_SONG_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.DELETE_SONG_SUCCESS:
            state.isLoading = false
            state.isLiked = !state.isLiked
            toast.success('delete successfully')
            return {
                ...state
            }
        case actionTypes.DELETE_SONG_FAILED:
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.GET_CURRENT_SONG:
            state.currentSong = { ...action.song }
            return {
                ...state
            }
        case actionTypes.PLAY_SONG:
            state.isPlaying = action.flag
            return {
                ...state
            }
        case actionTypes.FIRST_MOUNT:
            state.firstMount = true
            return {
                ...state
            }
        case actionTypes.SHOW_PLAYER:
            state.isShowPlayer = action.data
            return {
                ...state
            }
        case actionTypes.LIKE_SONG_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.LIKE_SONG_SUCCESS:
            state.isLoading = false
            state.isLiked = !state.isLiked
            return {
                ...state,

            }
        case actionTypes.LIKE_SONG_FAILED:
            state.isLoading = false
            toast.success(action.error)
            return {
                ...state
            }
        case actionTypes.UNLIKE_SONG_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.UNLIKE_SONG_SUCCESS:
            state.isLoading = false
            state.isLiked = !state.isLiked
            return {
                ...state,
            }
        case actionTypes.UNLIKE_SONG_FAILED:
            state.isLoading = false
            toast.success(action.error)
            return {
                ...state
            }
        case actionTypes.GET_TOP5_LIKED_SONG_SUCCESS:
            state.isLoading = false
            state.top5likedSong = [...action.data]
            return {
                ...state
            }
        case actionTypes.GET_TOP5_LIKED_SONG_START:
            state.isLoading = true
            return {
                ...state
            }

        case actionTypes.GET_TOP5_LIKED_SONG_FAILED:
            state.isLoading = false
            toast.success(action.error)
            return {
                ...state
            }
        case actionTypes.GET_NUMBER_LIKED_START:
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.GET_NUMBER_LIKED_SUCCESS:
            state.isLoading = true
            state.numberCount = action.data.liked
            return {
                ...state
            }

        case actionTypes.GET_NUMBER_LIKED_FAILDED:
            state.isLoading = false
            toast.success(action.error)
            return {
                ...state
            }
        case actionTypes.GET_SONG_DES_BY_ID_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.GET_SONG_DES_BY_ID_SUCCESS:
            state.isLoading = false
            state.songDes = action.data
            return {
                ...state
            }

        case actionTypes.GET_SONG_DES_BY_ID_FAILDED:
            state.isLoading = false
            toast.success(action.error)
            return {
                ...state
            }
        case actionTypes.UPLOAD_SONG_START:
            state.isLoading = true
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.UPLOAD_SONG_SUCCESS:
            state.isLoading = false
            state.isFailed = false
            toast.success('Upload song successfully')
            return {
                ...state
            }
        case actionTypes.UPLOAD_SONG_FAILDED:
            state.isLoading = false
            state.isFailed = true
            toast.error(action.data)
            return {
                ...state
            }
        case actionTypes.GET_RELATED_SONG_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.GET_RELATED_SONG_SUCCESS:
            state.isLoading = false
            state.relatedSong = [...action.data]
            return {
                ...state
            }
        case actionTypes.GET_RELATED_SONG_FAILDED:
            state.isLoading = false
            state.relatedSong = []
            return {
                ...state
            }
        case actionTypes.SEARCH_SONG_BY_NAME_START:
            state.isLoading = true
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.SEARCH_SONG_BY_NAME_SUCCESS:
            state.isLoading = false
            state.isFailed = false
            state.searchSong = [...action.data]
            return {
                ...state
            }
        case actionTypes.SEARCH_SONG_BY_NAME_FAILED:
            state.isLoading = false
            state.isFailed = true
            state.searchSong = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default appReducer;