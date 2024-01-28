import axios from "../axiosConfig.ts";
import User from '../domains/User'

function get(id: string){
    return axios.get(`/user/${id}`)
}

function getByAccessToken(){
    return axios.get(`/user/accessToken`)
}

function create(user: User){
    return axios.post("/user", user)
}

function update(user: User){
    return axios.put("/user", user)
}

const UserService = {
    get,
    getByAccessToken,
    create,
    update
}

export default UserService