import React, { useState, useEffect, ChangeEvent } from "react";
import { TextField, Button, Input, Avatar } from "@mui/material";
import UserService from "../services/UserService";
import User from '../domains/User'
import { toast, ToastPosition } from 'react-toastify';


interface UpdateEmailAndUsernameProps {
    user: {
        id?: string;
        email?: string;
        username?: string;
        picture?: Uint8Array | number[] | undefined
    };
}

const UpdateEmailAndUsername: React.FC<UpdateEmailAndUsernameProps> = (props) => {
    const id = props.user.id;
    const [email, setEmail] = useState(props.user.email);
    const [username, setUsername] = useState(props.user.username);
    const [picture, setPicture] = useState<Uint8Array | number[] | undefined>(props.user.picture);
    const [imagePreview, setImagePreview] = useState<string | undefined>(
        props.user.picture
            ? getImageSrc(props.user.picture)
            : undefined
    );

    const handleUpdate = async () => {
        try {

            const pictureBase64 = picture && picture !== props.user.picture ? arrayBufferToBase64(new Uint8Array(picture)) : picture;

            const updatedUser: object = {
                id: id,
                email: email,
                username: username,
                picture: pictureBase64
            }

            await UserService.update(updatedUser);

            toast.success("Successfully updated", { position: 'bottom-center' as ToastPosition })
        } catch (error: any) {
            console.error(error);

            if (error.response && error.response.data) {
                const errors = error.response.data.errors;

                if (errors && error.response.data.status === 400) {
                    errors.forEach((error: any) => {
                        toast.error(error.error, { position: 'bottom-center' as ToastPosition });
                    });
                } else {
                    toast.error("Unexpected error occurred", { position: 'bottom-center' as ToastPosition });
                }
            } else {
                toast.error("Unexpected error occurred", { position: 'bottom-center' as ToastPosition });
            }
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                const result = event?.target?.result as ArrayBuffer;
                const uint8Array = new Uint8Array(result);
                const base64String = arrayBufferToBase64(uint8Array)

                setPicture(uint8Array);
                setImagePreview(getImageSrc(base64String));
            };

            fileReader.readAsArrayBuffer(selectedFile);
        } else {
            setPicture(undefined);
            setImagePreview(props.user.picture ? getImageSrc(props.user.picture) : undefined);
        }
    };


    const handleClearPicture = () => {
        setPicture(props.user.picture);
        setImagePreview(
            props.user.picture
                ? getImageSrc(props.user.picture)
                : undefined
        );

        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    function getImageSrc(picture: Uint8Array | string | number[]): string {
        return `data:image/jpeg;base64,${(picture.toString())}`;
    }

    function arrayBufferToBase64(buffer: Uint8Array): string {
        const binary = Array.from(buffer).reduce((binaryString, byte) => {
            return binaryString + String.fromCharCode(byte);
        }, '');

        return btoa(binary);
    }



    return (
        <div>
            <Avatar
                alt={username}
                src={imagePreview || ''}
                sx={{ width: 250, height: 250, marginBottom: 2 }}
            />
            <Input
                type="file"
                id="fileInput"
                onChange={handlePictureChange}
                style={{ display: 'none' }}
                sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <label htmlFor="fileInput">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                >
                    Upload New Picture
                </Button>
            </label>
            {picture !== props.user.picture && (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClearPicture}
                    sx={{ marginLeft: 1 }}
                >
                    Clear Picture
                </Button>
            )}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                sx={{ marginTop: 2, marginBottom: 2 }}

            />
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={handleUsernameChange}
                sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save Changes
            </Button>
        </div>
    );
};

export default UpdateEmailAndUsername;
