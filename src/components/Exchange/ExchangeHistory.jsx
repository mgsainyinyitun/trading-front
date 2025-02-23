import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputAdornment,
    Chip,
    FormControl,
    InputLabel,
    Button,
    CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { format } from 'date-fns';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';

const statusColors = {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'error',
};

const formatDate = (dateString) => {
    try {
        return format(new Date(dateString), 'PP');
    } catch (error) {
        return dateString;
    }
};

export default function ExchangeHistory() {
    const [exchanges, setExchanges] = useState([]);
    const [filteredExchanges, setFilteredExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({
        status: 'ALL'
    });

    useEffect(() => {
        fetchExchanges();
    }, []);

    useEffect(() => {
        filterExchanges();
    }, [search, filter, exchanges]);

    const fetchExchanges = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
            const response = await axios.get(`${API_URL}/api/v1/exchanges`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setExchanges(response.data);
        } catch (error) {
            toast.error('Failed to load exchange history');
        } finally {
            setLoading(false);
        }
    };

    const filterExchanges = () => {
        let filtered = [...exchanges];

        if (filter.status !== 'ALL') {
            filtered = filtered.filter(exchange => exchange.exchangeStatus === filter.status);
        }

        if (search) {
            filtered = filtered.filter(exchange =>
                exchange.fromCurrency.toLowerCase().includes(search.toLowerCase()) ||
                exchange.toCurrency.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredExchanges(filtered);
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredExchanges.map(exchange => ({
                'From': exchange.fromCurrency,
                'To': exchange.toCurrency,
                'Amount': exchange.amount,
                'Exchanged Amount': exchange.exchangedAmount,
                'Exchange Rate': exchange.exchangeRate,
                'Status': exchange.exchangeStatus,
                'Date': formatDate(exchange.createdAt)
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Exchanges");
        XLSX.writeFile(workbook, "exchange_history.xlsx");
    };

    return (
        <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 3 }, mb: 4 }}>
            <ToastContainer />
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            Exchange History 📊
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            size="small"
                            onClick={downloadExcel}
                        >
                            Export Excel
                        </Button>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: { xs: 'column', sm: 'row' },
                        mb: 2
                    }}>
                        <TextField
                            size="small"
                            placeholder="Search by currency..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ flexGrow: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filter.status}
                                label="Status"
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            >
                                <MenuItem value="ALL">All</MenuItem>
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="COMPLETED">Completed</MenuItem>
                                <MenuItem value="FAILED">Failed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <TableContainer sx={{ minHeight: 500 }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Exchanged Amount</TableCell>
                                <TableCell>Exchange Rate</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredExchanges.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography variant="body2" color="text.secondary">No exchanges found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredExchanges.map((exchange) => (
                                    <TableRow key={exchange.id} hover>
                                        <TableCell>
                                            <Typography variant="caption">
                                                {format(new Date(exchange.createdAt), 'PP')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {exchange.amount} {exchange.fromCurrency}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {exchange.exchangedAmount} {exchange.toCurrency}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {exchange.amount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {exchange.exchangedAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {exchange.exchangeRate}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={exchange.exchangeStatus}
                                                size="small"
                                                color={statusColors[exchange.exchangeStatus]}
                                                sx={{ fontSize: '0.7rem' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
} 