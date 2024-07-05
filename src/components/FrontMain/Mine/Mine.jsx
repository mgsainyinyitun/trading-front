import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import background from '../../../images/general/bluebackground.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { minemenu } from "./minemenu";

export default function Mine() {
    return (
        <Box pb={1}>
            <Box
                sx={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    height: '20vh',
                    borderRadius:'10px',
                    overflow:'hidden'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                    <Typography variant="h6" color='white'>Minning Information</Typography>
                </Box>
            </Box>

            <Box sx={{
                background: 'white',
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px',
                position: 'relative',
                marginTop: '-10px'
            }}>

                <List sx={{ width: '100%' }}>
                    {
                        minemenu.map((menu, i) => {
                            return (
                                <Box pl={3} pr={3}>
                                    <ListItem
                                        sx={{ padding: 1 }}
                                        key={menu.id}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={() => console.log('click')} dense>
                                            <ListItemIcon>
                                                {menu.icon}
                                            </ListItemIcon>
                                            <ListItemText id={menu.id} primary={<Typography variant="h6" color={"InfoText"}>{menu.name}</Typography>} />
                                        </ListItemButton>
                                    </ListItem>

                                    {
                                        i !== minemenu.length - 1 && <Divider />
                                    }
                                </Box>
                            )
                        })
                    }
                </List>
            </Box>
        </Box>
    )
}