import actionTypes from './actionTypes';

import { getAllAlbums, getDetailAlbum } from '../../services/albumService';

export const fetchAlbumSuccess = (data) => ({
    type: actionTypes.FETCH_ALBUM_SUCCESS,
    data: data
})

export const fetchAlbumFailed = () => ({
    type: actionTypes.FETCH_ALBUM_FAILED
})

export const fetchAlbumStart = (pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALBUM_START })
            let data = await getAllAlbums(pageIndex, pageSize)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(fetchAlbumSuccess(data.content.data))
            } else {
                dispatch(fetchAlbumFailed())
            }
        } catch (error) {
            dispatch(fetchAlbumFailed())
            console.log(error);
        }
    }
}

export const getDetailAlbumSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_ALBUM_SUCCESS,
    data: data
})

export const getDetailAlbumFailed = (error) => ({
    type: actionTypes.GET_CURRENT_USER_FAILD,
    error: error
})

export const getDetailAlbumStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_ALBUM_START })
            let data = await getDetailAlbum(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(getDetailAlbumSuccess(data.content))
            } else {
                dispatch(getDetailAlbumFailed())
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(getDetailAlbumFailed(error.response.data.message))
            }
        }
    }
}
