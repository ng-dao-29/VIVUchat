import {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {getMessages, getDataChat} from "../../services/chatService";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import ScrollToBottom from "react-scroll-to-bottom";
import {sendMessage} from "../../services/chatService";
import StyledBadgeOffline from "./little/statusOffline";
import StyledBadgeOnline from "./little/statusOnline";
import socket from "../../config/socket";
import AddReactionIcon from '@mui/icons-material/AddReaction';

import "../../App.css"
import {Button, IconButton} from "@mui/material";
import {useSelector} from "react-redux";
import moment from "moment/moment";
import EmojiPicker from "emoji-picker-react";
import Picker from 'emoji-picker-react';
import emojis from "emoji-picker-react/src/data/emojis";

export default function ShowChat() {
    const navigate = useNavigate()
    const [listMessage, setListMessage] = useState([]);
    const [dataChat, setDataChat] = useState()
    const [showIcon, setShowIcon] = useState(false)
    const [message, setMessage] = useState("");
    const {userData} = useSelector((state) => state.auth?.user);

    const params = useParams();

    useEffect(() => {
        getDataChat(params)
            .then((res) => {
                console.log(res.data.data)
                setDataChat(res.data.data)
            })
            .catch((err) => {
                navigate("/")
            })
        getMessages(params).then((res) => {
            setListMessage(res.data.data);
        }).catch((err) => {
            setListMessage([])
        });
    }, [params]);
    const handelShowIcon = () => {
        setShowIcon(!showIcon);
    };

    const handleEmojiClick = (event, emoji) => {
        event.preventDefault()
        let msg = message;
        msg += emoji.emoji;
        setMessage(msg);
    }

    const handleSendMessage = () => {
        if (message !== "") {
            sendMessage(params, message).then((res) => {
                let receivers = [];
                dataChat.member.forEach((user) => {
                    if (userData.id !== user.id) {
                        receivers.push(user.id)
                    }
                })
                let messageSend = res.data.data
                if (res.data.message === "new message") {
                    socket.emit("sendMessage", messageSend, receivers)
                } else {
                    if (dataChat.isGroup) {
                        socket.emit("sendMessage", messageSend, receivers)
                    } else {
                        socket.emit("newChat", dataChat, receivers, userData)
                    }
                }
                setListMessage([...listMessage, messageSend]);
            })
                .catch((err) => console.log(err))
            setMessage("")
        }
    }

    socket.on("newMessage", (newMessage) => {
        console.log(newMessage)
        if (params.id === newMessage.room) {
            setListMessage([...listMessage, newMessage])
        }
    })

    return (
        <>
            <div className=" h-16 " style={{backgroundColor: "yellow"}}>
                <ListItem>
                    <ListItemAvatar>
                        {dataChat?.online? (
                            <StyledBadgeOnline
                                overlap="circular"
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                variant="dot"
                            >
                                <Avatar alt="avatar" src={dataChat?.avatar[0]}/>
                            </StyledBadgeOnline>
                        ) : (
                            <StyledBadgeOffline
                                overlap="circular"
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                variant="dot"
                            >
                                <Avatar alt="avatar" src={dataChat?.avatar[0]}/>
                            </StyledBadgeOffline>
                        )}
                    </ListItemAvatar>
                    <ListItemText primary={<b><h1>{dataChat?.name}</h1></b>}
                                  secondary={dataChat?.online? "Online" : moment(dataChat?.lastActivity).fromNow()}
                    />

                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <PhoneIcon style={{height: "40px", width: "40px"}}/>
                    </IconButton>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <VideocamIcon style={{height: "40px", width: "40px"}}/>
                    </IconButton>
                </ListItem>
            </div>
            <div className="pt-3">
                <ScrollToBottom className="scrollToBottom">
                    {listMessage.map((message, index) => (
                        userData?.id !== message.userSend?.id ? (
                            <div className="flex items-end gap-2 max-w-xs pb-2.5 ml-2.5"
                                 key={index}>
                                <img
                                    draggable="false"
                                    className="w-8 h-8 rounded-full object-cover mb-1.5"
                                    src={message.userSend.avatar}
                                    alt="avatar"
                                />
                                <span
                                    className="px-4 py-3 text-sm bg-gray-200 rounded-3xl max-w-xs overflow-hidden">
                   {message.content}
                  </span>
                            </div>
                        ) : (
                            <div className="flex gap-2 pb-2.5 justify-end mr-2.5"
                                 key={index}>
                   <span className="px-4 py-3 text-sm bg-gray-200 rounded-3xl max-w-xs overflow-hidden">
                     {message.content}
                   </span>
                                {/*<img*/}
                                {/*    draggable="false"*/}
                                {/*    className="w-8 h-8 rounded-full object-cover mt-1.5"*/}
                                {/*    src={message.userSend.avatar}*/}
                                {/*    alt="avatar"*/}
                                {/*/>*/}
                            </div>
                        )
                    ))}
                </ScrollToBottom>
                <div style={{ height: 20}}><span></span></div>
                <div className="rounded-3xl border-solid border-2"
                     style={{height: 45, backgroundColor: "#1c1a1a", borderColor: "yellow"}}>
                    {/*<div className="epr-emoji-category-content">*/}
                    {/*    {showIcon&&*/}
                    {/*        <Picker onEmojiClick={( emoji, event) => handleEmojiClick(event, emojis)} />*/}
                    {/*    }*/}
                        <AddReactionIcon onClick={handelShowIcon} className="ml-3 mr-2.5" style={{height: 30, width: 30, color: "yellow"}} />
                    {/*</div>*/}
                    <input className="h-8 w-5/6 mr-2 focus:outline-none"
                           style={{marginTop: "5px"}}
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           onKeyUp={(e) => {
                               if (e.keyCode === 13) {
                                   e.preventDefault();
                                   handleSendMessage();
                               }
                           }}/>
                    <Button variant="contained" style={{marginBottom: 5, marginLeft: 6, backgroundColor: "yellow", color: "blue"}} endIcon={<SendIcon/>} onClick={handleSendMessage}/>
                </div>
            </div>
        </>
    )
}