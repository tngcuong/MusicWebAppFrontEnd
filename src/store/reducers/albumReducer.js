import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoading: false,
}

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALBUM_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALBUM_SUCCESS:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALBUM_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default albumReducer;