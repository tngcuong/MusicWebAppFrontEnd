import axios from "../axios"

const handleLogin = (userName, password) => {
    var param = JSON.stringify({ "userName": userName, "password": password })
    return axios.post('api/Account/Login', param, {
    })
}

export { handleLogin } 