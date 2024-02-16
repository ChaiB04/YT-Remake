import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Container, Typography, Paper } from "@mui/material";
import UserService from "../services/UserService";
import Role from '../enums/Role';
import User from '../domains/User';
import styles from '../styles/Profile.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/Store";

function Profile() {
    const { id } = useParams();
    const accesstoken = useSelector((state: RootState) => state.usertoken);
    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        password: '',
        email: '',
        picture: new Uint8Array,
        role: Role.DEFAULT
    });

    useEffect(() => {
        fetchUser();
    }, []);

        const fetchUser = async () => {
        if (id) {
            try {
                const response = await UserService.get(id);
                setUser(response.data);
                console.log(response)
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };
    

    // const fetchUser = async () => {
    //     if (id) {
    //         try {
    //             const response = await UserService.get(id);
    //             setUser(response.data);
    //             console.log(response)
    //         } catch (error) {
    //             console.error("Error fetching user:", error);
    //         }
    //     }
    // };

    function getImageSrc(picture: Uint8Array | number[]): string {
        return `data:image/jpeg;base64,${(picture.toString())}`;
    }


    return (
        <Container component="main" maxWidth="xs" className={styles.profileContainer}>
            <Paper elevation={3} className={styles.profilePaper}>
                <Avatar
                    alt={user.username}
                    src={user.picture ? getImageSrc(user.picture) : ''}
                    className={styles.profileAvatar}
                    sx={{ width: 250, height: 250, marginBottom: 2 }} />
                <Typography variant="h5" gutterBottom>
                    {user.username}
                </Typography>
                <Typography color="textSecondary">{user.email}</Typography>
            </Paper>
        </Container>
    );
}

export default Profile;
