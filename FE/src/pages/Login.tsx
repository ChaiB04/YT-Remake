
import { Box, Tab, Tabs } from '@mui/material';
import LoginPage from '../components/Login';
import CreateAccount from '../components/CreateAccount'
import { useState } from 'react';
import styles from "../styles/Login.module.css"

function Login() {

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <>

            <Box 
            display="flex"
            flexDirection="column"
            height="100vh"
            width="70vw"
            className={styles.box}
            
            >
                <Tabs
                 value={selectedTab}
                 onChange={handleTabChange}
                 >
                    <Tab label="Login"></Tab>
                    <Tab label="Create account"></Tab>
                </Tabs>

               
                <Box p={3} flex="1" style={{ marginTop: '20px' }}>
                    {selectedTab === 0 && < LoginPage/>}
                    {selectedTab === 1 && < CreateAccount/>}
                </Box>
            </Box>

        
        </>
    )
}

export default Login;