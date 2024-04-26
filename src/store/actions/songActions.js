import actionTypes from './actionTypes';
import { getAllSongs, createASong, deleteASongById, getLikedSong, likeSong, unLikeSong } from '../../services/songService';

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
                console.log(data);
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

export const firstMount = () => ({
    type: actionTypes.FIRST_MOUNT,
})

export const showPlayer = (flag) => ({
    type: actionTypes.SHOW_PLAYER,
    data: flag
})

export const deleteSongSuccess = () => ({
    type: actionTypes.DELETE_SONG_SUCCESS,
})

export const deleteSongFailed = () => ({
    type: actionTypes.DELETE_SONG_FAILED
})

export const getCurrentSong = (song) => ({
    type: actionTypes.GET_CURRENT_SONG,
    song: song,
})

export const playMusic = (flag) => ({
    type: actionTypes.PLAY_SONG,
    flag: flag
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

export const getLikedSongStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_LIKED_SONG_START })
            let data = await getLikedSong(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                getLikedSongSuccess(data.content)
            } else {
                dispatch(getLikedSongFailed(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getLikedSongSuccess = (list) => ({
    type: actionTypes.GET_LIKED_SONG_SUCCESS,
    song: list,
})

export const getLikedSongFailed = (error) => ({
    type: actionTypes.GET_LIKED_SONG_FAILED,
    flag: error
})

export const likeSongStart = (idUser, idSong) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.LIKE_SONG_START })
            let data = await likeSong(idUser, idSong)
            console.log(data);
            if (data && data.errorCode === 200) {
                likeSongSuccess()
            } else {
                dispatch(likeSongFailed(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const likeSongSuccess = () => ({
    type: actionTypes.LIKE_SONG_SUCCESS,
})

export const likeSongFailed = (error) => ({
    type: actionTypes.LIKE_SONG_FAILED,
    flag: error
})

export const unLikeSongStart = (idUser, idSong) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UNLIKE_SONG_START })
            let data = await unLikeSong(idUser, idSong)
            console.log(data);
            if (data && data.errorCode === 200) {
                unLikeSongSuccess()
            } else {
                dispatch(unLikeSongFailed(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const unLikeSongSuccess = () => ({
    type: actionTypes.UNLIKE_SONG_SUCCESS,
})

export const unLikeSongFailed = (error) => ({
    type: actionTypes.UNLIKE_SONG_FAILED,
    flag: error
})



