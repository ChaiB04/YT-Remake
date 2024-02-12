import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import User from "../domains/User";
import LoginService from '../services/LoginService';
import { toast, ToastPosition } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/Store";


interface DeleteUserProps {
    user: {
        id?: string;
        password?: string;
    };
}

const DeleteAccount: React.FC<DeleteUserProps> = (props) => {

    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const token = useSelector((state: RootState) => state.usertoken) || "";

    const handleDelete = async () => {
        try {
            // const user: User = {
            //     email: props.user.email,
            //     password: currentPassword
            // }

            // await LoginService.login(user);

            const deleteUser: User = {
                id: props.user.id,
                password: currentPassword
            }

            console.log(deleteUser)


            await UserService.deleteUser(deleteUser, token)
            toast.success("Successfully Deleted", { position: 'bottom-center' as ToastPosition })
            navigate("/login")
        }
        catch (error: any) {
            console.error(error)
            const errors = error.response.data.errors;

            if (errors) {
                if (error.response.data.status === 400) {
                    errors.forEach((error: any) => {
                        toast.error(error.error, { position: 'bottom-center' as ToastPosition });
                    }
                    )
                }
                else {
                    toast.error("Unexpected error ocurred", { position: 'bottom-center' as ToastPosition });
                }
            }
        }
    };

    return (
        <div>
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                sx={{ marginTop: 2, marginBottom: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleDelete}>
                Delete Account
            </Button>
        </div>
    );
}

export default DeleteAccount;