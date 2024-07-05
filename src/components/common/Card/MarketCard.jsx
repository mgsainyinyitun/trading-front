import { Avatar, Box, Button, Typography } from "@mui/material";

export default function MarketCard({ data }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between',padding:1, paddingTop: 2,paddingBottom:2, background: 'white', borderRadius: '5px', marginBottom: 2 }}>
            <Box sx={{ minWidth: '20%', maxWidth: '40%', display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
                    <Avatar src={data.icon}  sx={{ width: 30, height: 30 }} />
                </Box>
                <Box sx={{width:'100%'}}>
                    <Box sx={{ display: 'flex' ,width:'100%'}}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Typography variant="body" component="div" fontWeight={'bold'}>
                                {data.name || ''}/
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Typography sx={{ fontSize: 12 }} color="text.secondary" >
                                {data.currency}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{width:'100%'}}>
                        <Typography variant="body" component="div" color="gray" sx={{ overflowWrap: 'break-word' }}>
                            Quantity:{data.quantity}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', minWidth: '20%', maxWidth: '30%', alignItems: 'center' }} color={Math.sign(data.change) === -1 ? 'red' : 'green'}>
                <Typography sx={{ fontSize: 14 }} fontWeight={'bold'}>
                    {data.price || ''}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', minWidth: '20%', maxWidth: '30%', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Box>
                    <Button variant="contained" color={Math.sign(data.change) === -1 ? 'error' : 'primary'} sx={{ fontSize: 12 }}>
                        {Math.sign(data.change) === -1 ? '' : '+'}{data.change} %
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}