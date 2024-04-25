import axios from "../axios";

const getAllSongs = (pageIndex, pageSize) => {
    return axios.get(`api/Song/GetSong?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const createASong = (song) => {
    const formData = new FormData();
    formData.append("UserId", song.UserId);
    formData.append("Img", song.Img);
    formData.append("Name", song.Name);
    formData.append("Source", song.Source);
    formData.append("DurationTime", song.Duration);
    return axios.post('/api/Song/Insert', formData)
}

const deleteASongById = (id) => {
    return axios.delete(`api/Song/DeleteASongById?id=${id}`)
}

const getLikedSong = (id) => {
    return axios.delete(`api/LikedSong/GetLikedSongById?id=${id}`)
}


export {
    getLikedSong,
    getAllSongs,
    createASong,
    deleteASongById
}