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
        <Box pb={1} sx={{ margin: '0 auto' }}>
            <Box
                sx={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    height: '20vh',
                    borderRadius:'10px',
                    overflow:'hidden',
                    padding: 1.5
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: "100%" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <Avatar 
                            sx={{ width: 50, height: 50, border: '2px solid white' }}
                            src="https://placekitten.com/200/200"
                        />
                        <Box>
                            <Typography variant="h6" color='white' sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                John Doe
                            </Typography>
                            <Typography variant="body2" color='white' sx={{ fontSize: '0.9rem' }}>
                                ID: 123456789
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                background: 'white',
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px',
                position: 'relative',
                marginTop: '-10px',
                width: '95%',
                margin: '0 auto',
                marginTop: '-10px'
            }}>

                <List sx={{ width: '100%' }}>
                    {
                        minemenu.map((menu, i) => {
                            return (
                                <Box pl={2} pr={2} key={menu.id}>
                                    <ListItem
                                        sx={{ padding: 0.5 }}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments" size="small">
                                                <ArrowForwardIosIcon sx={{ fontSize: '0.9rem' }} />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={() => handleClick(menu.id, menu.name)} dense>
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                {menu.icon}
                                            </ListItemIcon>
                                            <ListItemText id={menu.id} primary={<Typography variant="body1" color={"InfoText"}>{menu.name}</Typography>} />
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