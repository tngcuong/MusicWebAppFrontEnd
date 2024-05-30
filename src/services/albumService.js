import axios from "../axios"

const getAllAlbums = (pageIndex, pageSize) => {
    return axios.get(`api/PlayList/GetAllPlayList?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const getDetailAlbumById = (id) => {
    return axios.get(`api/PlayList/GetPlayListById?id=${id}`)
}

const getDetailAlbumByUserId = (id) => {
    return axios.get(`api/PlayList/GetPlayListByUserId?id=${id}`)
}

const toggleLikePLayList = (idUser, idPlayList) => {
    return axios.post(`api/LikedPlayList/ToggleLikePLayList?idUser=${idUser}`, idPlayList)
}

const countLiked = (idPlayList) => {
    return axios.get(`api/LikedPlayList/CountLikedPlaylistByPlayListId?id=${idPlayList}`)
}

const deletePlayList = (idPlayList) => {
    return axios.delete(`api/PlayList/RemovePlayListById?id=${idPlayList}`)
}

const uploadPlaylist = (infoPlaylist) => {
    const formData = new FormData();
    formData.append("UserId", infoPlaylist.id);
    formData.append("Thumbnail", infoPlaylist.img);
    formData.append("Name", infoPlaylist.name);
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.post(`/api/PlayList/CreateAPlayList`, formData, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        }
    })
}

const InsertSongToList = async (data) => {
    return axios.post(`/api/PlayList/InsertSongToList`, data)
}

const SearchPlaylistByName = async (name) => {
    return axios.get(`/api/PlayList/SearchPlaylistByName?name=${name}`)
}

export {
    getAllAlbums,
    getDetailAlbumById,
    getDetailAlbumByUserId,
    toggleLikePLayList,
    countLiked,
    deletePlayList,
    uploadPlaylist,
    InsertSongToList,
    SearchPlaylistByName
}