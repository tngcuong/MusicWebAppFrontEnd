import axios from "../axios";

const getAllRoles = () => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.get("api/Role/GetAll", {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        }
    })
}

export {
    getAllRoles
}