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
    UPDATE_AVATAR_START: "UPDATE_AVATAR_START",
    UPDATE_AVATAR_SUCCESS: "UPDATE_AVATAR_SUCCESS",
    UPDATE_AVATAR_FAILDED: "UPDATE_AVATAR_FAILDED",
    UPDATE_COVER_AVATAR_START: "UPDATE_COVER_AVATAR_START",
    UPDATE_COVER_AVATAR_SUCCESS: "UPDATE_COVER_AVATAR_SUCCESS",
    UPDATE_COVER_AVATAR_FAILDED: "UPDATE_COVER_AVATAR_FAILDED",
    SEARCH_PEOPLE_BY_NAME_START: "SEARCH_PEOPLE_BY_NAME_START",
    SEARCH_PEOPLE_BY_NAME_SUCCESS: "SEARCH_PEOPLE_BY_NAME_SUCCESS",
    SEARCH_PEOPLE_BY_NAME_FAILED: "SEARCH_PEOPLE_BY_NAME_FAILED",
    TOGGLE_FOLLOW_START: 'TOGGLE_FOLLOW_START',
    TOGGLE_FOLLOW_SUCCESS: 'TOGGLE_FOLLOW_SUCCESS',
    TOGGLE_FOLLOW_FAILED: 'TOGGLE_FOLLOW_FAILED',
    GET_ROLE_START: 'GET_ROLE_START',
    GET_ROLE_SUCCESS: 'GET_ROLE_SUCCESS',
    GET_ROLE_FAILED: 'GET_ROLE_FAILED',
    GET_RANDOM_SONG_START: 'GET_RANDOM_SONG_START',
    GET_RANDOM_SONG_SUCCESS: 'GET_RANDOM_SONG_SUCCESS',
    GET_RANDOM_SONG_FAILED: 'GET_RANDOM_SONG_FAILED',


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
    UPDATE_INFO_START: 'UPDATE_INFO_START',
    UPDATE_INFO_SUCCESS: 'UPDATE_INFO_SUCCESS',
    UPDATE_INFO_FAILED: 'UPDATE_INFO_FAILED',
    CHANGE_PASSWORD_START: 'CHANGE_PASSWORD_START',
    CHANGE_PASSWORD_FAIL: 'CHANGE_PASSWORD_FAIL',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',

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
    UPLOAD_SONG_START: "UPLOAD_SONG_START",
    UPLOAD_SONG_SUCCESS: "UPLOAD_SONG_SUCCESS",
    UPLOAD_SONG_FAILDED: "UPLOAD_SONG_FAILDED",
    GET_RELATED_SONG_START: "GET_RELATED_SONG_START",
    GET_RELATED_SONG_SUCCESS: "GET_RELATED_SONG_SUCCESS",
    GET_RELATED_SONG_FAILDED: "GET_RELATED_SONG_FAILDED",
    SEARCH_SONG_BY_NAME_START: "SEARCH_SONG_BY_NAME_START",
    SEARCH_SONG_BY_NAME_SUCCESS: "SEARCH_SONG_BY_NAME_SUCCESS",
    SEARCH_SONG_BY_NAME_FAILED: "SEARCH_SONG_BY_NAME_FAILED",
    GET_SONG_BY_ID_START: "GET_SONG_BY_ID_START",
    GET_SONG_BY_ID_SUCCESS: "GET_SONG_BY_ID_SUCCESS",
    GET_SONG_BY_ID_FAILED: "GET_SONG_BY_ID_FAILED",
    GET_RANDOM_USER_START: 'GET_RANDOM_USER_START',
    GET_RANDOM_USER_SUCCESS: 'GET_RANDOM_USER_SUCCESS',
    GET_RANDOM_USER_FAILED: 'GET_RANDOM_USER_FAILED',
    TOGGLE_APPROVE_SONG_START: "TOGGLE_APPROVE_SONG_START",
    TOGGLE_APPROVE_SONG_SUCCESS: "TOGGLE_APPROVE_SONG_SUCCESS",
    TOGGLE_APPROVE_SONG_FAILED: "TOGGLE_APPROVE_SONG_FAILED",
    FETCH_SONG_ADMIN_SUCCESS: 'FETCH_SONG_ADMIN_SUCCESS',
    FETCH_SONG_ADMIN_FAILED: 'FETCH_SONG_ADMIN_FAILED',
    FETCH_SONG_ADMIN_START: 'FETCH_SONG_ADMIN_START',

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
    TOGGLE_LIKE_ALBUM_START: 'TOGGLE_LIKE_ALBUM_START',
    TOGGLE_LIKE_ALBUM_SUCCESS: 'TOGGLE_LIKE_ALBUM_SUCCESS',
    TOGGLE_LIKE_ALBUM_FAILED: 'TOGGLE_LIKE_ALBUM_FAILED',
    DELETE_ALBUM_SUCCESS: 'DELETE_ALBUM_SUCCESS',
    DELETE_ALBUM_FAILED: 'DELETE_ALBUM_FAILED',
    DELETE_ALBUM_START: 'DELETE_ALBUM_START',
    UPLOAD_PLAYLIST_START: "UPLOAD_PLAYLIST_START",
    UPLOAD_PLAYLIST_SUCCESS: "UPLOAD_PLAYLIST_SUCCESS",
    UPLOAD_PLAYLIST_FAILDED: "UPLOAD_PLAYLIST_FAILDED",
    ADD_SONG_TO_ALBUM_START: "ADD_SONG_TO_ALBUM_START",
    ADD_SONG_TO_ALBUM_SUCCESS: "ADD_SONG_TO_ALBUM_SUCCESS",
    ADD_SONG_TO_ALBUM_FAILDED: "ADD_SONG_TO_ALBUM_FAILDED",
    SEARCH_ALBUM_BY_NAME_START: "SEARCH_ALBUM_BY_NAME_START",
    SEARCH_ALBUM_BY_NAME_SUCCESS: "SEARCH_ALBUM_BY_NAME_SUCCESS",
    SEARCH_ALBUM_BY_NAME_FAILED: "SEARCH_ALBUM_BY_NAME_FAILED",
    CLEAR_CURRENT_ALBUM: "CLEAR_CURRENT_ALBUM",
    ADD_SONG_TO_CURRENT_ALBUM: "ADD_SONG_TO_CURRENT_ALBUM",

    //comment 
    GET_COMMENT_BY_SONG_ID_START: "GET_COMMENT_BY_SONG_ID_START",
    GET_COMMENT_BY_SONG_ID_SUCCESS: "GET_COMMENT_BY_SONG_ID_SUCCESS",
    GET_COMMENT_BY_SONG_ID_FAILED: "GET_COMMENT_BY_SONG_ID_FAILED",
    ADD_COMMENT_START: "ADD_COMMENT_START",
    ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
    ADD_COMMENT_FAILED: "ADD_COMMENT_FAILED",
    GET_APPROVED_COMMENT_START: "GET_APPROVED_COMMENT_START",
    GET_APPROVED_COMMENT_SUCCESS: "GET_APPROVED_COMMENT_SUCCESS",
    GET_APPROVED_COMMENT_FAILED: "GET_APPROVED_COMMENT_FAILED",
    GET_UNAPPROVED_COMMENT_START: "GET_UNAPPROVED_COMMENT_START",
    GET_UNAPPROVED_COMMENT_SUCCESS: "GET_UNAPPROVED_COMMENT_SUCCESS",
    GET_UNAPPROVED_COMMENT_FAILED: "GET_UNAPPROVED_COMMENT_FAILED",
    TOGGLE_APPROVE_COMMENT_START: "TOGGLE_APPROVE_COMMENT_START",
    TOGGLE_APPROVE_COMMENT_SUCCESS: "TOGGLE_APPROVE_COMMENT_SUCCESS",
    TOGGLE_APPROVE_COMMENT_FAILED: "TOGGLE_APPROVE_COMMENT_FAILED",
    DELETE_COMMENT_START: "DELETE_COMMENT_START",
    DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
    DELETE_COMMENT_FAILED: "DELETE_COMMENT_FAILED",

    //render
    FIRST_MOUNT: "FIRST_MOUNT",
    SHOW_PLAYER: "SHOW_PLAYER"
})

export default actionTypes;