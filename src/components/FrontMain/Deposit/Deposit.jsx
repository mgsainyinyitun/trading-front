import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UsdtIcon from '../../../images/coin-icons/usdt.png';
import UsdcIcon from '../../../images/coin-icons/usdc.png';
import EthIcon from '../../../images/coin-icons/ethereum-cryptocurrency.svg';
import BtcIcon from '../../../images/coin-icons/bitcoin-cryptocurrency.svg';

const coins = [
    { id: 1, name: 'USDT', icon: UsdtIcon, network: 'TRC20' },
    { id: 2, name: 'USDC', icon: UsdcIcon, network: 'ERC20' },
    { id: 3, name: 'ETH', icon: EthIcon, network: 'ERC20' },
    { id: 4, name: 'BTC', icon: BtcIcon, network: 'BTC' }
];

export default function Deposit() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ pl: 1 }}>
                Select Deposit Coin
            </Typography>
            <Grid container spacing={2}>
                {coins.map((coin) => (
                    <Grid item xs={6} sm={6} key={coin.id}>
                        <Paper 
                            elevation={2}
                            sx={{
                                p: 2,
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                }
                            }}
                            onClick={() => navigate(`/deposit/${coin.name.toLowerCase()}`)}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <img 
                                    src={coin.icon} 
                                    alt={coin.name}
                                    style={{ width: 32, height: 32 }}
                                />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="medium">
                                        {coin.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {coin.network}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
} 