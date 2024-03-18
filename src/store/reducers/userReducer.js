import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROLE_START:
            console.log("start",action);
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            console.log("failed",action);
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState = {...state}
            copyState.roles = action.data;
            console.log("success",copyState);
            return {
                ...copyState
            }
        default:
            return state;
    }
}

export default userReducer;