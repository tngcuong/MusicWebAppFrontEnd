import axios from "../axios"

const getAllAlbums = (pageIndex, pageSize) => {
    return axios.get(`api/PlayList/GetAllAlbum?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

export {
    getAllAlbums
}