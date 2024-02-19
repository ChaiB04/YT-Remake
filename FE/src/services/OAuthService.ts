import axios from "../axiosConfig.ts";

function loginWithGoogle(){
    return axios.get("/oauth2")
}

interface data{
    code: string
}


function postGoogleCodeReceiveAccessToken(data: data){
    return axios.post(`/oauth2/ExchangeCode`, data)
}

function googleAccessTokenToLoginAccessToken(googletoken: string){
    return axios.post("/oauth2/loginGoogle", googletoken)
}

const OAuthService = {
    loginWithGoogle,
    postGoogleCodeReceiveAccessToken,
    googleAccessTokenToLoginAccessToken
}

export default OAuthService;

