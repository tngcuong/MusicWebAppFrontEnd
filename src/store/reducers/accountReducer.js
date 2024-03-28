import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoggedIn: false,
    accountInfo: null,
    isLoading: false,
    registerSuccess: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_LOGIN_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.ACCOUNT_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
                accountInfo: action.accountInfo
            }
        case actionTypes.ACCOUNT_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                accountInfo: null,
                isLoading: false
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accountInfo: null
            }
        case actionTypes.REGISTER_START:
            return {
                ...state,
                isLoading: true,
                registerSuccess: false,
            }
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                registerSuccess: true
            }
        case actionTypes.REGISTER_FAILDED:
            toast.error(action.errorMessage)
            return {
                ...state,
                isLoading: false,
                registerSuccess: false,
            }
        case actionTypes.VERIFY_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.VERIFY_SUCCESS:
            return {

                ...state,
                isLoading: false,
                registerSuccess: false
            }
        case actionTypes.VERIFY_FAILDED:
            toast.error(action.errorMessage)
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default appReducer;