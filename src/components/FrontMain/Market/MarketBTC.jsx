import { Box, Typography } from "@mui/material";
import { marketinfo } from "../../../demo/market";
import MarketCard from "../../common/Card/MarketCard";

export default function MarketBTC({data}) {
    return (
        <Box p={1}>
            <Box sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                padding: '12px',
                marginBottom: '16px',
                boxShadow: '0 4px 6px rgba(124,77,255,0.1)'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: 1,
                }}>
                    <Box sx={{ minWidth: '20%', maxWidth: '40%' }}>
                        <Typography variant="body2" sx={{
                            color: '#7c4dff',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span role="img" aria-label="coin" style={{marginRight: '4px'}}>💰</span>
                            Asset Name
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%', maxWidth: '30%' }}>
                        <Typography variant="body2" sx={{
                            color: '#7c4dff',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span role="img" aria-label="price" style={{marginRight: '4px'}}>💎</span>
                            Price
                        </Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%', display: 'flex', justifyContent: 'flex-end', maxWidth: '30%'}}>
                        <Typography variant="body2" sx={{
                            color: '#7c4dff',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            Changes <span role="img" aria-label="chart" style={{marginLeft: '4px'}}>📊</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ width: '100%', borderRadius: '5px' }}>
                {data.map(m => {
                    return (
                        <MarketCard data={m}/>
                    )
                })}
            </Box>
        </Box>
    )
}