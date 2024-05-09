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


export {
    handleLogin,
    handleRegister,
    handleVerify,
    refreshToken
} 