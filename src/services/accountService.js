import axios from "../axios"

const handleLogin = (userName, password) => {
    var param = JSON.stringify({ "userName": userName, "password": password })
    return axios.post('api/Account/Login', param, {
    })
}

const handleRegister = (data) => {
    return axios.post('api/Account/Register', data, {
    })
}

const handleVerify = (data) => {
    return axios.post('api/Account/VerifyEmail', data, {
    })
}

const refreshToken = () => {
    const token = JSON.parse(localStorage.getItem("persist:account"))
    if (token != null) {
        return axios.get("api/Account/RefreshToken", {
            "headers": {
                "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
            }
        })
    }
}

const updateAvatar = (infoUpdate) => {
    const formData = new FormData();
    formData.append("Id", infoUpdate.id);
    formData.append("Avatar", infoUpdate.avatar);
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.put(`api/Account/UpdateAvatar`, formData, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        }
    })
}

const updateCoverAvatar = (infoUpdate) => {
    const formData = new FormData();
    formData.append("Id", infoUpdate.id);
    formData.append("CoverAvatar", infoUpdate.coverAvatar);
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.put(`api/Account/UpdateCoverAvatar`, formData, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        }
    })
}

const updateProfile = (infoUpdate) => {
    const formData = new FormData();
    formData.append("Id", infoUpdate.id);
    formData.append("Avatar", infoUpdate.img);
    formData.append("Name", infoUpdate.name);
    formData.append("Description", infoUpdate.description);
    const token = JSON.parse(localStorage.getItem("persist:account"))
    return axios.put(`api/Account/UpdateInfo`, formData, {
        "headers": {
            "Authorization": `bearer ${token.accountInfo.replace(/"/g, '')}`,
        }
    })
}

export {
    handleLogin,
    handleRegister,
    handleVerify,
    refreshToken,
    updateAvatar,
    updateCoverAvatar,
    updateProfile
} 