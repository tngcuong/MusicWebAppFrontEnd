import axios from "../axios";

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
    console.log(user);
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.put(`api/User/UpdateUserById?id=${user.Id}`, user, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        },
    })
}

export {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUser
}