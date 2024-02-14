import User from "../domains/User";
import { useState } from "react";
import Role from "../enums/Role";
import { Button, Grid, TextField } from "@mui/material";
import LoginService from '../services/LoginService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastPosition } from 'react-toastify';
import { ChangeEvent } from "react";
import UserService from "../services/UserService";

function CreateAccount() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<User>({
        username: "",
        email: "",
        password: "",
        picture: [],
        role: Role.VIEWER
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

            const newUser: User = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                picture: formData.picture
            }

            console.log(formData.picture)


            const response = await UserService.create(newUser);
            //now we can use the login service to get a usertoken

            const createdUser: User = {
                email: response.data.email,
                password: formData.password
            }


            const token = await LoginService.login(createdUser)

            dispatch(login(token.data))

            navigate("/")
        }
        catch (error) {
            toast.error("error with logging in", { position: 'bottom-center' as ToastPosition });

        }
    }

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const fileInput = event.target;
        const file = fileInput.files && fileInput.files[0];

        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/jpg") {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const arrayBuffer = e.target?.result as ArrayBuffer | null;

                    if (arrayBuffer) {
                        const byteArray = new Uint8Array(arrayBuffer);
                        const numberArray = Array.from(byteArray);
                        setFormData({ ...formData, picture: numberArray });
                    }
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert("Please select a file of type JPG or JPEG.");
            }
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };




    return (
        <>

            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    {formData.picture && formData.picture.length > 0 && (
                        <Grid item>
                            {/* Convert array of numbers back to Uint8Array */}
                            <img src={URL.createObjectURL(new Blob([new Uint8Array(formData.picture)], { type: 'image/jpeg' }))} alt="Selected Picture" />
                        </Grid>
                    )}
                    <form onSubmit={handleSubmit} >

                        <Grid item>
                            <input
                                type="file"
                                id="picture"
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="username"
                                name="username"
                                label="Username"
                                variant="outlined"
                                onChange={handleInputChange}
                                sx={{
                                    marginTop: '20px',
                                    width: '100%', 
                                 
                                }}

                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                onChange={handleInputChange}
                                sx={{
                                    marginTop: '20px',
                                    width: '100%', 

                                }}
                            // InputProps={{
                            //     sx: {
                            //         color: 'lightgrey', // Set the desired light background color for the input field
                            //     },
                            // }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                onChange={handleInputChange}
                                sx={{
                                    marginTop: '20px',
                                    width: '100%', 

                                }}
                            // InputProps={{
                            //     sx: {
                            //         color: 'lightgrey', // Set the desired light background color for the input field
                            //     },
                            // }}
                            />
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                type='submit'
                                sx={{
                                    marginTop: '20px',
                                    width: '100%', 
                                    height: '50px'
                                }}>Create</Button>
                        </Grid>
                    </form>
                </Grid>


                {/* </Container> */}
            </Grid>
        </>
    )
}

export default CreateAccount;