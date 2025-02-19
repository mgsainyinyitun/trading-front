import { Box, Button, Card, Modal, TextField, Typography, Dialog, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useInterval } from "react-use";
import { useAppContext } from "../../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    pt: 2,
    px: 4,
    pb: 3,
};

const ration = {
    30: 40,
    60: 50,
    120: 70,
    300: 100
}

const DisplayCard = ({ s, p, selected, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                height: 60,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                cursor: 'pointer',
                border: selected ? '2px solid #1e88e5' : 'none'
            }}
            fullWidth
        >
            <Box sx={{
                flexGrow: 1,
                width: '100%',
                background: selected ? '#1565c0' : '#1e88e5',
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} >
                <Typography color='white' textAlign='center' variant="h6">{s}s</Typography>
            </Box>
            <Box sx={{
                flexGrow: 1,
                width: '100%',
                height: 30,
                background: selected ? '#64b5f6' : '#90caf9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} >
                <Typography textAlign='center' sx={{ flexGrow: 1 }} variant="body2">{p}.0%</Typography>
            </Box>
        </Card>
    )
}

export default function ConfirmModal({ focusCoin, tradeType, open, handleClose }) {
    const [currentPrice, setCurrentPrice] = useState(null);
    const [priceChange, setPriceChange] = useState(0);
    const [balance, setBalance] = useState("0");
    const [selectedTime, setSelectedTime] = useState(null);
    const [amount, setAmount] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [expectedOutcome, setExpectedOutcome] = useState(null);
    const { customer } = useAppContext();
    const [tradeRequest, setTradeRequest] = useState(null);
    const [tradeFinished, setTradeFinished] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [tradeResult, setTradeResult] = useState(null);

    const handleModalClose = () => {
        handleClose();
        setAmount(0);
    };

    const fetchBalance = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${baseUrl}/api/v1/customer/balance`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const fetchPrice = async () => {
        try {
            const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
                params: {
                    fsyms: focusCoin,
                    tsyms: 'USDT'
                }
            });
            const data = response.data.RAW[focusCoin].USDT;

            const price = data.PRICE;
            const change = data.CHANGEPCTHOUR;

            setCurrentPrice(price);
            setPriceChange(change);
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchPrice();
            fetchBalance();
            setShowProgress(false);
            setProgress(0);
            setTimeLeft(0);
        }
    }, [open, focusCoin]);

    useInterval(() => {
        if (open) { // open is trade model
            fetchPrice();
        }

        if (open && showProgress) {
            if (timeLeft > 0) {
                setTimeLeft(prev => prev - 1);
                setProgress((selectedTime - timeLeft) / selectedTime * 100);
                const outcome = Math.random() > 0.5 ? 'win' : 'lose';
                setExpectedOutcome({
                    type: outcome,
                    value: outcome === 'win' ? parseFloat((amount * (ration[selectedTime] / 100)).toFixed(3)) : -amount
                });
            } else {
                setTradeRequest(null);
                setShowProgress(false);
                const API_URL = process.env.REACT_APP_API_URL;
                axios.post(`${API_URL}/api/v1/trade-success`, {
                    tradeId: tradeRequest.id,
                    customerId: customer.id,
                    outcome:expectedOutcome.type
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200 || response.status === 201) {
                            setTradeResult(expectedOutcome);
                            setShowResult(true);
                        } else {
                            toast.error("Failed to record trade result");
                            handleModalClose();
                        }
                    })
                    .catch(err => {
                        toast.error("Failed to record trade result");
                        handleModalClose();
                    });
            }
        }
    }, 1000);

    const handleConfirmOrder = async () => {
        const API_URL = process.env.REACT_APP_API_URL;

        try {
            const response = await axios.post(`${API_URL}/api/v1/trade-request`, {
                currency: focusCoin,
                customerId: customer.id,
                tradeType: tradeType.toUpperCase(),
                period: selectedTime,
                tradeQuantity: parseInt(amount)
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                setTradeRequest(response.data);
                setShowProgress(true);
                setTimeLeft(selectedTime);
                setProgress(0);
            } else {
                toast.error("Trade request failed, please try again later");
            }
        } catch (res) {
            toast.error("Trade request failed  : " + res.response.data.error)
        }
    };

    return (
        <>
            <ToastContainer />
            <Modal
                open={open && !showProgress}
                onClose={handleModalClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: { xs: '75%', sm: '50%', md: '30%', lg: '20%', xl: '15%' }, maxHeight: 500 }}>
                    <h2 id="parent-modal-title">Order Confirmation</h2>
                    <Box mb={1}>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography>Name </Typography>
                            <Typography>{focusCoin}/USDT</Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography>Direction </Typography>
                            <Typography color={tradeType === 'long' ? 'success.main' : 'error.main'} sx={{ fontWeight: 'bold' }}>{tradeType.toUpperCase()}</Typography>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography>Current </Typography>
                            <Typography color={priceChange >= 0 ? 'success.main' : 'error.main'}>
                                {currentPrice ? currentPrice.toFixed(2) : '...'} ({priceChange ? priceChange.toFixed(2) : '0'}%)
                            </Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" gutterBottom>
                        Choose the expiry time (left-sliding yields higher)
                    </Typography>

                    <Box display='flex' gap={1} mb={2}>
                        <DisplayCard s={30} p={40} selected={selectedTime === 30} onClick={() => setSelectedTime(30)} />
                        <DisplayCard s={60} p={50} selected={selectedTime === 60} onClick={() => setSelectedTime(60)} />
                        <DisplayCard s={120} p={70} selected={selectedTime === 120} onClick={() => setSelectedTime(120)} />
                        <DisplayCard s={300} p={100} selected={selectedTime === 300} onClick={() => setSelectedTime(300)} />
                    </Box>

                    <Box mb={1}>
                        <TextField
                            label="Buy Quantity"
                            variant="outlined"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            helperText="Min100buy from, Max99999Capped"
                            size="small"
                        />
                    </Box>
                    <Box display='flex' justifyContent='space-between' mb={1}>
                        <Typography variant="body2" gutterBottom>
                            Available balance: <Typography component="span" color="primary.main" display="inline">{balance}</Typography> USDT
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Handling fee: 0%
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{ height: 50, borderRadius: 10 }}
                        fullWidth
                        onClick={handleConfirmOrder}
                        disabled={!selectedTime || !amount}
                    >
                        Confirm order
                    </Button>
                </Box>
            </Modal>

            {/** Progress Dialog */}
            <Dialog
                open={showProgress}
                onClose={() => {
                    setShowProgress(false);
                    setAmount(0);
                }}
                PaperProps={{
                    sx: { borderRadius: '10px', p: 3, minWidth: 300 }
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Typography variant="h6" color="primary">{focusCoin}/USDT</Typography>

                    <Box position="relative" display="inline-flex">
                        <CircularProgress
                            variant="determinate"
                            value={progress}
                            size={120}
                            sx={{
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'blue'
                                },
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                },
                                "& .MuiLinearProgress-barColorPrimary": {
                                    backgroundColor: "green",
                                },
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="caption" component="div" color="text.secondary">
                                {timeLeft}s
                            </Typography>
                        </Box>
                    </Box>
                    <Box width="100%" sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#f8f9fa',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                    }}>
                        <Typography sx={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            color: tradeType === 'long' ? '#2e7d32' : '#d32f2f',
                            bgcolor: tradeType === 'long' ? '#e8f5e9' : '#ffebee',
                            py: 1,
                            borderRadius: 1
                        }}>
                            DIRECTION: {tradeType.toUpperCase()}
                        </Typography>

                        <Typography sx={{
                            textAlign: 'left',
                            bgcolor: '#e3f2fd',
                            py: 1,
                            borderRadius: 1,
                            color: '#1976d2'
                        }}>
                            Amount: {amount} USDT
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: '#fff',
                            py: 1,
                            borderRadius: 1
                        }}>
                            <Typography sx={{
                                color: priceChange >= 0 ? '#2e7d32' : '#d32f2f'
                            }}>
                                Current Price: <span style={{color: priceChange >= 0 ? '#2e7d32' : '#d32f2f'}}>{currentPrice?.toFixed(2)}</span> USDT
                            </Typography>
                            <Typography sx={{
                                color: priceChange >= 0 ? '#2e7d32' : '#d32f2f',
                                fontWeight: 'bold'
                            }}>
                                ({priceChange >= 0 ? '+' : ''}{priceChange?.toFixed(2)}%)
                            </Typography>
                        </Box>

                        <Typography sx={{
                            textAlign: 'left',
                            bgcolor: expectedOutcome ? expectedOutcome.type === 'win' ? '#e8f5e9' : '#ffebee' : 'transparent',
                            color: expectedOutcome ? expectedOutcome.type === 'win' ? '#2e7d32' : '#d32f2f' : 'gray',
                            py: 1,
                            borderRadius: 1,
                            fontWeight: 'bold'
                        }}>
                            {expectedOutcome ?
                                <>
                                    Expected {expectedOutcome.type}: {expectedOutcome.value} USDT
                                </>
                                :
                                'Waiting for the result...'
                            }
                        </Typography>
                    </Box>
                </Box>
            </Dialog>

            {/** Result Dialog */}
            <Dialog
                open={showResult}
                onClose={() => {
                    setShowResult(false);
                    handleModalClose();
                }}
                PaperProps={{
                    sx: { borderRadius: '10px', p: 3, minWidth: 300 }
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Typography variant="h4" color={tradeResult?.type === 'win' ? 'success.main' : 'error.main'}>
                        {tradeResult?.type === 'win' ? 'You Won!' : 'You Lost'}
                    </Typography>

                    <Typography variant="h5" color={tradeResult?.type === 'win' ? 'success.main' : 'error.main'}>
                        {tradeResult?.value} USDT
                    </Typography>

                    <Box display="flex" gap={2}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setShowResult(false);
                                handleModalClose();
                            }}
                        >
                            Close
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                window.location.href = '/trade-history';
                            }}
                        >
                            View History
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}