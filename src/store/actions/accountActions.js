import actionTypes from "./actionTypes";
import {
    handleLogin,
    handleRegister,
    handleVerify,
    refreshToken,
    updateAvatar,
    updateCoverAvatar,
    updateProfile,
    getRoleByCurrentUser
} from "../../services/accountService";
import { toast } from 'react-toastify';

export const accountLoginSuccess = (accountInfo) => ({
    type: actionTypes.ACCOUNT_LOGIN_SUCCESS,
    accountInfo: accountInfo
})

export const accountLoginFail = (error) => ({
    type: actionTypes.ACCOUNT_LOGIN_FAIL,
    data: error
})

export const getRoleSuccess = (data) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    data: data
})

export const getRoleFail = (error) => ({
    type: actionTypes.GET_ROLE_FAILED,
    data: error
})

export const getRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ROLE_START })
            let data = await getRoleByCurrentUser()
            console.log(data, "role");
            if (data && data.errorCode === 200) {
                dispatch(getRoleSuccess(data.content))
            } else {
                dispatch(getRoleFail())
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(getRoleFail(error.response.data.message))
            }
        }
    }
}

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
                await dispatch(accountLoginSuccess(data.content.token))
                
            } else {
                dispatch(accountLoginFail(data.error))
            }
        } catch (error) {
            console.log(error);
            if (error && error.response && error.response.data) {
                dispatch(accountLoginFail(error.response.data.message))
            }
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

export const updateAvatarStart = (infoUpdate) => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.UPDATE_AVATAR_START })
            let data = await updateAvatar(infoUpdate)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(updateAvatarSuccess(data.content.token))
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(updateAvatarFailed(error.response.data.message))
            }
        }
    }
}

export const updateAvatarSuccess = (data) => ({
    type: actionTypes.UPDATE_AVATAR_SUCCESS,
    data: data
})

export const updateAvatarFailed = (data) => ({
    type: actionTypes.UPDATE_AVATAR_FAILDED,
    errorMessage: data
})

export const updateCoverAvatarStart = (infoUpdate) => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.UPDATE_COVER_AVATAR_START })
            let data = await updateCoverAvatar(infoUpdate)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(updateCoverAvatarSuccess(data.content.token))
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(updateCoverAvatarFailed(error.response.data.message))
            }
        }
    }
}

export const updateCoverAvatarSuccess = (data) => ({
    type: actionTypes.UPDATE_AVATAR_SUCCESS,
    data: data
})

export const updateCoverAvatarFailed = (data) => ({
    type: actionTypes.UPDATE_AVATAR_FAILDED,
    errorMessage: data
})

export const refreshTokenStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.REFRESH_TOKEN_START })
            let data = await refreshToken()
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(refreshTokenSuccess(data.content.token))
            } else {
                dispatch(refreshTokenFailed())
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(refreshTokenFailed(error.response.data.message))
            }
        }
    }
}

export const refreshTokenSuccess = (data) => ({
    type: actionTypes.REFRESH_TOKEN_SUCCESS,
    data: data
})

export const refreshTokenFailed = (data) => ({
    type: actionTypes.REFRESH_TOKEN_FAILED,
    errorMessage: data
})

export const updateInfoStart = (updateInfo) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPDATE_INFO_START })
            let data = await updateProfile(updateInfo)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(updateInfoSuccess())

            } else {
                dispatch(updateInfoFailed())
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export const updateInfoSuccess = () => ({
    type: actionTypes.UPDATE_INFO_SUCCESS,
})

export const updateInfoFailed = () => ({
    type: actionTypes.UPDATE_INFO_FAILED
})
