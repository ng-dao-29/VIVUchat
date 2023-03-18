import {useState, useEffect, useRef} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {findOrCreateNewChat} from "../../../services/chatService";
import {useNavigate} from "react-router-dom";
import {addChat} from "../../../redux/chatSlice";
import {useDispatch, useSelector} from "react-redux";
import socket from "../../../config/socket";
import {
    Box,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemButton,
    TextField
} from "@mui/material";

import {searchUser} from "../../../services/userService";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

export default function AddChat(props) {
    const {userData} = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {onClose, open} = props;
    const [listUsers, setListUsers] = useState([])
    const radioGroupRef = useRef(null);
    const [checked, setChecked] = useState([]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        if (checked.length > 0) {
            findOrCreateNewChat(checked).then((res) => {
                if (res.data.message === "create new chat successfully") {
                    dispatch(addChat(res.data.data));
                    navigate(`/chat/${res.data.data.id}`);
                    onClose();
                } else {
                    navigate(`/chat/${res.data.data.id}`);
                    onClose();
                }
            }).catch((err) => {
                onClose();
            })
        }
    };

    const handleToggle = (user) => () => {
        const currentIndex = checked.indexOf(user);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(user);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    useEffect(() => {
        if (!open) {
            setChecked([]);
            setListUsers([]);
        }
    }, [open]);

    const search = (e) => {
        if (!e.target.value) {
            setListUsers([])
        } else {
            searchUser(e.target.value).then((res) => {
                setListUsers(res.data.data)
            })
                .catch((err) => {
                    setListUsers([])
                })
        }
    }

    return (
        <>
            <Dialog
                sx={{"& .MuiDialog-paper": {width: 410, maxHeight: 500}}}
                maxWidth="xs"
                TransitionProps={{onEntering: handleEntering}}
                open={open}
            >
                <DialogTitle style={{height: 50, paddingTop: 10, paddingLeft: 5, paddingRight: 15}}>
                    <IconButton onClick={handleCancel} style={{float: "left", color: "red"}}>
                        <ClearIcon/>
                    </IconButton>
                    <div>
                        <b style={{marginLeft: 90}}>tin nhắn mới</b>
                        <IconButton onClick={handleOk} style={{float: "right", color: "#27c4f5"}}>
                            <QuestionAnswerIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
                <div style={{height: 47}}>
                    <div style={{float: "left", paddingLeft: 5}}>
                        <Box sx={{display: "flex", alignItems: "flex-end"}}>
                            <PersonSearchIcon
                                sx={{color: "action.active", mr: 1, my: 0.5}}
                                style={{height: 35, width: 35, marginLeft: 8}}
                            />
                            <TextField
                                onChange={(e) => search(e)}
                                id="input-with-sx"
                                label="tìm kiếm"
                                variant="standard"
                                style={{width: 350}}
                            />
                        </Box>
                    </div>
                </div>
                <DialogContent dividers style={{height: 400}}>
                    <List
                        dense
                        sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
                    >
                        {listUsers.map((user, index) => {
                            const labelId = `checkbox-list-secondary-label-${user.id}`;
                            return (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(user.id)}
                                            checked={checked.indexOf(user.id) !== -1}
                                            inputProps={{"aria-labelledby": labelId}}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar ${user.name}`}
                                                src={`${user.avatar}`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={` ${user.name}`}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    )
}