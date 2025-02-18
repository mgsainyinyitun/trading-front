import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

export default function TopBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { customer, logout } = useAppContext();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
    };

    const handleSignOut = () => {
        handleClose();
        logout();
        navigate('/signin');
    };

    return (
        <AppBar position="fixed" sx={{ background: '#fff', color: 'primary.main', height: '48px', boxShadow: 'none', borderBottom: '1px solid #b3e5fc' }}>
            <Toolbar sx={{ minHeight: '48px !important' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <IconButton
                        size="large"
                        onClick={() => navigate('/')}
                        color="primary"
                        sx={{ mr: 1 }}
                    >
                        <HomeIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle1" component="div">
                        Welcome ! {customer ? customer.name : 'Guest'}
                    </Typography>
                </Box>
                <div>
                    <IconButton
                        size="small"
                        onClick={handleMenu}
                        color="primary"
                    >
                        <AccountCircle fontSize="small" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {customer ? (
                            <>
                                <MenuItem onClick={handleProfile} sx={{ color: 'primary.main' }}>
                                    <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleSignOut} sx={{ color: 'primary.main' }}>
                                    <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                                    Sign Out
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={() => navigate('/signin')} sx={{ color: 'primary.main' }}>
                                <LoginIcon sx={{ mr: 1 }} fontSize="small" />
                                Sign In
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}
