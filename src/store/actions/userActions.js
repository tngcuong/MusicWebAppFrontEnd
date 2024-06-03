import actionTypes from './actionTypes';
import { getAllRoles } from '../../services/roleService';
import { getCurrentUser, editUser, getUserById, SearchUserByName } from '../../services/userService';


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
            if (data && data.content) {
                dispatch(getCurrentUserSuccess(data.content))
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

export const getUserIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_USER_ID_START })

            let data = await getUserById(id)
            console.log(data);
            if (data && data.content) {
                dispatch(getUserIdSuccess(data.content))
            } else {
                dispatch(getUserIdFailed())
            }
        } catch (error) {
            dispatch(getUserIdFailed())
            console.log(error);
        }
    }
}

export const getUserIdSuccess = (currentUser) => ({
    type: actionTypes.GET_USER_ID_SUCCESS,
    data: currentUser
})

export const getUserIdFailed = () => ({
    type: actionTypes.GET_USER_ID_FAILED
})

export const SearchPeopleByNameStart = (name) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SEARCH_PEOPLE_BY_NAME_START })
            let data = await SearchUserByName(name)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(SearchPeopleByNameSuccess(data.content))

            } else {
                dispatch(SearchPeopleByNameFailded())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(SearchPeopleByNameFailded(error.response.data.message))
            }
        }
    }
}

export const SearchPeopleByNameSuccess = (data) => ({
    type: actionTypes.SEARCH_PEOPLE_BY_NAME_SUCCESS,
    data: data
})

export const SearchPeopleByNameFailded = () => ({
    type: actionTypes.SEARCH_PEOPLE_BY_NAME_FAILED,
})
