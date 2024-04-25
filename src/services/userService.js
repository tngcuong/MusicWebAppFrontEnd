import axios from "../axios";
import { jwtDecode } from 'jwt-decode';

const getAllUsers = (pageIndex, pageSize) => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.get(`api/User/GetAllUser?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        }
    })
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



export {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUser,
    getCurrentUser,
    getUserById
}