import { Box, Container } from "@mui/material"
import { Routes, Route } from 'react-router-dom';
import Home from "../FrontMain/Home/Home"
import Market from "../FrontMain/Market/Market"
import Trade from "../FrontMain/Trade/Trade"
import Asset from "../FrontMain/Asset/Asset"
import Mine from "../FrontMain/Mine/Mine"
import TradeTest from "../FrontMain/Trade/TradeTest";

export default function Main() {
    return (
        <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
            <Container sx={{ height: '100%', width: '100%', background: '#eeeeee',padding:0 }}>
                <Box sx={{ flexGrow: 1, background: "#eeeeee" }}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/market' element={<Market />} />
                        <Route path='/trade' element={<Trade />} />
                        <Route path='/asset' element={<Asset />} />
                        <Route path='/mine' element={<Mine />} />
                        <Route path='/trade-test' element={<TradeTest />} />
                    </Routes>
                </Box>
            </Container>
        </Box>
    )
};