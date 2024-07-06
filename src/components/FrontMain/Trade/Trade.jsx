import { BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Chip, CircularProgress, MenuItem, Select, Typography } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useEffect, useState } from "react";
import InfoChart from "./InfoChart";
import axios from "axios";
import { convertTimestampToLocalTime, formatNumberWithMillions } from "../../../utils/utils";
import InfoBarChart from "./InfoBarChart";
import InfoHistChart from "./InfoHistChart";
import { useInterval } from "react-use";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ConfirmModal from "./ConfirmModal";

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
    const fetchData = async () => {
        try {
            const API = 'https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=2';
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
    }, []);
    return (
        <Box>
            {/** Navigation */}
            <Box pb={3} sx={{
                overflow: 'hidden',
                margin: 0,
                background: 'white'
            }}>
                <BottomNavigation
                    sx={{ padding: 1, margin: 0 }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label="Fast" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                            fontWeight: 'bold',
                        },
                    }} />
                    <BottomNavigationAction label="Contract" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                            fontWeight: 'bold',
                        },
                    }} />
                    <BottomNavigationAction label="Currency" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                            fontWeight: 'bold',
                        },
                    }} />
                </BottomNavigation>
            </Box>

            {/** settings  */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', background: 'white' }}>
                <Box p={1} sx={{ background: 'white', width: '90%', maxWidth: '100%', '@media (max-width: 600px)': { width: '100%' } }} display='flex' justifyContent='space-between'>
                    <Box>
                        <Select size="small" sx={{
                            boxShadow: "none",
                            minWidth: 150,
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                                border: 0,
                            },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                border: 0,
                            },
                        }} value={10}>
                            <MenuItem value={10}>BTC/USTD</MenuItem>
                            <MenuItem value={20}>ETH/USTD</MenuItem>
                            <MenuItem value={30}>DOGE/USTD</MenuItem>
                        </Select>
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
                {loading?(<CircularProgress/>) : (
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

            <InfoChart />
            <InfoHistChart />
            <InfoBarChart />

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
                        <Button onClick={() => setOpen(true)} variant="contained" color="success" sx={{ borderRadius: '20px', marginRight: 1 }}>Long</Button>
                        <Button onClick={() => setOpen(true)} variant="contained" color="error" sx={{ borderRadius: '20px' }}>Short</Button>
                    </Box>
                </Box>
            </Box>
            <ConfirmModal open={open} handleClose={() => { setOpen(false) }} />
        </Box>
    )
}