import { Avatar, BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material";
import deposit from '../../../images/general/deposit.png';
import withdraw from '../../../images/general/withdraw.png';
import exchange from '../../../images/general/exchange.png';
import { useState } from "react";
import AccountAsset from "./AccountAsset";
import CoinAsset from "./CoinAsset";

export default function Asset() {
    const [value, setValue] = useState(0);

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
                    <Typography variant="body" color='white'>Asset</Typography>
                    <Typography variant="h6" color='white'>621229.80 USD</Typography>
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

                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Box>
                        <a href="#" className="asset-a">
                            <img src={deposit} width={50} />
                            <Typography variant="body" color='MenuText'>Deposit</Typography>
                        </a>
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
            <Box pb={3} sx={{
                overflow: 'hidden',
                margin: 0,
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px',
                marginTop: '-10px',
                position: 'relative',
                zIndex: 1,
                background: '#b2ebf2'
            }}>
                <BottomNavigation
                    sx={{ padding: 1, margin: 0, background: '#b2ebf2' }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label="Account Asset" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                            fontWeight: 'bold'
                        },
                    }} />
                    <BottomNavigationAction label="Coin Asset" sx={{
                        '&.Mui-selected': {
                            borderBottom: '2px solid #2196f3',
                            fontWeight: 'bold'
                        },
                    }} />
                </BottomNavigation>
            </Box>

            {/** Account Asset  and Coin Asset*/}
            {value === 0 ?
                <AccountAsset />
                : <CoinAsset />}

        </Box>
    )
}