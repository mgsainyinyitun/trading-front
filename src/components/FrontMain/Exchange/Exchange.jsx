import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    FormControl,
    Select,
    MenuItem,
    TextField,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Avatar,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { getCoinStringList } from '../../../utils/utils';
import { format } from 'date-fns';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';

const statusColors = {
    PENDING: 'warning',
    COMPLETED: 'success',
    FAILED: 'error'
};

export default function Exchange() {
    const [fromCoin, setFromCoin] = useState('BTC');
    const [toCoin, setToCoin] = useState('USDT');
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState(null);
    const [baseRate, setBaseRate] = useState(null); // Rate for 1 unit
    const [loading, setLoading] = useState(false);
    const [exchanges, setExchanges] = useState([]);
    const [coins, setCoins] = useState([]);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCoins();
        fetchExchanges();
    }, []);

    useEffect(() => {
        if (fromCoin && toCoin) {
            fetchExchangeRate();
            fetchBaseRate(); // Fetch rate for 1 unit
        }
    }, [fromCoin, toCoin, amount]);

    const fetchCoins = async () => {
        try {
            const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
                params: {
                    fsyms: getCoinStringList(),
                    tsyms: 'USDT'
                }
            });
            const rawData = response.data.RAW;
            const coinList = Object.entries(rawData).map(([symbol, data]) => ({
                symbol,
                imageUrl: `https://www.cryptocompare.com${data.USDT.IMAGEURL}`
            }));
            setCoins(coinList);
        } catch (error) {
            console.error('Error fetching coins:', error);
        }
    };

    const fetchBaseRate = async () => {
        try {
            const response = await axios.get('https://min-api.cryptocompare.com/data/price', {
                params: {
                    fsym: fromCoin,
                    tsyms: toCoin
                }
            });
            const rate = response.data[toCoin];
            setBaseRate(rate);
        } catch (error) {
            console.error('Error fetching base rate:', error);
        }
    };

    const fetchExchangeRate = async () => {
        if (!amount || isNaN(amount) || amount <= 0) return;

        try {
            const response = await axios.get('https://min-api.cryptocompare.com/data/price', {
                params: {
                    fsym: fromCoin,
                    tsyms: toCoin
                }
            });
            const rate = response.data[toCoin];
            setRate(rate * amount);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const fetchExchanges = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
            const response = await axios.get(`${API_URL}/api/v1/exchanges`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setExchanges(response.data.exchanges || []);
        } catch (error) {
            console.error('Error fetching exchanges:', error);
        }
    };

    const handleSwap = () => {
        setFromCoin(toCoin);
        setToCoin(fromCoin);
    };

    const handleExchange = async () => {
        if (!localStorage.getItem('token')) {
            setLoginDialogOpen(true);
            return;
        }

        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setLoading(true);
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
            await axios.post(`${API_URL}/api/v1/exchanges`, {
                fromCurrency: fromCoin,
                toCurrency: toCoin,
                amount: amount
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success('Exchange request submitted successfully');
            setAmount('');
            fetchExchanges();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Exchange failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container  sx={{ mb: 4, backgroundColor: 'white' }}>
            <ToastContainer />

            {/* Exchange Form */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3, background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)' }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Exchange Coins ✨
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControl sx={{ flex: 1 }}>
                            <Select
                                value={fromCoin}
                                onChange={(e) => setFromCoin(e.target.value)}
                                sx={{ borderRadius: 2 }}
                                size="small"
                            >
                                {coins.map((coin) => (
                                    <MenuItem key={coin.symbol} value={coin.symbol}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar src={coin.imageUrl} sx={{ width: 24, height: 24 }} />
                                            {coin.symbol}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <IconButton onClick={handleSwap} color="primary" size="small">
                            <SwapVertIcon />
                        </IconButton>

                        <FormControl sx={{ flex: 1 }}>
                            <Select
                                value={toCoin}
                                onChange={(e) => setToCoin(e.target.value)}
                                sx={{ borderRadius: 2 }}
                                size="small"
                            >
                                {coins.map((coin) => (
                                    <MenuItem key={coin.symbol} value={coin.symbol}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar src={coin.imageUrl} sx={{ width: 24, height: 24 }} />
                                            {coin.symbol}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {baseRate && (
                        <Paper sx={{ p: 2, mt: 2, mb: 2, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                            <Typography variant="body2" color="text.secondary">
                                Current Exchange Rate
                            </Typography>
                            <Typography variant="h6" color="primary.main">
                                1 {fromCoin} = {baseRate.toFixed(8)} {toCoin}
                            </Typography>
                        </Paper>
                    )}

                    <TextField
                        fullWidth
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        sx={{ mt: 3, mb: 2 }}
                        size="small"
                        InputProps={{
                            endAdornment: <Typography color="text.secondary">{fromCoin}</Typography>
                        }}
                    />

                    {rate && (
                        <Paper sx={{ p: 2, mb: 3, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                            <Typography variant="body2" color="text.secondary">
                                You Will Receive
                            </Typography>
                            <Typography variant="h6" color="primary.main">
                                {rate.toFixed(8)} {toCoin}
                            </Typography>
                        </Paper>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleExchange}
                        disabled={loading}
                        size="small"
                        sx={{
                            borderRadius: 2,
                            py: 1.5,
                            background: 'linear-gradient(45deg, #7c4dff 30%, #448aff 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #673ab7 30%, #2196f3 90%)',
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Exchange'}
                    </Button>
                </Box>
            </Paper>

            {/* Exchange History */}
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>
                        Exchange History 📊
                    </Typography>
                </Box>

                <TableContainer sx={{ minHeight: 500, maxHeight: 500 }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exchanges.length > 0 ? (
                                exchanges.map((exchange) => (
                                    <TableRow key={exchange.id} hover>
                                        <TableCell>
                                            <Typography variant="caption">
                                                {format(new Date(exchange.createdAt), 'PP')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2">
                                                    {exchange.fromAmount} {exchange.fromCurrency}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2">
                                                    {exchange.toAmount} {exchange.toCurrency}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {exchange.rate}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={exchange.status}
                                                size="small"
                                                color={statusColors[exchange.status]}
                                                sx={{ fontSize: '0.7rem' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                            <AssignmentIcon sx={{ fontSize: 50, color: 'text.disabled' }} />
                                            <Typography variant="h6" color="text.secondary">
                                                No Exchange History
                                            </Typography>
                                            <Typography variant="body2" color="text.disabled">
                                                Your exchange transactions will appear here
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog
                open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: '15px',
                        padding: '10px'
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>
                    Sign In Required
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                        <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
                            Please sign in to exchange coins
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        onClick={() => setLoginDialogOpen(false)}
                        variant="outlined"
                        sx={{ borderRadius: '20px', mr: 1 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => navigate('/signin')}
                        variant="contained"
                        sx={{ borderRadius: '20px' }}
                    >
                        Sign In
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
