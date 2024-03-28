import actionTypes from './actionTypes';
import { getAllSongs, createASong, deleteASongById } from '../../services/songService';

export const fetchSongSuccess = (songs) => ({
    type: actionTypes.FETCH_SONG_SUCCESS,
    data: songs
})

export const fetchSongFailed = () => ({
    type: actionTypes.FETCH_SONG_FAILED
})

export const fetchSongStart = (pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let data = await getAllSongs(pageIndex, pageSize)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(fetchSongSuccess(data.content.data))
            } else {
                dispatch(fetchSongFailed())
            }
        } catch (error) {
            dispatch(fetchSongFailed())
            console.log(error);
        }
    }
}

export const addSongStart = (song, pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.ADD_SONG_START })
            let data = await createASong(song)
            console.log(data);
            if (data && data.errorCode === 200) {

                dispatch(addSongSuccess(data.content))
                dispatch(fetchSongStart(pageIndex, pageSize))
            } else {
                dispatch(addSongFailed())
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addSongSuccess = () => ({
    type: actionTypes.ADD_SONG_SUCCESS
})

export const addSongFailed = () => ({
    type: actionTypes.ADD_SONG_FAILED
})


export const deleteSongSuccess = () => ({
    type: actionTypes.DELETE_SONG_SUCCESS,
})

export const deleteSongFailed = () => ({
    type: actionTypes.DELETE_SONG_FAILED
})

export const getCurrentSong = (song) => ({
    type: actionTypes.GET_CURRENT_SONG,
    song: song
})


export const deleteSongStart = (id, pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_SONG_START })
            let data = await deleteASongById(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(fetchSongStart(pageIndex, pageSize))
                dispatch(deleteSongSuccess())

            } else {
                dispatch(deleteSongFailed())
            }
        } catch (error) {
            console.log(error);
        }
    }

}

