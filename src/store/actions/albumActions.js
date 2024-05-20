import actionTypes from './actionTypes';

import {
    getAllAlbums,
    getDetailAlbumById,
    getDetailAlbumByUserId,
    toggleLikePLayList,
    deletePlayList,
    uploadPlaylist
} from '../../services/albumService';

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
    type: actionTypes.GET_DETAIL_ALBUM_FAILED,
    error: error
})

export const getDetailAlbumStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_ALBUM_START })
            let data = await getDetailAlbumById(id)
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

export const getAlbumByUserIdSuccess = (data) => ({
    type: actionTypes.GET_ALBUM_SUCCESS_BY_ID,
    data: data
})

export const getAlbumByUserIdFailed = (error) => ({
    type: actionTypes.GET_ALBUM_FAILED_BY_ID,
    error: error
})

export const getAlbumByUserIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALBUM_START_BY_ID })
            let data = await getDetailAlbumByUserId(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(getAlbumByUserIdSuccess(data.content))
            } else {
                dispatch(getAlbumByUserIdFailed())
            }
        } catch (error) {
            console.log(error.response);
            if (error && error.response && error.response.data) {
                dispatch(getAlbumByUserIdFailed(error.response.data.message))
            }
        }
    }
}

export const setCurrentAlbum = (data) => ({
    type: actionTypes.SET_CURRENT_ALBUM,
    data: data
})

export const toggleLikeAlbumStart = (idUser, idSong) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.TOGGLE_LIKE_ALBUM_START })
            let data = await toggleLikePLayList(idUser, idSong)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(toggleLikeAlbumSuccess())
            } else {
                dispatch(toggleLikeAlbumFailed(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const toggleLikeAlbumSuccess = () => ({
    type: actionTypes.TOGGLE_LIKE_ALBUM_SUCCESS,
})

export const toggleLikeAlbumFailed = (error) => ({
    type: actionTypes.TOGGLE_LIKE_ALBUM_FAILED,
    flag: error
})

export const deletePlayListStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_ALBUM_START })
            let data = await deletePlayList(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(deletePlayListSuccess())

            } else {
                dispatch(deletePlayListFailed())
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export const deletePlayListSuccess = () => ({
    type: actionTypes.DELETE_ALBUM_SUCCESS,
})

export const deletePlayListFailed = () => ({
    type: actionTypes.DELETE_ALBUM_FAILED
})

export const uploadPlaylistStart = (playlist) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPLOAD_PLAYLIST_START })
            let data = await uploadPlaylist(playlist)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(uploadPlaylistSuccess())

            } else {
                dispatch(uploadPlaylistFailded())
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const uploadPlaylistSuccess = () => ({
    type: actionTypes.UPLOAD_PLAYLIST_SUCCESS
})

export const uploadPlaylistFailded = () => ({
    type: actionTypes.UPLOAD_PLAYLIST_FAILDED
})

