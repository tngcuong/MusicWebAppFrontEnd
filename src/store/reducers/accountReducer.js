import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    accountInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                accountInfo: action.accountInfo
            }
        case actionTypes.ACCOUNT_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                accountInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accountInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;