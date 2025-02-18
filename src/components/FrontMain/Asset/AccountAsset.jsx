import { Box } from "@mui/material";
import AssetCard from "./AssetCard";

export default function AccountAsset({ assets, showBalance }) {
    return (
        <Box sx={{
            // background:'white',
            // border: '1px solid red',
            position: 'relative',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            zIndex: 2,
        }}>
            {assets.map((asset, index) => (
                <AssetCard
                    key={asset.accountNo} 
                    data={{
                        name: asset.currency.toUpperCase(),
                        available: showBalance ? asset.balance : '******',
                        inreview: showBalance ? asset.inreview_balance : '******',
                        isActive: asset.isActive
                    }} 
                />
            ))}
        </Box>
    );
}