import { Box } from "@mui/material";
import AssetCard from "../../common/Card/AssetCard";
import { accountasset } from "../../../demo/asset";

export default function AccountAsset() {
    return (
        <Box sx={{
            // background:'white',
            position: 'relative',
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            marginTop: '-10px',
            zIndex: 2,
        }}>
            {
                accountasset.map(accout => {
                    return (
                        <AssetCard data={accout} />
                    )
                })
            }
        </Box>
    )

}