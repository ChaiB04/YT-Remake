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

interface googledata{
    googleToken: string
}

function linkGoogleAccount(data: googledata){
    return axios.post("/oauth/linkGoogle", data)
}

const OAuthService = {
    loginWithGoogle,
    postGoogleCodeReceiveAccessToken,
    googleAccessTokenToLoginAccessToken,
    linkGoogleAccount
}

export default OAuthService;

