import RoomService from "../services/RoomService";
import {Rooms} from "../models/Rooms";
import roomService from "../services/RoomService";
import userService from "../services/UserService";
import unreadMessagesService from "../services/UnreadMessagesService";
class RoomController {

    async createRoom(req, res) {
        try {
            if (req.body.userId.length === 1) {
                let checkRoom = await RoomService.checkRoom(req);
                if (checkRoom) {
                    let members = []
                    let avatar = []
                    let chatData = new Rooms();
                    let unreadMessages = [];
                    for (let i = 0; i < checkRoom.newMessage.length; i++) {
                        if (checkRoom.newMessage[i].user.id === req.user.id) {
                            unreadMessages.push(checkRoom.newMessage[i])
                        }
                    }
                    checkRoom.member.forEach((member) => {
                        if (member.id !== req.user.id) {
                            avatar.push(member.avatar)
                            chatData.id = checkRoom.id;
                            chatData.name = member.name;
                            chatData.avatar = avatar;
                            chatData.online = member.online;
                            chatData.lastActivity = member.lastActivity;
                            chatData.newMessage = unreadMessages
                            members.push(member.id)
                        }
                    })
                    chatData.member = members
                    res.status(200).json({
                        success: true,
                        message: "room already exists",
                        data: chatData,
                    });
                } else {
                    let newRoom = await RoomService.createRoomprivate(req);
                    let chatData = new Rooms();
                    let members = []
                    const createUnreadMessages = async (member,newRoom, data) => {
                        let newData = await unreadMessagesService.create(member, newRoom)
                        data.push(newData)
                    }
                    newRoom.member.forEach( (member)  => {
                        let data = []
                         createUnreadMessages(member,newRoom, data)
                        if (member.id !== req.user.id) {
                            chatData.id = newRoom.id;
                            chatData.name = member.name;
                            chatData.avatar = member.avatar;
                            chatData.online = member.online;
                            chatData.lastActivity = member.lastActivity;
                            chatData.newMessage = data
                            members.push(member.id)
                        }
                    })
                    chatData.member = members
                    res.status(200).json({
                        success: true,
                        message: "create new chat successfully",
                        data: chatData,
                    })
                }
            } else {
                res.status(200).json({
                    success: true,
                    message: null,
                    data: null,
                })
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async createGroup(req, res) {
        try {
            let newGroup = await roomService.CreateRoomGroup(req);
             newGroup.member.forEach((member) => {
                unreadMessagesService.create(member, newGroup)
            })
            res.status(200).json({
                success: true,
                message: null,
                data: newGroup,
            })
        } catch (e) {
            console.log(e.message)
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async getList(req, res) {
        try {
            let listRoom = await RoomService.getList(req)
            let listChat = [];
            listRoom.forEach(chat => {
                    if (!chat.isGroup) {
                        let avatar = [];
                        let unreadMessages = [];
                        for (let i = 0; i < chat.newMessage.length; i++) {
                            if (chat.newMessage[i].user.id === req.user.id ) {
                                unreadMessages.push(chat.newMessage[i])
                                chat.newMessage = unreadMessages
                            }
                        }
                        if (chat.messages.length > 0) {
                            chat.member.forEach((member) => {
                                if (member.id !== req.user.id) {
                                    avatar.push(member.avatar)
                                    let chatData = new Rooms();
                                    chatData.id = chat.id;
                                    chatData.name = member.name;
                                    chatData.avatar = avatar;
                                    chatData.online = member.online;
                                    chatData.isGroup = chat.isGroup;
                                    chatData.lastActivity = member.lastActivity;
                                    chatData.newMessage = chat.newMessage
                                    listChat.push(chatData)
                                }
                            })
                        }
                    } else {
                        let avatar = []
                        chat.member.forEach(member => {
                            avatar.push(member.avatar)
                            if(member.id !== req.user.id) {
                            if (member.online) {
                                chat.online = true
                            }
                        }
                        })
                        chat.avatar = avatar
                        listChat.push(chat)
                    }
                }
            )
            res.status(200).json({
                success: true,
                message: null,
                data: listChat,
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async getDataRoom(req, res) {
        try {
            let dataRoom = await RoomService.getDataRoom(req);
            let data = new Rooms()
            let newMessage = []
            let members = []
            for (let i=0; i<dataRoom.newMessage.length; i++) {
                if (dataRoom.newMessage[i].user.id === req.user.id) {
                    newMessage.push(dataRoom.newMessage[i])
                }
            }
            console.log(newMessage)
            if (!dataRoom.isGroup) {
                let avatar = []
                let newMessage = []
                dataRoom.member.forEach((member) => {
                    members.push(member)
                    if (req.user.id !== member.id) {
                        avatar.push(member.avatar)
                        data.id = dataRoom.id;
                        data.name = member.name;
                        data.avatar = avatar;
                        data.online = member.online
                        data.lastActivity = member.lastActivity
                    }
                })
                data.member = members
                data.newMessage = newMessage
                console.log(data)
                res.status(200).json({
                    success: true,
                    message: null,
                    data: data
                })
            } else {
                let avatar = [];
                let newMessage = []
                for (let i=0; i<dataRoom.newMessage.length; i++) {
                    if (dataRoom.newMessage[i].user.id === req.user.id) {
                        members.push(dataRoom.newMessage[i])
                    }
                }
                dataRoom.member.forEach((member) => {
                    avatar.push(member.avatar)
                    if (req.user.id !== member.id) {
                        if (member.online) {
                            dataRoom.online = true
                        }
                    }
                })
                dataRoom.avatar = avatar;
                dataRoom.newMessage = newMessage
                res.status(200).json({
                    success: true,
                    message: null,
                    data: dataRoom
                })
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }

    async addUser(req, res) {
        try {
            let users = await userService.getUsers(req);
            let addUser = await roomService.addMember(req, users)
            res.status(200).json({
                success: true,
                message: null,
                data: addUser
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message,
                data: null
            })
        }
    }
}

export default new RoomController();