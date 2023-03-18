import {
    Box,
    ListItem,
    ListItemButton,
    ListItemIcon,
    List,
    Divider,
    ListItemText,
} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import BlockIcon from '@mui/icons-material/Block';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import {logout} from "../../services/authService";
import {useNavigate} from "react-router-dom";
import Profile from "./Profile";
import UpdatePassword from "./UpdatePassword";
import {useDispatch, useSelector} from "react-redux";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {useEffect, useState} from "react";
import socket from "../../config/socket";

export default function MenuWindow(props) {
    const {userData} = useSelector((state) => state.auth.user)
    const {setOpen} = props
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openProfile, setOpenProfile] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)
    const handleLogout = () => {
        logout(dispatch, navigate)
        socket.emit("logout", userData)
    };

    const handleHome = () => {
        navigate("/");
    }

    return (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={setOpen(false)}
            onKeyDown={setOpen(false)}
        >
            <List>
                    <div >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={userData?.avatar}/>
                            </ListItemAvatar>
                            <ListItemText primary={<b>{userData?.name}</b>}/>
                        </ListItem>
                    </div>
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleHome}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenProfile(true)}>
                        <ListItemIcon>
                            <ContactEmergencyIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Thông tin cá nhân"}/>
                    </ListItemButton>
                </ListItem>
                <Profile open={openProfile} setOpen={setOpenProfile}/>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <GroupAddIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Thêm bạn bè"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <GroupIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Danh sách bạn bè"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <GroupsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Danh sách nhóm"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setUpdatePassword(true)}>
                        <ListItemIcon>
                            <LockIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Đổi mật khẩu"}/>
                    </ListItemButton>
                </ListItem>
                <UpdatePassword open={updatePassword} setOpen={setUpdatePassword}/>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <BlockIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Danh sách đen"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon style={{color: "red"}}/>
                        </ListItemIcon>
                        <ListItemText style={{color: "red"}} primary={"Đăng xuất"}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}