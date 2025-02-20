import { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    Chip
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import back icon
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import { QRCodeCanvas } from "qrcode.react";
import axios from 'axios';

const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const dummyAddresses = {
    btc: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    eth: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    usdt: 'TWd2ksavh8QD5YP1HYvkBkKXsEpThHxgLv',
    usdc: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
};

export default function DepositDetail() {
    const { coin } = useParams();
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [transaction, setTransaction] = useState(null);

    const address = dummyAddresses[coin];
    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        toast.success('Address copied! 📋');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setFile(file);
                toast.success('Screenshot uploaded! 📸');
            } else {
                toast.error('Please upload an image file 🖼️');
            }
        }
    };

    const handleSubmit = async () => {
        try {
            // check if not logged in
            if (!localStorage.getItem('token')) {
                toast.error('Please login to deposit 🔒');
                navigate('/signin');
                return;
            }
            setLoading(true);
            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('description', description);
            formData.append('file', file);
            formData.append('currency', coin);

            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
            const response = await axios.post(`${API_URL}/api/v1/transactions/deposit-request`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setTransaction(response.data.transaction);
            setOpenDialog(true);
            setAmount('');
            setDescription('');
            setFile(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Oops! Deposit failed 😢');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: { xs: 1, sm: 2 }, mb: { xs: 2, sm: 4 } }}>
            <ToastContainer />
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/deposit')} // Navigate back to deposit page
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    Deposit {coin?.toUpperCase()} ✨
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <QRCodeCanvas value={address} size={120} level="H" />
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    p: 1.5,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0'
                }}>
                    <Typography variant="body2" sx={{ flexGrow: 1, wordBreak: 'break-all', fontSize: '0.8rem' }}>
                        {address}
                    </Typography>
                    <IconButton onClick={handleCopy} size="small" color="primary" sx={{ p: 0.5 }}>
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        size="small"
                        required
                        sx={{ '& .MuiInputBase-input': { fontSize: '0.9rem' } }}
                    />

                    <TextField
                        label="Description"
                        multiline
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        size="small"
                        sx={{ '& .MuiInputBase-input': { fontSize: '0.9rem' } }}
                    />

                    <Box sx={{
                        border: '1px dashed #bdbdbd',
                        borderRadius: 2,
                        p: 1.5,
                        textAlign: 'center',
                        backgroundColor: '#fafafa'
                    }}>
                        <Button
                            component="label"
                            startIcon={<PhotoCamera />}
                            size="small"
                            sx={{ mb: 0.5 }}
                        >
                            Upload Screenshot
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {file ? `📎 ${file.name}` : 'No file selected'}
                        </Typography>
                    </Box>

                    <Alert severity="warning" sx={{ 
                        mt: 1, 
                        '& .MuiAlert-message': { 
                            fontSize: '0.8rem' 
                        } 
                    }}>
                        Please ensure you're sending {coin?.toUpperCase()} on the correct network 🚨
                    </Alert>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ 
                            mt: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '0.9rem'
                        }}
                        disabled={!amount || !file || loading}
                        onClick={handleSubmit}
                    >
                        {loading ? '⏳ Processing...' : '✨ Submit Deposit'}
                    </Button>
                </Box>
            </Paper>

            <Dialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)} 
                maxWidth="xs" 
                fullWidth
                PaperProps={{ sx: { borderRadius: 2 } }}
            >
                <DialogTitle sx={{ textAlign: 'center', pb: 1, fontSize: '1.1rem' }}>
                    Deposit Submitted Successfully! 🎉
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Chip
                                label={transaction?.status}
                                color="warning"
                                variant="outlined"
                                size="small"
                                sx={{ fontSize: '0.8rem' }}
                            />
                        </Box>

                        <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 500 }}>
                            ID: {transaction?.transactionId}
                        </Typography>

                        <Box sx={{
                            backgroundColor: '#f8f9fa',
                            p: 1.5,
                            borderRadius: 2,
                            fontSize: '0.8rem'
                        }}>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                💰 {transaction?.amount} {coin?.toUpperCase()}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                📝 {transaction?.description}
                            </Typography>
                            <Typography variant="body2">
                                🕒 {new Date(transaction?.createdAt).toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={() => setOpenDialog(false)}
                                size="small"
                                sx={{ borderRadius: 2, textTransform: 'none' }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/transactions')}
                                size="small"
                                sx={{ borderRadius: 2, textTransform: 'none' }}
                            >
                                View Transactions
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
}