import { Box, Typography, Chip } from "@mui/material";
import btcIcon from '../../../images/coin-icons/bitcoin-cryptocurrency.svg';
import ethIcon from '../../../images/coin-icons/ethereum-cryptocurrency.svg';
import usdtIcon from '../../../images/coin-icons/usdt.png';

export default function AssetCard({ data }) {
    const getCoinIcon = (symbol) => {
        switch(symbol.toUpperCase()) {
            case 'BTC':
                return btcIcon;
            case 'ETH':
                return ethIcon;
            case 'USDT':
                return usdtIcon;
            default:
                return null;
        }
    };

    return (
        <Box display='flex' flexDirection='column' sx={{
            background: 'white',
            borderRadius: '10px',
            marginBottom: 2,
            padding: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                    {getCoinIcon(data.name) && (
                        <img 
                            src={getCoinIcon(data.name)} 
                            alt={data.name}
                            style={{ width: 24, height: 24 }}
                        />
                    )}
                    <Typography 
                        variant="h6" 
                        color='primary'
                        sx={{ fontWeight: 600 }}
                    >
                        {data.name}
                    </Typography>
                </Box>
                <Chip
                    label={data.isActive ? 'Active' : 'Inactive'}
                    color={data.isActive ? 'success' : 'default'}
                    size="small"
                    sx={{ height: 24 }}
                />
            </Box>

            <Box display='flex' justifyContent='space-between' gap={2}>
                <Box sx={{ flex: 1 }}>
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ mb: 0.5, display: 'block' }}
                    >
                        Available Balance
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="primary.main"
                        sx={{ fontWeight: 600 }}
                    >
                        {data.available} {data.name}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ mb: 0.5, display: 'block' }}
                    >
                        In Review
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="warning.main"
                        sx={{ fontWeight: 600 }}
                    >
                        {data.inreview} {data.name}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ mb: 0.5, display: 'block' }}
                    >
                        Estimated (USD)
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="success.main"
                        sx={{ fontWeight: 600 }}
                    >
                         {isNaN(parseFloat(data.available)) ? '********' : parseFloat(data.available)} USD
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
} 