import actionTypes from './actionTypes';
import { getAllRoles } from '../../services/roleService';
import { getCurrentUser, editUser } from '../../services/userService';


export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const fetchRoleSuccess = (dataRoles) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: dataRoles
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// export const fetchRoleStart = () => ({
//     type: actionTypes.FETCH_ROLE_START
// })

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })

            let data = await getAllRoles()
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(fetchRoleSuccess(data.content))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log(error);
        }
    }

}


export const getCurrentUserStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_CURRENT_USER_START })

            let data = await getCurrentUser()
            console.log(data);
            if (data && data.id) {
                dispatch(getCurrentUserSuccess(data.id))
            } else {
                dispatch(getCurrentUserFailded())
            }
        } catch (error) {
            dispatch(getCurrentUserFailded())
            console.log(error);
        }
    }
}

export const getCurrentUserSuccess = (currentUser) => ({
    type: actionTypes.GET_CURRENT_USER_SUCCESS,
    data: currentUser
})

export const getCurrentUserFailded = () => ({
    type: actionTypes.GET_CURRENT_USER_FAILD
})

export const updateUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPDATE_USER_START })

            let data = await editUser(user)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(updateUserSuccess())
                
            } else {
                dispatch(updateUserFailed())
            }
        } catch (error) {
            dispatch(updateUserFailed())
            console.log(error);
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})
