import actionTypes from './actionTypes';
import {
    getAllSongs,
    createASong,
    deleteASongById,
    getLikedSong,
    likeSong,
    unLikeSong,
    top5likedSong,
    countLiked,
    getSongDesByUserId,
    GetRalatedSongByUserId,
    SearchSongByName,
    getSongById,
} from '../../services/songService';

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
            dispatch({ type: actionTypes.FETCH_SONG_START })
            let data = await getAllSongs(pageIndex, pageSize)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(fetchSongSuccess(data.content))
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
                dispatch(likeSongSuccess())
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
    data: true
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
                dispatch(unLikeSongSuccess())
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
    data: false
})

export const unLikeSongFailed = (error) => ({
    type: actionTypes.UNLIKE_SONG_FAILED,
    flag: error
})

export const getTop5LikedSongStart = (idUser) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_TOP5_LIKED_SONG_START })
            let data = await top5likedSong(idUser)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(getTop5LikedSongSuccess(data.content))
            } else {
                dispatch(getTop5LikedSongStartFailed(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getTop5LikedSongSuccess = (data) => ({
    type: actionTypes.GET_TOP5_LIKED_SONG_SUCCESS,
    data: data
})

export const getTop5LikedSongStartFailed = (error) => ({
    type: actionTypes.GET_TOP5_LIKED_SONG_FAILED,
    flag: error
})

export const getCountNumberStart = (idSong) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_NUMBER_LIKED_START })
            let data = await countLiked(idSong)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(getCountNumberSuccess(data.content))
            } else {
                dispatch(getCountNumberFailded(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getCountNumberSuccess = (data) => ({
    type: actionTypes.GET_NUMBER_LIKED_SUCCESS,
    data: data
})

export const getCountNumberFailded = (error) => ({
    type: actionTypes.GET_NUMBER_LIKED_FAILDED,
    flag: error
})

export const getSongDesByUserIdStart = (idUser, pageIndex, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_SONG_DES_BY_ID_START })
            let data = await getSongDesByUserId(idUser, pageIndex, pageSize)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(getSongDesByUserIdSuccess(data.content))
            } else {
                dispatch(getSongDesByUserIdFailded(data.error))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getSongDesByUserIdSuccess = (data) => ({
    type: actionTypes.GET_SONG_DES_BY_ID_SUCCESS,
    data: data
})

export const getSongDesByUserIdFailded = (error) => ({
    type: actionTypes.GET_SONG_DES_BY_ID_FAILDED,
    flag: error
})

export const uploadSongStart = (song) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPLOAD_SONG_START })
            let data = await createASong(song)
            console.log(data);
            if (data && data.errorCode === 200) {

                dispatch(uploadSongSuccess())
            } else {
                dispatch(uploadSongFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(uploadSongFailed(error.response.data.message))
            }
        }
    }
}

export const uploadSongSuccess = () => ({
    type: actionTypes.UPLOAD_SONG_SUCCESS
})

export const uploadSongFailed = (error) => ({
    type: actionTypes.UPLOAD_SONG_FAILDED,
    data: error
})

export const getRelatedSongStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_RELATED_SONG_START })
            let data = await GetRalatedSongByUserId(id)
            console.log(data);
            if (data && data.errorCode === 200) {

                dispatch(getRelatedSongSuccess(data.content.relatedSong))
            } else {
                dispatch(getRelatedSongFailed())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(getRelatedSongFailed(error.response.data.message))
            }
        }
    }
}

export const getRelatedSongSuccess = (data) => ({
    type: actionTypes.GET_RELATED_SONG_SUCCESS,
    data: data,
})

export const getRelatedSongFailed = () => ({
    type: actionTypes.GET_RELATED_SONG_FAILDED,
})

export const SearchSongByNameStart = (name) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SEARCH_SONG_BY_NAME_START })
            let data = await SearchSongByName(name)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(SearchSongByNameSuccess(data.content))

            } else {
                dispatch(SearchSongByNameFailded())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(SearchSongByNameFailded(error.response.data.message))
            }
        }
    }
}

export const SearchSongByNameSuccess = (data) => ({
    type: actionTypes.SEARCH_SONG_BY_NAME_SUCCESS,
    data: [...data]
})

export const SearchSongByNameFailded = () => ({
    type: actionTypes.SEARCH_SONG_BY_NAME_FAILED,
})

export const getSongByIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_SONG_BY_ID_START })
            let data = await getSongById(id)
            console.log(data);
            if (data && data.errorCode === 200) {
                dispatch(getSongByIdSuccess(data.content))

            } else {
                dispatch(getSongByIdFail())
            }
        } catch (error) {
            if (error && error.response && error.response.data) {
                dispatch(getSongByIdFail(error.response.data.message))
            }
        }
    }
}

export const getSongByIdSuccess = (data) => ({
    type: actionTypes.GET_SONG_BY_ID_SUCCESS,
    data: data
})

export const getSongByIdFail = () => ({
    type: actionTypes.GET_SONG_BY_ID_FAILED,
})
