import axios from "../axios";

const getAllSongs = async (pageIndex, pageSize) => {
    return axios.get(`api/Song/GetSong?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const createASong = async (song) => {
    const formData = new FormData();
    formData.append("UserId", song.UserId);
    formData.append("Img", song.Img);
    formData.append("Name", song.Name);
    formData.append("Source", song.Source);
    return axios.post('/api/Song/Insert', formData)
}

const deleteASongById = async (id) => {
    return axios.delete(`api/Song/DeleteASongById?id=${id}`)
}

const getLikedSong = async (id) => {
    return axios.delete(`api/LikedSong/GetLikedSongById?id=${id}`)
}

const likeSong = (idUser, idSong) => {
    return axios.post(`api/LikedSong/AddSongToLikedSong?idUser=${idUser}`, idSong)
}

const unLikeSong = (idUser, idSong) => {
    return axios.post(`api/LikedSong/RemoveSongToLikedSong?idUser=${idUser}`, idSong)
}

const top5likedSong = (idUser) => {
    return axios.get(`api/LikedSong/GetMostLikedSongByUserId?id=${idUser}`)
}

const countLiked = (idSong) => {
    return axios.get(`api/LikedSong/GetLikedBySongId?id=${idSong}`)
}

const getSongDesByUserId = (idUser, pageIndex, pageSize) => {
    return axios.get(`api/Song/GetSongDescendingByIdUser?id=${idUser}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const getLikedSongByUserId = (idUser) => {
    return axios.get(`api/LikedSong/GetLikedSongByUserId?id=${idUser}`)
}

const GetRalatedSongByUserId = (idUser) => {
    return axios.get(`api/LikedSong/GetRalatedSongByUserId?id=${idUser}`)
}

const SearchSongByName = async (name) => {
    return axios.get(`/api/Song/SearchSongByName?name=${name}`)
}

const getSongById = (id) => {
    return axios.get(`/api/Song/GetSongById?id=${id}`)
}

export {
    unLikeSong,
    likeSong,
    getLikedSong,
    getAllSongs,
    createASong,
    deleteASongById,
    top5likedSong,
    countLiked,
    getSongDesByUserId,
    getLikedSongByUserId,
    GetRalatedSongByUserId,
    SearchSongByName,
    getSongById
}