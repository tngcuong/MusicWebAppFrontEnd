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


export {
    getAllAlbums,
    getDetailAlbumById,
    getDetailAlbumByUserId
}