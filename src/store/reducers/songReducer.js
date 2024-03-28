import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoading: false,
    currentSong: {},
    currentListSong: [],
    songs: []
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
            toast.success('success')
            return {
                ...state
            }
        case actionTypes.DELETE_SONG_FAILED:
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.GET_CURRENT_SONG:
            state.currentSong = action.song
            return {
                ...state
            }
        default:
            return state;
    }
}

export default appReducer;