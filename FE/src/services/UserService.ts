import axios from "../axiosConfig.ts";
import User from '../domains/User'
import { AxiosRequestConfig } from "axios";

function get(id: string) {
    return axios.get(`/user/${id}`)
}

function getByAccessToken(accessToken: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    return axios.get(`/user/accessToken`, config)
}

function create(user: User) {
    return axios.post("/user", user)
}

function update(user: User) {
    return axios.put(`/user/${user.id}`, user)
}

function deleteUser(user: User) {
    return axios.delete('/user', { data: user });
  }

const UserService = {
    get,
    getByAccessToken,
    create,
    update,
    deleteUser
}

export default UserService