import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = ({ userName, handelLogout }: any) => {
    const navigate = useNavigate();

    const handleMyTaskClick = () => {
        navigate('/employees');
    };

    const handleMyProfileClick = () => {
        navigate('/my-profile');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">Welcome, {userName}</Typography>
                <div style={{ marginLeft: 'auto' }}>
                    <Button color="inherit" onClick={handleMyTaskClick}>
                        Employees
                    </Button>
                    <Button color="inherit" onClick={handleMyProfileClick}>
                        My Profile
                    </Button>
                    <Button color="inherit" onClick={handelLogout}>
                        Logout
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
