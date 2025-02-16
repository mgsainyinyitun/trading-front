import React, { useEffect, useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import PersonIcon from '@mui/icons-material/Person'
import { Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const BottomNavi = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/': setValue(0); break;
            case '/market': setValue(1); break;
            case '/trade': setValue(2); break;
            case '/asset': setValue(3); break;
            case '/mine': setValue(4); break;
            default: break;
        }
    }, [location.pathname]);

    return (
        <Box sx={{ alignSelf: 'flex-end', width: '100%',borderTop:'1px solid #b3e5fc'}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    switch (newValue) {
                        case 0: navigate('/'); break;
                        case 1: navigate('/market'); break;
                        case 2: navigate('/trade'); break;
                        case 3: navigate('/asset'); break;
                        case 4: navigate('/mine'); break;
                        default: break;
                    }
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Market" icon={<StorefrontIcon />} />
                <BottomNavigationAction label="Trade" icon={<SwapVertIcon />} />
                <BottomNavigationAction label="Wallet" icon={<AccountBalanceWalletIcon />} />
                <BottomNavigationAction label="Mine" icon={<PersonIcon />} />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNavi
