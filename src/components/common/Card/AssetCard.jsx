import { Box, Typography } from "@mui/material";

export default function AssetCard({ data }) {
    return (
        <Box display='flex' flexDirection='column' sx={{
            background: 'white',
            borderRadius: '10px',
            marginBottom:2,
        }}>
            <Typography sx={{
                margin: 'auto',
                fontWeight: 'bold',
                padding: 1,
            }} variant="h5" color='#0097a7'>{data.name}</Typography>

            <Box display='flex' justifyContent='space-evenly' p={2}>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography fontFamily={'cursive'}>Available({data.name})</Typography>
                    <Typography>{data.available || 0.0}</Typography>
                </Box>

                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography fontFamily={'cursive'}>InReview({data.name})</Typography>
                    <Typography>{data.inreview || 0.0}</Typography>
                </Box>

                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography fontFamily={'cursive'}>Con({data.name})</Typography>
                    <Typography>{data.con || 0.0}</Typography>
                </Box>
            </Box>
        </Box>
    )

}