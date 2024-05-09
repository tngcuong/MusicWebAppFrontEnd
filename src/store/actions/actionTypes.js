const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',
    FETCH_ROLE_START: 'FETCH_ROLE_START',
    GET_CURRENT_USER_START: 'GET_CURRENT_USER_START',
    GET_CURRENT_USER_FAILD: 'GET_CURRENT_USER_FAILD',
    GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',
    UPDATE_USER_START: 'UPDATE_USER_START',
    GET_USER_ID_START: "GET_USER_ID_START",
    GET_USER_ID_SUCCESS: "GET_USER_ID_SUCCESS",
    GET_USER_ID_FAILED: "GET_USER_ID_FAILED",

    //account
    ACCOUNT_LOGIN_START: 'ACCOUNT_LOGIN_START',
    ACCOUNT_LOGIN_SUCCESS: 'ACCOUNT_LOGIN_SUCCESS',
    ACCOUNT_LOGIN_FAIL: 'ACCOUNT_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    REGISTER_START: 'REGISTER_START',
    REGISTER_FAILDED: 'REGISTER_FAILDED',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    VERIFY_START: 'VERIFY_START',
    VERIFY_FAILDED: 'VERIFY_FAILDED',
    VERIFY_SUCCESS: 'VERIFY_SUCCESS',
    REFRESH_TOKEN_START: 'REFRESH_TOKEN_START',
    REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',
    REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED',

    //song
    FETCH_SONG_SUCCESS: 'FETCH_SONG_SUCCESS',
    FETCH_SONG_FAILED: 'FETCH_SONG_FAILED',
    FETCH_SONG_START: 'FETCH_SONG_START',
    ADD_SONG_SUCCESS: 'ADD_SONG_SUCCESS',
    ADD_SONG_FAILED: 'ADD_SONG_FAILED',
    ADD_SONG_START: 'ADD_SONG_START',
    UPDATE_SONG_SUCCESS: 'UPDATE_SONG_SUCCESS',
    UPDATE_SONG_FAILED: 'UPDATE_SONG_FAILED',
    UPDATE_SONG_START: 'UPDATE_SONG_START',
    DELETE_SONG_SUCCESS: 'DELETE_SONG_SUCCESS',
    DELETE_SONG_FAILED: 'DELETE_SONG_FAILED',
    DELETE_SONG_START: 'DELETE_SONG_START',
    GET_CURRENT_SONG: 'GET_CURRENT_SONG',
    PLAY_SONG: 'PLAY_SONG',
    LIKE_SONG_START: 'LIKE_SONG_START',
    LIKE_SONG_SUCCESS: 'LIKE_SONG_SUCCESS',
    LIKE_SONG_FAILED: 'LIKE_SONG_FAILED',
    UNLIKE_SONG_START: 'UNLIKE_SONG_START',
    UNLIKE_SONG_SUCCESS: 'UNLIKE_SONG_SUCCESS',
    UNLIKE_SONG_FAILED: 'UNLIKE_SONG_FAILED',
    GET_LIKED_SONG_START: 'GET_LIKED_SONG_START',
    GET_LIKED_SONG_SUCCESS: 'GET_LIKED_SONG_SUCCESS',
    GET_LIKED_SONG_FAILED: 'GET_LIKED_SONG_FAILED',
    GET_TOP5_LIKED_SONG_SUCCESS: 'GET_TOP5_LIKED_SONG_SUCCESS',
    GET_TOP5_LIKED_SONG_FAILED: 'GET_TOP5_LIKED_SONG_FAILED',
    GET_TOP5_LIKED_SONG_START: 'GET_TOP5_LIKED_SONG_START',
    GET_NUMBER_LIKED_START: "GET_NUMBER_LIKED_START",
    GET_NUMBER_LIKED_SUCCESS: "GET_NUMBER_LIKED_SUCCESS",
    GET_NUMBER_LIKED_FAILDED: "GET_NUMBER_LIKED_FAILDED",
    GET_SONG_DES_BY_ID_START: "GET_SONG_DES_BY_ID_START",
    GET_SONG_DES_BY_ID_SUCCESS: "GET_SONG_DES_BY_ID_SUCCESS",
    GET_SONG_DES_BY_ID_FAILDED: "GET_SONG_DES_BY_ID_FAILDED",

    //ablum
    FETCH_ALBUM_SUCCESS: 'FETCH_ALBUM_SUCCESS',
    FETCH_ALBUM_FAILED: 'FETCH_ALBUM_FAILED',
    FETCH_ALBUM_START: 'FETCH_ALBUM_START',
    GET_DETAIL_ALBUM_START: 'GET_DETAIL_ALBUM_START',
    GET_DETAIL_ALBUM_FAILED: 'GET_DETAIL_ALBUM_FAILED',
    GET_DETAIL_ALBUM_SUCCESS: 'GET_DETAIL_ALBUM_SUCCESS',
    GET_ALBUM_START_BY_ID: 'GET_ALBUM_START_BY_ID',
    GET_ALBUM_FAILED_BY_ID: 'GET_ALBUM_FAILED_BY_ID',
    GET_ALBUM_SUCCESS_BY_ID: 'GET_ALBUM_SUCCESS_BY_ID',
    SET_CURRENT_ALBUM: 'SET_CURRENT_ALBUM',

    //render
    FIRST_MOUNT: "FIRST_MOUNT",
    SHOW_PLAYER: "SHOW_PLAYER"
})

export default actionTypes;