import axios from "../axiosConfig.ts";
import User from '../domains/User'

function get(id: string){
    return axios.get(`/user/${id}`)
}

function create(user: User){
    return axios.post("/user", user)
}


const UserService = {
    get,
    create
}

export default UserService