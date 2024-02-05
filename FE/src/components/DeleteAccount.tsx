import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import User from "../domains/User";
import LoginService from '../services/LoginService';
import { toast, ToastPosition } from 'react-toastify';
import { useNavigate } from "react-router-dom";


interface UpdatePasswordProps {
    user: {
        id?: string;
        email?: string;
        username?: string;
        picture?: Uint8Array | undefined
    };
}

const DeleteAccount: React.FC<UpdatePasswordProps> = (props) => {

    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");

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


            await UserService.deleteUser(deleteUser)
            toast.success("Successfully updated", { position: 'bottom-center' as ToastPosition })
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