import axios from "../axios";
import { jwtDecode } from 'jwt-decode';

const getAllUsers = (pageIndex, pageSize) => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.get(`api/User/GetAllUser?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

const createNewUserService = (data) => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.post('api/User/Insert', data, {
        "headers": {
            Authorization: `bearer ${token.accountInfo.replace(/"/g, '')}`,
        },
    })
}

const deleteUserService = (id) => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.delete(`api/User/DeleteUserById?id=${id}`, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        },
    })
}

const editUser = (user) => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.put(`api/User/UpdateUserById?id=${user.id}`, user, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        },
    })
}

const getCurrentUser = async () => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.get("api/User/GetCurrentUser", {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        },
    })
}

const getUserById = async (id) => {
    return axios.get(`api/User/GetUserById?id=${id}`)
}

const getFollowerByUserId = async (id) => {
    return axios.get(`api/User/GetFollowerByUserId?id=${id}`)
}

const SearchUserByName = async (name) => {
    return axios.get(`api/User/SearchPeopleByName?name=${name}`)
}

const toggleFollow = (id, idUser) => {
    return axios.post(`api/User/ToggleFollowUser?id=${id}`, idUser)
}


export {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUser,
    getCurrentUser,
    getUserById,
    getFollowerByUserId,
    SearchUserByName,
    toggleFollow
}