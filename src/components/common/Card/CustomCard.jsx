import { Box, Button, Typography } from "@mui/material";

export default function CustomCard({ data }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
            <Box sx={{ display: 'flex', minWidth: '20%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography variant="h6" component="div" fontWeight={'bold'} sx={{ color: 'blueviolet' }}>
                        {data.name || ''}/
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        {data.currency}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', minWidth: '20%' }} color={Math.sign(data.change) === -1 ? 'red' : 'green'}>
                <Typography sx={{ fontSize: 14 }} fontWeight={'bold'}>
                    {data.price || ''}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', minWidth: '20%', justifyContent: 'flex-end' }}>
                <Button variant="contained" color={Math.sign(data.change) === -1 ? 'error' : 'primary'} sx={{ fontSize: 12 }}>
                    {Math.sign(data.change) === -1 ? '' : '+'}{data.change} %
                </Button>
            </Box>
        </Box>
    )
}