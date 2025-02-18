import { BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Chip, CircularProgress, Drawer, IconButton, List, ListItem, ListItemText, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import InfoChart from "./InfoChart";
import axios from "axios";
import { convertTimestampToLocalTime, formatNumberWithMillions, getCoinStringList } from "../../../utils/utils";
import InfoBarChart from "./InfoBarChart";
import InfoHistChart from "./InfoHistChart";
import { useInterval } from "react-use";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ConfirmModal from "./ConfirmModal";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useAppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import Exchange from "../Exchange/Exchange";
const ControlChip = ({ label, ...props }) => (
    <Chip
        label={label}
        sx={{
            minWidth: 30,
            width: 60,
            marginRight: 1,
            background: 'none',
            '&:hover': {
                borderRadius: '5px',
                background: '#f7f7f7',
            },
        }}
        {...props}
    />
);

export default function Trade() {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [focusCoin, setFocusCoin] = useState('BTC');
    const [focusCoinImage, setFocusCoinImage] = useState('https://www.cryptocompare.com/media/37746251/btc.png');
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [tradeType, setTradeType] = useState('');
    const { customer } = useAppContext();
    const navigate = useNavigate();

    const [cryptoPairs, setCryptoPairs] = useState([]);

    const handleTradeClick = (type) => {
        if (!customer) {
            setLoginDialogOpen(true);
        } else {
            setTradeType(type);
            setOpen(true);
        }
    };

    const handleLoginDialogClose = () => {
        setLoginDialogOpen(false);
    };

    const navigateToLogin = () => {
        setLoginDialogOpen(false);
        navigate('/signin');
    };

    const fetchCryptoPairs = async () => {
        try {
            const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
                params: {
                    fsyms: getCoinStringList(),
                    tsyms: 'USDT'
                }
            });
            const rawData = response.data.RAW;

            const formattedPairs = Object.entries(rawData).map(([symbol, data]) => ({
                symbol: symbol,
                pair: `${symbol}/USDT`,
                price: data.USDT.PRICE.toFixed(2),
                change24h: data.USDT.CHANGEPCT24HOUR.toFixed(2),
                volume24h: data.USDT.VOLUME24HOUR.toFixed(2),
                imageUrl: `https://www.cryptocompare.com${data.USDT.IMAGEURL}` // Add image URL
            }));

            setCryptoPairs(formattedPairs);
        } catch (error) {
            console.error('Error fetching crypto pairs:', error);
        }
    };


    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const fetchData = async () => {
        try {
            const API = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${focusCoin}&tsym=USD&limit=2`;
            const response = await axios.get(API);
            let data = response.data.Data.Data;
            let finalData = {
                time: convertTimestampToLocalTime(data[1].time),
                open: data[1].open,
                high: data[1].high,
                low: data[1].low,
                close: data[1].close,
                volumn: data[1].volumeto,
                increase: (data[1].open - data[0].open).toFixed(2),
                increasePercent: (((data[1].open - data[0].open) / data[0].open) * 100).toFixed(2)
            }
            setData(finalData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    useInterval(() => {
        fetchData();
    }, [5000])

    useEffect(() => {
        setLoading(true);
        fetchData();
        fetchCryptoPairs();
    }, [focusCoin]);

    return (
        <Box>
            {/** Navigation */}
            <Box pb={3} sx={{
                overflow: 'hidden',
                margin: 0,
                background: 'white'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>


                    {value === 0 && (
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    <BottomNavigation
                        sx={{ padding: 1, margin: 0, flexGrow: 1 }}
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                    >
                        <BottomNavigationAction label="Trade" sx={{
                            '&.Mui-selected': {
                                borderBottom: '2px solid #2196f3',
                                fontWeight: 'bold',
                            },
                        }} />
                        <BottomNavigationAction label="Exchange" sx={{
                            '&.Mui-selected': {
                                borderBottom: '2px solid #2196f3',
                                fontWeight: 'bold',
                            },
                        }} />
                    </BottomNavigation>
                </Box>
            </Box>

            {value === 0 && (
                <>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                {cryptoPairs.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        divider
                                        onClick={() => {
                                            setFocusCoin(item.symbol);
                                            setFocusCoinImage(item.imageUrl);
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <Avatar
                                                src={item.imageUrl}
                                                sx={{ width: 24, height: 24, marginRight: 1 }}
                                            />
                                            <ListItemText
                                                primary={item.pair}
                                                secondary={item.price}
                                                primaryTypographyProps={{
                                                    style: { fontWeight: 'bold' }
                                                }}
                                                secondaryTypographyProps={{
                                                    style: { color: '#2196f3' }
                                                }}
                                            />
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                    {/** settings  */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', background: 'white' }}>
                        <Box p={1} sx={{ background: 'white', width: '90%', maxWidth: '100%', '@media (max-width: 600px)': { width: '100%' } }} display='flex' justifyContent='space-between'>
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                <Typography variant="body1" color="primary" fontWeight="bold">
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={focusCoinImage} sx={{ width: 20, height: 20, marginRight: 1 }} />
                                        {focusCoin} <CompareArrowsIcon sx={{ mx: 1 }} /> <Avatar src="https://www.cryptocompare.com/media/37746338/usdt.png" sx={{ width: 20, height: 20, marginRight: 1 }} /> USDT
                                    </Box>
                                </Typography>
                            </Box>
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                <Brightness4Icon color="primary" />
                            </Box>
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                <AssignmentIcon color="primary" />
                                <Typography variant="body" color='grey'>Position</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/** info */}
                    <Box sx={{ minHeight: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white' }}>
                        {loading ? (<CircularProgress />) : (
                            <Box sx={{ display: 'flex', width: '85%', maxWidth: '100%', '@media (max-width: 600px)': { width: '100%' } }} pt={2} pb={2}>
                                <Box p={1} sx={{ flexGrow: 1 }}>
                                    <Box>
                                        <Typography sx={{ marginBottom: 1 }} variant="body2" color='GrayText'>Current</Typography>
                                        <Typography sx={{ marginBottom: 1 }} variant="h4" color={Math.sign(data.increase) === 1 ? 'green' : 'red'} fontWeight='bold'>{data.open}</Typography>
                                        <Box display='flex'>
                                            <Typography sx={{ marginRight: 1 }} variant="body2" color={Math.sign(data.increase) === 1 ? 'green' : 'red'} fontWeight='bold'>{Math.abs(data.increase)}</Typography>
                                            <Typography variant="body2" color={Math.sign(data.increase) === 1 ? 'green' : 'red'} fontWeight='bold'>{Math.abs(data.increasePercent)} %</Typography>

                                            {Math.sign(data.increase) === 1 ? <ArrowUpwardIcon fontSize="small" sx={{ color: 'green' }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: 'red' }} />}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" color='GrayText'>Opening</Typography>
                                        <Typography>{data.open}</Typography>
                                        <Typography variant="body2" color='GrayText'>Lowest</Typography>
                                        <Typography>{data.low}</Typography>
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" color='GrayText'>Volumn</Typography>
                                        <Typography>{formatNumberWithMillions(data.volumn)}</Typography>
                                        <Typography variant="body2" color='GrayText'>Highest</Typography>
                                        <Typography>{data.high}</Typography>
                                    </Box>
                                </Box>
                            </Box>)}
                    </Box>

                    {/** graph control */}
                    <Box pb={3} sx={{
                        overflow: 'auto',
                        margin: 'auto',
                        padding: 0,
                        background: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Box sx={{ borderRadius: '5px', background: 'rgba(0, 0, 0, 0.08)', marginBottom: 3, }}>
                            <ControlChip label='Time' />
                            <ControlChip label='1 M' />
                            <ControlChip label='5 M' />
                            <ControlChip label='15 M' />
                            <ControlChip label='30 M' />
                            <ControlChip label='1 H' />
                            <ControlChip label='1 D' />
                            <ControlChip label='7 D' />
                        </Box>
                    </Box>

                    {/** label for first */}
                    <Box sx={{
                        display: 'flex', background: 'white', paddingLeft: {
                            xs: 2,
                            sm: 4,
                            md: 6,
                            lg: 8,
                            xl: 10,
                        },
                    }}>
                        <Typography variant="body" sx={{ marginRight: 3 }}>{data ? data.time : ''}</Typography>
                        <Typography variant="body" sx={{ marginRight: 3 }} color='seagreen'>O:{data ? data.open : ''}</Typography>
                        <Typography variant="body" sx={{ marginRight: 3 }} color='seagreen'>H:{data ? data.high : ''}</Typography>
                        <Typography variant="body" sx={{ marginRight: 3 }} color='error'>L:{data ? data.low : ''}</Typography>
                    </Box>

                    <InfoChart focusCoin={focusCoin} />
                    <InfoHistChart focusCoin={focusCoin} />
                    <InfoBarChart focusCoin={focusCoin} />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'white',
                        width: '100%',
                    }}>
                        <Box sx={{ background: 'white', display: 'flex', justifyContent: 'space-between', width: '90%', maxWidth: '100%', '@media (max-width: 600px)': { width: '100%' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Checkbox defaultChecked color="success" />
                                <Typography variant="body2">Cancel self-selection</Typography>
                            </Box>
                            <Box>
                                <Button onClick={() => handleTradeClick('long')} variant="contained" color="success" sx={{ borderRadius: '20px', marginRight: 1 }}>Long</Button>
                                <Button onClick={() => handleTradeClick('short')} variant="contained" color="error" sx={{ borderRadius: '20px' }}>Short</Button>
                            </Box>
                        </Box>
                    </Box>
                </>)}

            {value === 1 && (
                <Exchange />
            )}


            <ConfirmModal
                focusCoin={focusCoin}
                tradeType={tradeType}
                open={open}
                handleClose={() => { setOpen(false) }}
            />

            <Dialog
                open={loginDialogOpen}
                onClose={handleLoginDialogClose}
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
                            Please sign in to start trading
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button onClick={handleLoginDialogClose} variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>
                        Cancel
                    </Button>
                    <Button onClick={navigateToLogin} variant="contained" sx={{ borderRadius: '20px' }}>
                        Sign In
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}