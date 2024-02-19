import { AppBar, Toolbar, CssBaseline } from '@mui/material';
import styles from '../styles/Navbar.module.css';
import { logout } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div className={styles.mainContainer}>
            <CssBaseline />
            <AppBar position="fixed" className={styles.appBar}>
                <Toolbar>
                    <h2 onClick={() => {navigate("/")}}>Youtube</h2>
                    <p onClick={() => {navigate("/uploadvideo")}} >Upload video</p>
                    <p onClick={() => {navigate("/account-settings")}}>Account settings</p>
                    <SearchBar />
                    <p onClick={handleLogout} >logout</p>
                </Toolbar>
            </AppBar>
            {/* <Drawer variant="permanent" anchor="left" className={styles.drawer}>
                <List style={{ backgroundColor: theme.palette.primary.main, marginTop: 65 }} className={styles.list}>
                    <ListItemButton>
                        <ListItemText primary="link" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="link" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="logout" onClick={handleLogout} />
                    </ListItemButton>
                </List>
            </Drawer> */}
        </div>
    );
};

export default Navbar;