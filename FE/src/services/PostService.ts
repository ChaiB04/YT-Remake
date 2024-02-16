import axios from "../axiosConfig.ts";
import Post from '../domains/Post'

function getAll(){
    return axios.get("/post")
}

function get(id: string){
    return axios.get(`/post/${id}`)
}

function getByTitle(title: string){
    return axios.get(`/post/title`, { params: { title } })
}

function create(post: Post){
    return axios.post("/post", post)
}


const PostService = {
    getAll,
    get,
    getByTitle,
    create
}

export default PostService