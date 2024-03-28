import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: [],
    isLoading: false,
    currentUser: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState = { ...state }
            copyState.roles = action.data;
            copyState.isLoading = false
            return {
                ...copyState
            }
        case actionTypes.GET_CURRENT_USER_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.GET_CURRENT_USER_FAILD:
            state.currentUser = "";
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.GET_CURRENT_USER_SUCCESS:
            let copyStateGetCurrentUser = { ...state }
            copyStateGetCurrentUser.currentUser = action.data;
            copyStateGetCurrentUser.isLoading = false
            return {
                ...copyStateGetCurrentUser
            }
        case actionTypes.UPDATE_SONG_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.UPDATE_SONG_SUCCESS:
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.UPDATE_SONG_FAILED:
            state.isLoading = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default userReducer;