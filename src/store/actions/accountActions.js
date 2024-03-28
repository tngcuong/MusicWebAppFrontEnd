import actionTypes from "./actionTypes";
import { handleLogin, handleRegister, handleVerify } from "../../services/accountService";
import { toast } from 'react-toastify';

export const accountLoginSuccess = (accountInfo) => ({
    type: actionTypes.ACCOUNT_LOGIN_SUCCESS,
    accountInfo: accountInfo
})

export const accountLoginFail = () => ({
    type: actionTypes.ACCOUNT_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const accountLoginStart = (userName, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.ACCOUNT_LOGIN_START })
            let data = await handleLogin(userName, password)
            console.log(data);
            if (data && data.errorCode === 200) {

                dispatch(accountLoginSuccess(data.content.token))
            } else {
                dispatch(accountLoginFail())
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const registerStart = (info) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.REGISTER_START })
            let data = await handleRegister(info)
            if (data && data.errorCode === 200) {
                dispatch(registerSuccess())
            } else {
                dispatch(registerFailded(data.message))
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(registerFailded(error.response.data.message))
            }
        }
    }
}

export const registerSuccess = () => ({
    type: actionTypes.REGISTER_SUCCESS
})

export const registerFailded = (data) => ({
    type: actionTypes.REGISTER_FAILDED,
    errorMessage: data
})

export const verifyStart = (info) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.VERIFY_START })
            let data = await handleVerify(info)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(verifySuccess())
            } else {
                dispatch(verifyFailded())
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(registerFailded(error.response.data.message))
            }
        }
    }
}

export const verifySuccess = () => ({
    type: actionTypes.VERIFY_SUCCESS
})

export const verifyFailded = (data) => ({
    type: actionTypes.VERIFY_FAILDED,
    errorMessage: data
})

