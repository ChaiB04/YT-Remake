import { useEffect, useState } from "react";
import User from "../domains/User";
import Role from "../enums/Role";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Tab, Tabs, Box } from "@mui/material";
import UpdateEmailAndUsername from "../components/UpdateEmailAndUsername";
import UpdatePassword from "../components/UpdatePassword";

function AccountSettings() {
    const accessToken = useSelector((state: any) => state.usertoken);
    // const accessToken = "aaa"
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate()
    const [user, setUser] = useState<User>({
        id: '',
        username: '',
        password: '',
        email: '',
        picture: new Uint8Array,
        role: Role.DEFAULT
    });

    useEffect(() => {
        console.log(accessToken)
        if (!accessToken) {
            navigate("/login")
        }

        fetchUser();
    }, [accessToken]);

    const fetchUser = async () => {
        try {
            const response = await UserService.getByAccessToken();
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
        >
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
            >
                <Tab label="Personal Data" />
                <Tab label="Security Settings" />
            </Tabs>
            {user.id && (
                <Box p={3} flex="1" style={{ marginTop: '20px' }}>
                    {selectedTab === 0 && <UpdateEmailAndUsername user={user} />}
                    {selectedTab === 1 && <UpdatePassword user={user} />}
                </Box>
            )}
        </Box>
    );
}

export default AccountSettings