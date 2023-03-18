import RoomService from "../services/RoomService";
import {Rooms} from "../models/Rooms";

class RoomController {

    async createRoom(req, res) {
        try {
            if (req.body.userId.length === 1) {
                let checkRoom = await RoomService.checkRoom(req);
                if (checkRoom) {
                    let members = []
                    let chatData = new Rooms();
                    checkRoom.member.forEach((member) => {
                        if (member.id !== req.user.id) {
                            chatData.id = checkRoom.id;
                            chatData.name = member.name;
                            chatData.avatar = member.avatar;
                            chatData.online = member.online;
                            chatData.lastActivity = member.lastActivity
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
                    newRoom.member.forEach((member) => {
                        if (member.id !== req.user.id) {
                            chatData.id = newRoom.id;
                            chatData.name = member.name;
                            chatData.avatar = member.avatar;
                            chatData.online = member.online;
                            chatData.lastActivity = member.lastActivity
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
            let listChat = []
            listRoom.forEach(chat => {
                    if (!chat.isGroup) {
                        if (chat.messages.length > 0) {
                            chat.member.forEach((member) => {
                                if (member.id !== req.user.id) {
                                    let chatData = new Rooms();
                                    chatData.id = chat.id;
                                    chatData.name = member.name;
                                    chatData.avatar = member.avatar;
                                    chatData.online = member.online;
                                    chatData.lastActivity = member.lastActivity
                                    listChat.push(chatData)
                                }
                            })
                        }
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
            let members = []
            if (!dataRoom.isGroup) {
                dataRoom.member.forEach((member) => {
                    if (req.user.id !== member.id) {
                        data.id = dataRoom.id;
                        data.name = member.name;
                        data.avatar = member.avatar;
                        data.online = member.online
                        data.lastActivity = member.lastActivity
                        members.push(member.id)
                    }
                })
                data.member = members
            }
            res.status(200).json({
                success: true,
                message: null,
                data: data
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