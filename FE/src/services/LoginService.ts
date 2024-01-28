import axios from "../axiosConfig.ts";
import User from "../domains/User.ts";

function login(user: User){
    return axios.post("/login", user)
}


const Login = {
    login
}

export default Login;