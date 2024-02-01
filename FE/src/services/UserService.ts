import axios from "../axiosConfig.ts";
import User from '../domains/User'

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

const UserService = {
    get,
    getByAccessToken,
    create,
    update
}

export default UserService