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
            copyState.albums = [...action.data]
            copyState.isLoading = false
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
        default:
            return state;

    }
}

export default albumReducer;