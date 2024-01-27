import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Container, Typography, Paper } from "@mui/material";
import UserService from "../services/UserService";
import Role from '../enums/Role';
import User from '../domains/User';
import styles from '../styles/Profile.module.css';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        password: '',
        email: '',
        picture: [],
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
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };

    function arrayBufferToImageSrc(buffer: Uint8Array): string {
        const binary = String.fromCharCode(...buffer);
        return `data:image/jpeg;base64,${btoa(binary)}`;
    }


    return (
        <Container component="main" maxWidth="xs" className={styles.profileContainer}>
            <Paper elevation={3} className={styles.profilePaper}>
                <Avatar
                    alt={user.username}
                    src={user.picture ? arrayBufferToImageSrc(Uint8Array.from(user.picture)) : ''}
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
