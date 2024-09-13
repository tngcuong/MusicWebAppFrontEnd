import axios from "../axios"

const addCategory = (data) => {
    const formData = new FormData();
    formData.append("UserId", data.id);
    formData.append("Name", data.name);
    formData.append("Thumbnail", data.img);
    return axios.post(`/api/Category/InsertACategory`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

const getCategoryBySongId = (id) => {
    return axios.get(`/api/Category/GetCategoryById?id=${id}`)
}

const getAllCategory = (pageIndex, pageSize) => {
    return axios.get(`/api/Category/GetAllCategory?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const updateCategory = (id, data) => {
    return axios.put(`/api/Category/Update?id=${id}`, data)
}

const deleteCategoryById = (id) => {
    return axios.delete(`/api/Category/RemoveCategoryById?id=${id}`)
}

export {
    updateCategory,
    getCategoryBySongId,
    getAllCategory,
    deleteCategoryById,
    addCategory
}