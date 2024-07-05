import { Box, Typography } from "@mui/material";
import { marketinfo } from "../../../demo/market";
import MarketCard from "../../common/Card/MarketCard";

export default function MarketBTC() {
    return (
        <Box p={1}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                    <Box sx={{ minWidth: '20%' ,maxWidth: '40%' }}>
                        <Typography variant="body2" color={'gray'}>Name</Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%',maxWidth: '30%' }}>
                        <Typography variant="body2" color={'gray'}>Last Price</Typography>
                    </Box>
                    <Box sx={{ minWidth: '20%', display: 'flex', justifyContent: 'flex-end' ,maxWidth: '30%'}}>
                        <Typography variant="body2" color={'gray'}>Ups and Downs</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ width: '100%', borderRadius: '5px' }}>
                {marketinfo.map(m => {
                    return (
                        <MarketCard data={m}/>
                    )
                })}
            </Box>
        </Box>
    )
}