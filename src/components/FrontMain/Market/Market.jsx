import Box from '@mui/material/Box';
import { BottomNavigation, BottomNavigationAction, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import MarketBTC from './MarketBTC';

export default function Market() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ alignSelf: 'flex-end', width: '100%' }}>
            <Box display='flex' justifyContent='center' sx={{background:'white'}}>
                <Typography variant="h6" sx={{ margin: 1 }}>Market</Typography>
            </Box>
            {/* <Divider sx={{margin:0}}/> */}
            <Box sx={{ overflow: 'hidden',margin:0 }}>
                <BottomNavigation
                    sx={{ padding: 1,margin:0 }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label="Optional" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                            fontWeight:'bold'
                        },
                    }} />
                    <BottomNavigationAction label="USDT" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                             fontWeight:'bold'
                        },
                    }} />
                </BottomNavigation>
            </Box>

            {value === 0 ?
                <MarketBTC />
                : <MarketBTC />}
        </Box>
    );
}
