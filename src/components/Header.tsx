import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
                <Box style={{ marginLeft: 'auto' }} sx={{
                    '@media(max-width:767px)': {
                        display: 'none'
                    }
                }}>
                    <Button color="inherit" onClick={handleMyTaskClick}>
                        Employees
                    </Button>
                    <Button color="inherit" onClick={handleMyProfileClick}>
                        My Profile
                    </Button>
                    <Button color="inherit" onClick={handelLogout}>
                        Logout
                    </Button>
                </Box>
                <Box sx={{
                    display: 'none',
                    '@media(max-width:767px)': {
                        display: 'flex',
                        marginLeft: 'auto'
                    }
                }}>
                    <IconButton onClick={handleMyTaskClick} sx={{ color: '#fff' }}>
                        <PeopleOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={handleMyProfileClick} sx={{ color: '#fff' }}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={handelLogout} sx={{ color: '#fff' }}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
