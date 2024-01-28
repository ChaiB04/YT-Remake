import axios from "../axiosConfig.ts";
import User from '../domains/User'

function get(id: string) {
    return axios.get(`/user/${id}`)
}

function getByAccessToken() {
    const config = {
        headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWlseUBnbWFpbC5jb20iLCJpYXQiOjE3MDY0NjMzMjIsImV4cCI6MTcwNzMyNzMyMiwicm9sZXMiOiJWSUVXRVIiLCJpZCI6IjY1YjM3NGQ4YzAzMTM1NjlhYmIxYjk1ZCJ9.KbNyP98LtgsB5sF1neatPVa958MMOBXjqG7dds0rLzk"}`,
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