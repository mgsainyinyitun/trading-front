import { Avatar, Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function MarketCard({ data }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    return (
        <Box 
            onClick={() => navigate(`/market/${data.name.toLowerCase()}`)}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: { xs: 1, sm: 2 },
                background: 'white',
                borderRadius: '10px',
                marginBottom: 1.5,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(to right, #ffffff, #f8f9fa)'
                }
            }}
        >
            <Box sx={{ minWidth: '20%', maxWidth: '40%', display: 'flex', alignItems: 'center' }}>
                <Avatar 
                    src={data.imageUrl} 
                    sx={{ 
                        width: { xs: 25, sm: 35 }, 
                        height: { xs: 25, sm: 35 },
                        marginRight: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} 
                />
                <Box>
                    <Typography 
                        variant={isMobile ? "body2" : "body1"} 
                        component="div" 
                        fontWeight="bold"
                        sx={{ display: 'inline' }}
                    >
                        {data.name}
                    </Typography>
                    <Typography 
                        sx={{ 
                            fontSize: { xs: 10, sm: 12 },
                            color: 'text.secondary',
                            display: 'inline',
                            marginLeft: 0.5
                        }}
                    >
                        /{data.currency}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                minWidth: '20%', 
                maxWidth: '30%', 
                alignItems: 'center',
                color: parseFloat(data.change) < 0 ? '#ff1744' : '#00c853',
                fontWeight: 'bold'
            }}>
                <Typography sx={{ fontSize: { xs: 13, sm: 15 } }}>
                    ${data.price}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', minWidth: '20%', maxWidth: '30%', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button 
                    variant="contained" 
                    color={parseFloat(data.change) < 0 ? 'error' : 'success'}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        borderRadius: '20px',
                        fontSize: { xs: 11, sm: 13 },
                        fontWeight: 'bold',
                        minWidth: { xs: '60px', sm: '80px' },
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    {parseFloat(data.change) < 0 ? '' : '+'}{data.change}%
                </Button>
            </Box>
        </Box>
    );
}