import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Grid, Divider, Chip } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { format } from 'date-fns';

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
            try {
                const response = await axios.get(`${API_URL}/api/v1/customer/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) setProfileData(response.data.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                toast.error('Failed to load profile data');
            }
        };
        fetchProfile();
    }, [token]);

    if (!profileData) return null;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>Profile Information</Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        {['name', 'email', 'phone', 'loginId'].map((field) => (
                            <Box key={field} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </Typography>
                                <Typography variant="body1">{profileData[field]}</Typography>
                            </Box>
                        ))}

                        <Box sx={{ mt: 2 }}>
                            <Chip
                                label={profileData.active ? 'Active' : 'Inactive'}
                                color={profileData.active ? 'success' : 'error'}
                                size="small"
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Accounts</Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Grid container spacing={2}>
                            {profileData.accounts.map((account) => (
                                <Grid item xs={12} key={account.id}>
                                    <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                                        <Typography variant="subtitle1">
                                            Account #{account.accountNo}
                                        </Typography>
                                        <Typography variant="body2">
                                            Balance: {account.balance} {account.currency}
                                        </Typography>
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            Created: {format(new Date(account.createdAt), 'PP')}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}