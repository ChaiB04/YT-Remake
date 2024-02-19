import { CircularProgress } from "@mui/material";
import OAuthService from "../../../services/OAuthService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";


//Maybe here I can pass the task as a string and then in the backend it can differentiate
const ChooseLinking = () => {
    // function ChooseLogin(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function loginOAuth() {
        const url = window.location.href;
        const params = new URLSearchParams(new URL(url).search);
        const googlecode = params.get("code") || "";
        let googleAccessToken = "";
        // const task = ;


        console.log(googlecode)

        const data = {
            code: googlecode
        }

        const response = await OAuthService.postGoogleCodeReceiveAccessToken(data);

        googleAccessToken = response.data

        console.log("Accesstoken google: " + googleAccessToken)

        // if(task === "login"){
        const accesstoken = await OAuthService.googleAccessTokenToLoginAccessToken(googleAccessToken);
        dispatch(login(accesstoken));
        navigate("/");
        // }
        // else if(task === "create"){

        // }
        // else if(task === "link"){

        // }

    }

    useEffect(() => {
        loginOAuth();
    }, [])


    return (
        <>
            <CircularProgress />
        </>
    )



}

export default ChooseLinking;