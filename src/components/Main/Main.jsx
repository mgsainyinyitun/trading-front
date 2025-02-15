import { Box, Container } from "@mui/material"
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "../FrontMain/Home/Home"
import Market from "../FrontMain/Market/Market"
import Trade from "../FrontMain/Trade/Trade"
import Asset from "../FrontMain/Asset/Asset"
import Mine from "../FrontMain/Mine/Mine"
import TradeTest from "../FrontMain/Trade/TradeTest";
import TopBar from '../TopBar/TopBar';
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import Profile from "../Profile/Profile";

export default function Main() {
    const location = useLocation();
    const isAuthPage = ['/signup', '/signin'].includes(location.pathname);

    return (
        <Box sx={{ height: '100%', width: '100%', overflow: 'auto', marginTop: isAuthPage ? 0 : 10 }}>
            <Container sx={{ height: '100%', width: '100%', background: '#eeeeee', padding: 0 }}>
                {!isAuthPage && <TopBar />}
                <Box sx={{ flexGrow: 1, background: "#eeeeee" }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/market' element={<Market />} />
                        <Route path='/trade' element={<Trade />} />
                        <Route path='/asset' element={<Asset />} />
                        <Route path='/mine' element={<Mine />} />
                        <Route path='/trade-test' element={<TradeTest />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </Box>
            </Container>
        </Box>
    )
};