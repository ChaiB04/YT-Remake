import User from '../domains/User';
import { useState } from 'react';
import LoginService from '../services/LoginService';
import TextField from '@mui/material/TextField';
import { Button, Grid} from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastPosition } from 'react-toastify';


function Login(){

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
        catch (error) {
            toast.error("error with logging in", { position: 'bottom-center' as ToastPosition });

        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    return(
        <>
           <Grid container wrap="nowrap" spacing={2}>
                {/* <Container
                    component="main" className={style.container}> */}


                {/* <Grid item >
                        <h1 > Login </h1>
                    </Grid> */}
                <Grid item>
                    <form onSubmit={handleSubmit} >
                        <Grid item>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                onChange={handleInputChange}
                                sx={{
                                    margin: 2.5,
                                    width: 500,
                                    backgroundColor: "#2c1468",

                                }}
                                InputProps={{
                                    sx: {
                                        color: 'lightgrey', // Set the desired light background color for the input field
                                    },
                                }}
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
                                    margin: 2.5,
                                    width: 500,
                                    backgroundColor: "#2c1468"

                                }}
                                InputProps={{
                                    sx: {
                                        color: 'lightgrey', // Set the desired light background color for the input field
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                type='submit'
                                sx={{
                                    margin: 5,
                                    width: 500,
                                    height: 50
                                }}>Login</Button>
                        </Grid>
                    </form>
                </Grid>


                {/* </Container> */}
            </Grid>
        </>
    )
}


export default Login;