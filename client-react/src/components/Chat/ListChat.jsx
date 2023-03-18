import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {getChats} from "../../services/chatService";
import {IconButton, SwipeableDrawer} from "@mui/material";
import AddChat from "./little/AddChat";
import MenuWindow from "../OtherComponents/MenuWindow";
import MenuIcon from '@mui/icons-material/Menu';
import StyledBadgeOffline from "./little/statusOffline";
import StyledBadgeOnline from "./little/statusOnline";
import moment from "moment";

export default function ListChat() {
    const dispatch = useDispatch()
    const {userData} = useSelector((state) => state.auth?.user);
    const {list} = useSelector((state) => state.chat.data)
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        getChats(dispatch)
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        console.log(open)
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setOpenMenu(open)
    };

    return (
        <div>
            <div className="w-full h-16 " style={{backgroundColor: "yellow"}}>
                <ListItem>
                    <ListItemAvatar>
                        <IconButton onClick={() => setOpenMenu(true)}>
                            <MenuIcon style={{width: 30, height: 30, color: "black"}}/>
                        </IconButton>
                    </ListItemAvatar>
                    <ListItemText style={{paddingLeft: 40, color: "red"}} primary={<b>ViVuChat</b>}/>
                    <IconButton style={{color: "blue"}} onClick={() => setOpen(true)}>
                        <MapsUgcIcon/>
                    </IconButton>
                </ListItem>
                <AddChat
                    open={open}
                    onClose={handleClose}
                />
            </div>

            <SwipeableDrawer
                anchor={"left"}
                open={openMenu}
                onClose={toggleDrawer( false)}
                onOpen={toggleDrawer( true)}
            >
            <MenuWindow setOpen = {toggleDrawer}/>
            </SwipeableDrawer>

            <div>
                <List sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    marginTop: "8px",
                    padding: 0,
                }}>
                    <Stack spacing={1}>
                        {list.map((chat, index) => (
                            <Link to={`/chat/${chat.id}`} key={index} style={{backgroundColor: "rgba(237,234,239,0.8)"}}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        {chat.online? (
                                            <StyledBadgeOnline
                                                overlap="circular"
                                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                                variant="dot">
                                                <Avatar src={chat.avatar[0]}/>
                                            </StyledBadgeOnline>
                                        ): (
                                            <StyledBadgeOffline
                                                overlap="circular"
                                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                                variant="dot">
                                                <Avatar src={chat.avatar[0]}/>
                                            </StyledBadgeOffline>
                                        )}

                                    </ListItemAvatar>
                                    <ListItemText primary={<b>{chat.name}</b>}
                                                  secondary={chat.online? "Online" : moment(chat.lastActivity).fromNow()}
                                    />
                                </ListItem>
                            </Link>
                        ))}
                    </Stack>
                </List>
            </div>
        </div>
    )
}