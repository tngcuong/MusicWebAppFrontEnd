import actionTypes from './actionTypes';
import { getAllRoles } from '../../services/roleService';


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
