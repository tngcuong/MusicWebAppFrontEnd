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
    formData.append("DurationTime", song.Duration);
    return axios.post('/api/Song/Insert', formData)
}

const deleteASongById = async (id) => {
    return axios.delete(`api/Song/DeleteASongById?id=${id}`)
}

const getLikedSong = async (id) => {
    return axios.delete(`api/LikedSong/GetLikedSongById?id=${id}`)
}

const likeSong =  (idUser, idSong) => {
    return axios.post(`api/LikedSong/AddSongToLikedSong?idUser=${idUser}`, idSong)
}

const unLikeSong =  (idUser, idSong) => {
    return axios.post(`api/LikedSong/RemoveSongToLikedSong?idUser=${idUser}`, idSong)
}

export {
    unLikeSong,
    likeSong,
    getLikedSong,
    getAllSongs,
    createASong,
    deleteASongById
}