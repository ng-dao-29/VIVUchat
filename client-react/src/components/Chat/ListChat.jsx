import { List, ListItem, ListItemText, ListItemAvatar, ListItemIcon, ListItemButton } from '@mui/material';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import { IconButton, SwipeableDrawer } from "@mui/material";
import Stack from '@mui/material/Stack';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addChat } from '../../redux/chatSlice';
import { getChats, findOrCreateNewChat } from "../../services/chatService";
import { searchUser } from '../../services/userService';
import AddChat from "./little/AddChat";
import AddGroupDialog from './little/AddGroupDialog';
import MenuWindow from "../OtherComponents/MenuWindow";
import StyledBadgeOffline from "./little/statusOffline";
import StyledBadgeOnline from "./little/statusOnline";
import moment from "moment";
import socket from "../../config/socket";

export default function ListChat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth?.user);
    const { list } = useSelector((state) => state.chat.data)
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const notSearching = {
        status: false,
        keyword: ''
    }
    const [searching, setSearching] = useState(notSearching);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        getChats(dispatch)
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    socket.on("operationHandling", () => {
        getChats(dispatch)
    })

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

    const search = ({ target: { value } }) => {
        if (!value) {
            setSearchedUsers([]);
            setSearching(notSearching);
        } else {
            setSearching({
                status: true,
                keyword: value
            });
            searchUser(value).then((res) => {
                setSearchedUsers(res.data.data);
            })
                .catch((err) => {
                    setSearching(false);
                    setSearchedUsers([]);
                })
        }
    }

    const handleClickChat = (userId) => {
        findOrCreateNewChat([userId]).then((res) => {
            navigate(`/chat/${res.data.data.id}`);
            if (res.data.message === "create new chat successfully") {
                dispatch(addChat(res.data.data));
            }
        }).catch((err) => {
            console.log(err.response.data.message);
        })
    }

    return (
        <div>
            <div className="w-full" style={{ backgroundColor: "#003A46" }}>
                <ListItem sx={{ pl: 1 }}>
                    <IconButton onClick={() => setOpenMenu(true)}>
                        <MenuIcon style={{ width: 30, height: 30, color: "black" }} />
                    </IconButton>
                    <ListItemText style={{ paddingLeft: 40 }} primary={<b>ViVuChat</b>} />
                </ListItem>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#003A46", pl: 2, pr: 1, pb: 2 }}>
                    <FormControl sx={{ width: "80%" }} variant="outlined">
                        <OutlinedInput
                            id="search-chat"
                            type='text'
                            placeholder='Tìm kiếm'
                            size="small"
                            sx={{ pl: 0 }}
                            value={searching.keyword}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton>
                                        {searching.status ?
                                            <CloseIcon onClick={() => {
                                                setSearching(notSearching);
                                            }} />
                                            : <SearchIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={search}
                        />
                    </FormControl>
                    <IconButton onClick={() => setOpen(true)}>
                        <GroupAddIcon />
                    </IconButton>
                </Stack>
                <AddGroupDialog
                    open={open}
                    onClose={handleClose}
                />
            </div>

            <SwipeableDrawer
                anchor={"left"}
                open={openMenu}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <MenuWindow setOpen={toggleDrawer} />
            </SwipeableDrawer>

            <div>
                <List sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    marginTop: "8px",
                    padding: 0,
                }}>
                    {
                        searching.status ?
                            <List
                                dense
                                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            >
                                {searchedUsers.map((user, index) => {
                                    const labelId = `checkbox-list-secondary-label-${user.id}`;
                                    return (
                                        <ListItem key={index}
                                            onClick={() => { handleClickChat(user.id) }}>
                                            <ListItemButton>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={`Avatar ${user.name}`}
                                                        src={`${user.avatar}`}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText id={labelId} primary={` ${user.name}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            :
                            <Stack spacing={1}>
                                {list.map((chat, index) => (
                                    <Link to={`/chat/${chat.id}`} key={index} style={{ backgroundColor: "rgba(237,234,239,0.8)" }}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                {chat.online ? (
                                                    <StyledBadgeOnline
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                        variant="dot">
                                                        <Avatar src={chat.avatar[0]} />
                                                    </StyledBadgeOnline>
                                                ) : (
                                                    <StyledBadgeOffline
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                        variant="dot">
                                                        <Avatar src={chat.avatar[0]} />
                                                    </StyledBadgeOffline>
                                                )}

                                            </ListItemAvatar>
                                            <ListItemText primary={<b>{chat.name}</b>}
                                                secondary={chat.online ? "Online" : moment(chat.lastActivity).fromNow()}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </Stack>
                    }
                </List>
            </div>
        </div>
    )
}