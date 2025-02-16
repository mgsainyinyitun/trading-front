import { Box, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import ImageSlick from "../../TopImageSlider/ImageSlick";
import { coininfo } from "../../../demo/coin";
import CoinCard from "../../common/Card/CoinCard";
import Slider from "react-slick";
import QuickTransaction from '../../../images/general/quick_transaction.jpg';
import HelpCenter from '../../../images/general/help_center.png';
import FutureTrading from '../../../images/general/future_trading.png';
import Mining from '../../../images/general/mining.png';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import GTranslateRoundedIcon from '@mui/icons-material/GTranslateRounded';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomCard from "../../common/Card/CustomCard";
import { useNavigate } from 'react-router-dom';
import { getCoinStringList } from '../../../utils/utils';

export default function Home() {
    const navigate = useNavigate();
    const [currencyData, setCurrencyData] = useState([]);

    useEffect(() => {
        const fetchCryptoPairs = async () => {
            try {
                const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
                    params: {
                        fsyms: getCoinStringList(),
                        tsyms: 'USDT'
                    }
                });
                const rawData = response.data.RAW;

                const formattedData = Object.entries(rawData).map(([symbol, data]) => ({
                    name: symbol,
                    currency: "USDT",
                    price: data.USDT.PRICE.toFixed(3),
                    change: data.USDT.CHANGEPCT24HOUR.toFixed(3),
                    imageUrl: `https://www.cryptocompare.com${data.USDT.IMAGEURL}`
                }));

                setCurrencyData(formattedData);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchCryptoPairs();
        const interval = setInterval(fetchCryptoPairs, 10000);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 5,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    const theme = useTheme();
    return (
        <Box p={1} sx={{ background: 'linear-gradient(to bottom, #f0f8ff, #ffffff)' }}>
            <Box>
                <ImageSlick />
            </Box>
            {/** coin price slider section */}
            <Box sx={{ background: 'rgba(238, 238, 238, 0.7)', borderRadius: "15px", boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <Slider {...settings}>
                    {
                        currencyData.map(coin => {
                            return <CoinCard coin={coin} />
                        })
                    }
                </Slider>
            </Box>

            {/** support and language section */}
            <Box p={3} sx={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', mt: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                        <PaymentIcon
                            sx={{ fontSize: 50, cursor: 'pointer', color: '#6a1b9a', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                            onClick={() => navigate('/deposit')}
                        />
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{ cursor: 'pointer', color: '#6a1b9a', fontWeight: 'bold', '&:hover': { color: '#9c27b0' } }}
                            onClick={() => navigate('/deposit')}
                        >
                            Payment 💰
                        </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                        <AccountBalanceWalletIcon sx={{ fontSize: 50, color: '#1976d2', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                        <Typography variant="body1" component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                            Withdraw 💎
                        </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                        <SupportAgentRoundedIcon sx={{ fontSize: 50, color: '#388e3c', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                        <Typography variant="body1" component="div" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                            Support 🎧
                        </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                        <GTranslateRoundedIcon sx={{ fontSize: 50, color: '#d32f2f', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                        <Typography variant="body1" component="div" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                            Language 🌍
                        </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                        <DescriptionIcon sx={{ fontSize: 50, color: '#f57c00', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                        <Typography variant="body1" component="div" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                            Contract 📝
                        </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                        <GetAppIcon sx={{ fontSize: 50, color: '#0097a7', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }} />
                        <Typography variant="body1" component="div" sx={{ color: '#0097a7', fontWeight: 'bold' }}>
                            Download 📱
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            {/** quick transation section */}
            <Box display='flex' mt={2} gap={2}>
                <Card sx={{ width: '100%', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', background: 'linear-gradient(135deg, #fff6f6, #f0f8ff)' }}>
                    <CardContent>
                        <Box display='flex' justifyContent='space-evenly' alignItems='center'>
                            <Box>
                                <Typography variant="h6" fontWeight={'bold'} color="#6a1b9a">
                                    Quick Transaction ⚡
                                </Typography>
                                <Typography variant="body2" color={'gray'}>
                                    Support
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} sx={{ color: '#9c27b0' }}>
                                    BTC 🌟 USDT 💫 ETH ✨
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} sx={{ color: '#9c27b0' }}>
                                    and more... 🚀
                                </Typography>
                            </Box>
                            <Box sx={{ transform: 'scale(1.1)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
                                <img src={QuickTransaction} width={100} style={{ borderRadius: '10px' }} />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Box sx={{ width: '40%' }} display='flex' flexDirection='column' gap={2}>
                    <Card sx={{ height: '100%', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', background: 'linear-gradient(135deg, #f0f8ff, #e3f2fd)' }}>
                        <CardContent>
                            <Box display='flex' alignItems='center' gap={2}>
                                <Box sx={{ transform: 'scale(1)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
                                    <img src={FutureTrading} width={70} style={{ borderRadius: '10px' }} />
                                </Box>
                                <Typography variant="h6" color="#1976d2">
                                    Future Trading 📈
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ height: '100%', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', background: 'linear-gradient(135deg, #fff6f6, #ffebee)' }}>
                        <CardContent>
                            <Box display='flex' alignItems='center' gap={2}>
                                <Box sx={{ transform: 'scale(1)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
                                    <img src={HelpCenter} width={70} style={{ borderRadius: '10px' }} />
                                </Box>
                                <Typography variant="h6" color="#d32f2f">
                                    Help Center 💁‍♂️
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/** minning section */}
            <Box mt={2} sx={{ borderRadius: '15px', overflow: 'hidden', position: 'relative', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <Box>
                    <img className="home-banner" src={Mining} style={{ width: '100%', height: 'auto' }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        textAlign: 'center',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        <Typography variant="h4" sx={{ color: '#7c4dff', fontWeight: 'bold' }}>
                            LOCK-UP MINING 🌟
                            <Typography variant="h6" sx={{
                                color: '#4caf50',
                                fontSize: '1.1rem',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '1rem',
                                },
                                [theme.breakpoints.down('xs')]: {
                                    fontSize: '0.7rem',
                                },
                            }}>
                                More wealth is waiting for you to discover ✨
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='space-around' p={2} sx={{ background: 'rgba(255,255,255,0.9)' }}>
                    <Box>
                        <a className="main-a" href="#" style={{ color: '#7c4dff', fontWeight: 'bold', textDecoration: 'none' }}>
                            Running List 📋
                        </a>
                    </Box>
                    <Box>
                        <a className="main-a" href="#" style={{ color: '#7c4dff', fontWeight: 'bold', textDecoration: 'none' }}>
                            Volume 📊
                        </a>
                    </Box>
                </Box>
            </Box>

            {/** list section */}
            <Box sx={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', mt: 2, p: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                    <Box sx={{ minWidth: '20%' }}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 'bold' }}>Name 💎</Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%' }}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 'bold' }}>Last Price 💰</Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 'bold' }}>Ups and Downs 📈</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: '100%',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.9)',
                minHeight: 500,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                mt: 1
            }}>
                {currencyData.map((cu, index) => {
                    return (
                        <CustomCard key={index} data={cu} />
                    )
                })}
            </Box>
        </Box>
    )
}