import axios from "../axios";

const getAllSongs = (pageIndex, pageSize) => {
    return axios.get(`api/Song/GetSong?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

export {
    getAllSongs
}