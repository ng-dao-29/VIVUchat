import { useState, useEffect, useRef } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { addChat } from "../../../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { Checkbox, IconButton, ListItem, ListItemButton, TextField, InputAdornment } from "@mui/material";
import { searchUser } from "../../../services/userService";
import { createNewGroupChat } from "../../../services/chatService";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import socket from "../../../config/socket";
export default function AddGroupDialog(props) {
    const { userData } = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { onClose, open } = props;
    const [listUsers, setListUsers] = useState([])
    const radioGroupRef = useRef(null);
    const [checked, setChecked] = useState([]);
    const [groupTitle, setGroupTitle] = useState("");

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        const data = {
            listUsersId: checked,
            nameGroup: groupTitle
        }
        createNewGroupChat(data).then((res) => {
            dispatch(addChat(res.data.data));
            navigate(`/chat/${res.data.data.id}`);
            onClose();
            socket.emit("")
        })
            .catch((err) => {
                onClose();
            })
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
                sx={{ "& .MuiDialog-paper": { width: 410, maxHeight: 500 } }}
                maxWidth="xs"
                TransitionProps={{ onEntering: handleEntering }}
                open={open}
            >
                <DialogTitle style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 15 }}>
                    <b style={{ marginLeft: 90 }}>Nhóm trò chuyện mới</b>
                    <IconButton onClick={handleCancel} style={{ float: "right" }}>
                        <ClearIcon />
                    </IconButton>
                    <div>
                        <div className="px-2 pt-2">
                            <TextField variant="standard" placeholder="Tên nhóm trò chuyện" fullWidth autoFocus
                                value={groupTitle} onChange={e => { setGroupTitle(e.target.value) }}
                                sx={{ pb: 2 }} inputProps={{ style: { fontSize: 20, textAlign: "center" } }} />
                            <TextField
                                onChange={(e) => search(e)}
                                id="input-with-sx"
                                fullWidth
                                placeholder="Tìm kiếm người dùng"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </DialogTitle>

                <DialogContent dividers style={{ height: 400 }}>
                    <List
                        dense
                        sx={{ width: "100%", maxWidth: 360}}
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
                                            inputProps={{ "aria-labelledby": labelId }}
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
                                        <ListItemText id={labelId} primary={` ${user.name}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Button variant="contained" fullWidth onClick={handleOk} disabled={checked.length === 0 || groupTitle === ""}>Tạo</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}