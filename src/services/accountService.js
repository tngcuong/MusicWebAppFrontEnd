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


export { handleLogin, handleRegister, handleVerify } 