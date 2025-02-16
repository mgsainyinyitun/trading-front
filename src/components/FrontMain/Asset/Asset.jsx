import { Avatar, BottomNavigation, BottomNavigationAction, Box, Typography, IconButton } from "@mui/material";
import deposit from '../../../images/general/deposit.png';
import withdraw from '../../../images/general/withdraw.png';
import exchange from '../../../images/general/exchange.png';
import { useState } from "react";
import AccountAsset from "./AccountAsset";
import CoinAsset from "./CoinAsset";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Asset() {
    const [value, setValue] = useState(0);
    const [showBalance, setShowBalance] = useState(true);
    const navigate = useNavigate();

    const toggleBalance = () => {
        setShowBalance(!showBalance);
    };

    return (
        <Box pb={1}>
            <Box
                sx={{
                    backgroundSize: 'cover',
                    backgroundColor: '#0091ea',
                    backgroundPosition: 'center',
                    height: '20vh',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%", flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body" color='white'>Total Asset</Typography>
                        <IconButton onClick={toggleBalance} size="small" sx={{ color: 'white' }}>
                            {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </Box>
                    <Typography variant="h5" color='white'>
                        {showBalance ? '621229.80 USD' : '********'}
                    </Typography>
                </Box>
            </Box>

            {/** deposit,withdraw,exchange */}
            <Box
                p={1}
                pb={5}
                sx={{
                    background: 'white',
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    position: 'relative',
                    marginTop: '-10px',
                    height: '100%'
                }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-around',marginBottom:1 }}>
                    <Box>
                        <Box 
                            onClick={() => navigate('/deposit')}
                            sx={{ 
                                cursor: 'pointer',
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <img src={deposit} width={50} />
                            <Typography variant="body" color='MenuText'>Deposit</Typography>
                        </Box>
                    </Box>

                    <Box>
                        <a href="#" className="asset-a">
                            <img src={withdraw} width={50} />
                            <Typography variant="body" color='MenuText'>Withdrawl</Typography>
                        </a>
                    </Box>

                    <Box>
                        <a href="#" className="asset-a">
                            <img src={exchange} width={50} />
                            <Typography variant="body" color='MenuText'>Exchange</Typography>
                        </a>
                    </Box>
                </Box>
            </Box>

            {/** Navigation */}

            {/** Account Asset  and Coin Asset*/}
            {value === 0 ?
                <AccountAsset />
                : <CoinAsset />}

        </Box>
    )
}