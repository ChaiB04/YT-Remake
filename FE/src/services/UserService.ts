import axios from "../axiosConfig.ts";
import User from '../domains/User'
import { AxiosRequestConfig } from "axios";

function get(id: string) {
    return axios.get(`/user/${id}`)
}

function getByUsername(username: string){
    return axios.get(`/user/username`, { params: { username } })
}

function getByAccessToken() {
    return axios.get(`/user/accessToken`)
}

function create(user: User) {
    return axios.post("/user", user)
}

function update(user: User) {
    return axios.put(`/user/${user.id}`, user)
}

function deleteUser(user: User, accessToken: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            id: user.id,
            password: user.password
        }
    };

    return axios.delete('/user', config);
}

const UserService = {
    get,
    getByUsername,
    getByAccessToken,
    create,
    update,
    deleteUser
}

export default UserService