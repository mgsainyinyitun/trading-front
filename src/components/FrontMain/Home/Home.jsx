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
import { currencyInfo } from "../../../demo/currency";
import CustomCard from "../../common/Card/CustomCard";

export default function Home() {
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
        <Box p={1}>
            <Box>
                <ImageSlick />
            </Box>
            {/** coin price slider section */}
            <Box sx={{ background: '#eeeeee', borderRadius: "5px" }}>
                <Slider {...settings}>
                    {
                        coininfo.map(coin => {
                            return <CoinCard coin={coin} />
                        })
                    }
                </Slider>
            </Box>

            {/** support and language section */}
            <Box p={3} display='flex' justifyContent={'space-around'} sx={{ background: 'white' }}>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <SupportAgentRoundedIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="body1" component="div" color={'purple'}>
                        Online Customer Service
                    </Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <GTranslateRoundedIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="body1" component="div" color={'purple'}>
                        Select Language
                    </Typography>
                </Box>
            </Box>
            {/** quick transation section */}
            <Box display='flex' mt={1} gap={1}>
                <Card sx={{ width: '100%' }}>
                    <CardContent>
                        <Box display='flex' justifyContent='space-evenly' alignItems='center'>
                            <Box>
                                <Typography variant="h6" fontWeight={'bold'}>
                                    Quick Transation
                                </Typography>
                                <Typography variant="body2" color={'gray'}>
                                    Support
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} color={'violet'}>
                                    BTC,USDT,ETH
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} color={'violet'}>
                                    etc.
                                </Typography>
                            </Box>
                            <Box>
                                <Box>
                                    <img src={QuickTransaction} width={100} />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    {/* <CardContent>
                        <Grid container spacing={2} justifyContent="space-around">
                            <Grid item xs={6} sm={4} md={3}>
                                <Typography variant="h6" fontWeight={'bold'}>
                                    Quick Transation
                                </Typography>
                                <Typography variant="body2" color={'gray'}>
                                    Support
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} color={'violet'}>
                                    BTC,USDT,ETH
                                </Typography>
                                <Typography variant="body1" fontWeight={'bold'} color={'violet'}>
                                    etc.
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} md={3} sx={{border:'1px solid red',flexGrow:1}}>
                                <img src={QuickTransaction} width="100%" />
                            </Grid>
                        </Grid>
                    </CardContent> */}
                </Card>
                <Box sx={{ width: '40%' }} display='flex' flexDirection='column' gap={1}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box display='flex' alignItems='center'>
                                <Box>
                                    <img src={FutureTrading} width={70} />
                                </Box>
                                <Typography variant="h6" >
                                    Future Trading
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box display='flex' alignItems='center'>
                                <Box>
                                    <img src={HelpCenter} width={70} />
                                </Box>
                                <Typography variant="h6">
                                    Help Center
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/** minning section */}
            <Box mt={1} sx={{ borderRadius: '5px', overflow: 'hidden', position: 'relative', background: 'white' }}>
                <Box>
                    <img className="home-banner" src={Mining} />
                    <Box sx={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '24px' }}>
                        <Typography variant="h4" color={'blueviolet'} fontWeight={'bold'}>
                            LOCK-UP MINNING
                            <Typography variant="h6" color={'green'} sx={{
                                fontSize: '1.1rem',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '1rem',
                                },
                                [theme.breakpoints.down('xs')]: {
                                    fontSize: '0.7rem',
                                },
                            }}>
                                More wealth is waiting for you to discover.
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='space-around' p={2}>
                    <Box>
                        <a className="main-a" href="#">Running List </a>
                    </Box>
                    <Box>
                        <a className="main-a" href="#">Volumn </a>
                    </Box>
                </Box>
            </Box>

            {/** list section */}
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                    <Box sx={{ minWidth: '20%' }}>
                        <Typography variant="body2" color={'gray'}>Name</Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%' }}>
                        <Typography variant="body2" color={'gray'}>Last Price</Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="body2" color={'gray'}>Ups and Downs</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ width: '100%', borderRadius: '5px', background: 'white', maxHeight: 500, overflow: 'auto' }}>
                {currencyInfo.map(cu => {
                    return (
                        <CustomCard data={cu} />
                    )
                })}
            </Box>
        </Box>
    )
}