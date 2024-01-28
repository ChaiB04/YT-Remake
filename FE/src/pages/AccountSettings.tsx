import { useEffect, useState } from "react";
import User from "../domains/User";
import Role from "../enums/Role";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";


function AccountSettings() {
    const accessToken = ''
    const navigate = useNavigate()
    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        password: '',
        email: '',
        picture: [],
        role: Role.DEFAULT
    });

    useEffect(() => {
        
        if (!accessToken){
            navigate("/login")
        }

        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await UserService.getByAccessToken();
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    return (
        <></>
    )
}

export default AccountSettings