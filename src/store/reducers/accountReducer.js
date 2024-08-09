import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';

const initialState = {
    isLoggedIn: false,
    accountInfo: null,
    isLoading: false,
    registerSuccess: false,
    verify: false,
    isApiFailded: false,
    role: ""
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_LOGIN_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.ACCOUNT_LOGIN_SUCCESS:
            toast.success('Login success')
            return {
                ...state,
                accountInfo: action.accountInfo,
                isLoggedIn: true,
                isLoading: false,
            }
        case actionTypes.ACCOUNT_LOGIN_FAIL:
            state.isLoading = false
            toast.error(action.data)
            return {
                ...state,
                isLoggedIn: false,
                accountInfo: null,
            }
        case actionTypes.GET_ROLE_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_ROLE_SUCCESS:
            state.isLoading = false
            state.role = action.data
            return {
                ...state,
            }
        case actionTypes.GET_ROLE_FAILED:
            state.isLoading = false
            return {
                ...state,
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accountInfo: null,
                role: ""
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
                isLoading: false
            }
        case actionTypes.VERIFY_SUCCESS:
            toast.success('Verify success')
            return {
                ...state,
                isLoading: false,
                verify: true,
                registerSuccess: false
            }
        case actionTypes.VERIFY_FAILDED:
            toast.error(action.errorMessage)
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.REFRESH_TOKEN_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.REFRESH_TOKEN_SUCCESS:

            return {

                ...state,
                isLoading: false,
                accountInfo: action.data
            }
        case actionTypes.REFRESH_TOKEN_FAILED:
            toast.error(action.errorMessage)
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.UPDATE_COVER_AVATAR_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.UPDATE_COVER_AVATAR_SUCCESS:

            return {

                ...state,
                isLoading: false,
            }
        case actionTypes.UPDATE_COVER_AVATAR_FAILDED:
            toast.error(action.errorMessage)
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.UPDATE_AVATAR_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.UPDATE_AVATAR_SUCCESS:

            return {

                ...state,
                isLoading: false,
            }
        case actionTypes.UPDATE_AVATAR_FAILDED:
            toast.error(action.errorMessage)
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.UPDATE_INFO_START:
            return {
                ...state,
                isLoading: true,
                isApiFailded: true
            }
        case actionTypes.UPDATE_INFO_SUCCESS:
            toast.error("update successfully")
            return {

                ...state,
                isLoading: false,
                isApiFailded: false
            }
        case actionTypes.UPDATE_INFO_FAILED:
            toast.error("update failded")
            return {
                ...state,
                isLoading: false,
                isApiFailded: true
            }
        default:
            return state;
    }
}

export default appReducer;