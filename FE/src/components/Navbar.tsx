import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, CssBaseline, ListItemButton } from '@mui/material';
import theme from '../colorTheme';
import styles from '../styles/Navbar.module.css';
import { logout } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
                    <h2>Navbar</h2>
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