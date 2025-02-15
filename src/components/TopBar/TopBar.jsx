import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
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
        <AppBar position="fixed" sx={{ background: '#fff', color: 'primary.main', height: '48px' }}>
            <Toolbar sx={{ minHeight: '48px !important' }}>
                <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                   Welcome ! {customer ? customer.name : 'Guest'}
                </Typography>
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
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={() => navigate('/signin')}>Sign In</MenuItem>
                        )}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}
