import User from '../domains/User';
import { useState } from 'react';
import LoginService from '../services/LoginService';
import TextField from '@mui/material/TextField';
// import { Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';



function Login() {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#6B5BD3"
            }
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<User>({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

            const newUser: User = {
                email: formData.email,
                password: formData.password
            }

            const response = await LoginService.login(newUser);

            dispatch(login(response.data))

            navigate("/")
        }
        catch(error){
            toast.error("error with logging in", {
                autoClose: 5000,
                draggable: false,
            });
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" fixed >
                    <Paper sx={{
                        margin: 5,
                        color: "#6B5BD3"
                    }}>
                        <h1> Login </h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="filled"
                                onChange={handleInputChange}
                                sx={{
                                    margin: 5,
                                    color: "#6B5BD3"
                                }}
                            />

                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                variant="filled"
                                onChange={handleInputChange}
                                sx={{
                                    marginBottom: 5,
                                    color: "#6B5BD3"
                                }}
                            />

                            <Button
                                variant="contained"
                                type='submit'
                                sx={{
                                    margin: 5
                                }}>Login</Button>
                        </form>

                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Login;