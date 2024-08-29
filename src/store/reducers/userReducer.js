import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: [],
    isLoading: false,
    currentUser: {},
    user: {},
    searchUser: [],
    randomUser: [],
    isFollow: false
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
            state.currentUser = {};
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.GET_CURRENT_USER_SUCCESS:
            let copyStateGetCurrentUser = { ...state }
            copyStateGetCurrentUser.currentUser = { ...action.data };
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
        case actionTypes.GET_USER_ID_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.GET_USER_ID_SUCCESS:
            state.isLoading = false
            state.user = { ...action.data }
            return {
                ...state
            }
        case actionTypes.GET_USER_ID_FAILED:
            state.isLoading = false
            state.user = {}
            return {
                ...state
            }
        case actionTypes.SEARCH_PEOPLE_BY_NAME_START:
            state.isLoading = true
            state.isFailed = true
            return {
                ...state
            }
        case actionTypes.SEARCH_PEOPLE_BY_NAME_SUCCESS:
            state.isLoading = false
            state.isFailed = false
            state.searchUser = [...action.data]
            return {
                ...state
            }
        case actionTypes.SEARCH_PEOPLE_BY_NAME_FAILED:
            state.isLoading = false
            state.isFailed = true
            state.searchUser = []
            return {
                ...state
            }
        case actionTypes.TOGGLE_FOLLOW_START:
            state.isLoading = true
            state.isFollow = !state.isFollow
            return {
                ...state
            }
        case actionTypes.TOGGLE_FOLLOW_SUCCESS:
            state.isLoading = false
            state.isFollow = !state.isFollow
            return {
                ...state
            }
        case actionTypes.TOGGLE_FOLLOW_FAILED:
            state.isLoading = false
            state.isFollow = !state.isFollow
            return {
                ...state
            }
        case actionTypes.GET_RANDOM_USER_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.GET_RANDOM_USER_SUCCESS:
            state.isLoading = false
            state.randomUser = [...action.data]
            return {
                ...state
            }
        case actionTypes.GET_RANDOM_USER_FAILED:
            state.isLoading = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default userReducer;