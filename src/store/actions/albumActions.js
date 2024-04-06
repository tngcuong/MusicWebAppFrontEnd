import actionTypes from './actionTypes';

import { getAllAlbums } from '../../services/albumService';

export const fetchAlbumSuccess = () => ({
    type: actionTypes.FETCH_ALBUM_SUCCESS,
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
