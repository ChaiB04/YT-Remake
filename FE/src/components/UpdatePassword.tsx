import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import User from "../domains/User";
import LoginService from '../services/LoginService';
import { toast, ToastPosition } from 'react-toastify';


interface UpdatePasswordProps {
    user: {
        id?: string;
        email?: string;
        username?: string;
        picture?: Uint8Array | number[]
    };
}

const UpdatePassword: React.FC<UpdatePasswordProps> = (props) => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("");

    const handleUpdate = async () => {
        try {
            const user: User = {
                email: props.user.email,
                password: currentPassword
            }

            await LoginService.login(user);

            const updatedUser: User = {
                id: props.user.id,
                email: props.user.email,
                username: props.user.username,
                picture: props.user.picture,
                password: password
            }
            const response = await UserService.update(updatedUser)
            toast.success("Successfully updated", { position: 'bottom-center' as ToastPosition })
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
                label="Current Password"
                variant="outlined"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <TextField
                label="New Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Password
            </Button>
        </div>
    );
}

export default UpdatePassword