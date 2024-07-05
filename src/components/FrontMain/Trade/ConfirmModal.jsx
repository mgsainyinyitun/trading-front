import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    pt: 2,
    px: 4,
    pb: 3,
};

const DisplayCard = ({ s, p }) => {
    return (
        <Card
            sx={{
                height: 60, borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
            }}
            fullWidth
        >
            <Box sx={{ flexGrow: 1, width: '100%', background: '#1e88e5', height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Typography color='white' textAlign='center' variant="h6">{s}s</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%', height: 30, background: '#90caf9', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Typography textAlign='center' sx={{ flexGrow: 1 }} variant="body2">{p}.0%</Typography>
            </Box>
        </Card>
    )
}


export default function ConfirmModal({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400, maxHeight: 500 }}>
                <h2 id="parent-modal-title">Order Confirmation</h2>
                <Box mb={1}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography>Name </Typography>
                        <Typography>BTC/USTD</Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography>Direction </Typography>
                        <Typography color='green'>Long</Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography>Current </Typography>
                        <Typography>63164.78</Typography>
                    </Box>
                </Box>

                <Typography variant="body2" gutterBottom>
                    Choose the expiry time (left-sliding yields higher)
                </Typography>
                <Box display='flex' gap={1} mb={2}>
                    <DisplayCard s={30} p={20} />
                    <DisplayCard s={60} p={30} />
                    <DisplayCard s={120} p={50} />
                    <DisplayCard s={300} p={70} />
                </Box>

                <Box mb={1}>
                    <TextField
                        label="Buy Quantity"
                        variant="outlined"
                        fullWidth
                        helperText="Min100buy from, Max99999Capped"
                        size="small"
                    />
                </Box>
                <Box display='flex' justifyContent='space-between' mb={1}>
                    <Typography variant="body2" gutterBottom>
                        Available balance: 621229.8
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Handling fee: 0%
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    size="small"
                    sx={{ height: 50, borderRadius: 10 }}
                    fullWidth
                >
                    Confirm order
                </Button>

            </Box>
        </Modal>
    )
}