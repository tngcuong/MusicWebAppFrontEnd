import actionTypes from "./actionTypes";

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