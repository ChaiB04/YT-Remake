import { useEffect, useState } from "react";
import User from "../domains/User";
import Role from "../enums/Role";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Tab, Tabs, Box } from "@mui/material";
import UpdateEmailAndUsername from "../components/UpdateEmailAndUsername";
import UpdatePassword from "../components/UpdatePassword";
import { RootState } from "../redux/app/Store";
import DeleteAccount from "../components/DeleteAccount";


function AccountSettings() {
    const accesstoken = useSelector((state: RootState) => state.usertoken);
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

        if (!accesstoken) {
            navigate("/login")
        }

        fetchUser();
    }, [accesstoken]);

    const fetchUser = async () => {
        try {
            const token = accesstoken || "";
            const response = await UserService.getByAccessToken(token);
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
                <Tab label="Delete Account"/>
            </Tabs>
            {user.id && (
                <Box p={3} flex="1" style={{ marginTop: '20px' }}>
                    {selectedTab === 0 && <UpdateEmailAndUsername user={user} />}
                    {selectedTab === 1 && <UpdatePassword user={user} />}
                    {selectedTab === 2 && <DeleteAccount user={user} />}
                </Box>
            )}
        </Box>
    );
}

export default AccountSettings