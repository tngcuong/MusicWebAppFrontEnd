import axios from "../axios"

const getAllAlbums = (pageIndex, pageSize) => {
    return axios.get(`api/PlayList/GetAllAlbum?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const getDetailAlbum = (id) => {
    return axios.get(`api/PlayList/GetPlayListById?id=${id}`)
}

export {
    getAllAlbums,
    getDetailAlbum
}