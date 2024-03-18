import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: [],
    isLoading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true
            console.log("start", state);
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            state.isLoading = false
            console.log("failed", state);
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState = { ...state }
            copyState.roles = action.data;
            copyState.isLoading = false
            console.log("success", copyState);
            return {
                ...copyState
            }
        default:
            return state;
    }
}

export default userReducer;