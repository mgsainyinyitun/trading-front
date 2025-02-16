import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import background from '../../../images/general/bluebackground.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { minemenu } from "./minemenu";
import { useNavigate } from 'react-router-dom';

export default function Mine() {
    const navigate = useNavigate();

    const handleClick = (menuId, menuName) => {
        if (menuId === 3) {
            navigate('/transactions');
        }
        if (menuId === 9 && menuName === 'Online Customer Service') {
            window.open('https://t.me/support', '_blank');
        }
    };

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
                                <Box pl={3} pr={3} key={menu.id}>
                                    <ListItem
                                        sx={{ padding: 1 }}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={() => handleClick(menu.id, menu.name)} dense>
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