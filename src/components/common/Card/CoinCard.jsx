import { Box, Card, CardContent, Typography } from "@mui/material";

export default function CoinCard({ coin }) {
    return (
        <Card variant="outlined" sx={{ background: 'white', margin: 1 }}>
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5"  fontWeight={'bold'} sx={{color:'blue'}}>
                        {coin.name || ''}/
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                            {coin.currency}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h6" component="div" color={Math.sign(coin.change) === -1 ? 'red' : 'green'}>
                    {coin.price || ''}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color={Math.sign(coin.change) === -1 ? 'red' : '#039be5'} >
                    {Math.sign(coin.change) === -1 ? '' : '+'}{coin.change || ''} %
                </Typography>
            </CardContent>
        </Card>
    );
}