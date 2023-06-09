import MessageService from "../services/messageService";
import RoomService from "../services/RoomService";
import UserService from "../services/UserService";
import UnreadMessagesService from "../services/UnreadMessagesService";

class MessageController {
    async createMessage(req, res) {
        try {
            let checkRoom = await RoomService.checkId(req);
            if (!checkRoom) {
                res.status(404).json({
                    success: false,
                    message: "chat information is incorrect!",
                    data: null
                })
            } else {
                if (checkRoom.messages.length > 0) {
                    let newMessage = await MessageService.create(req);
                    res.status(200).json({
                        success: true,
                        message: "new message",
                        data: newMessage
                    })
                } else {
                    let newMessage = await MessageService.create(req);
                    res.status(200).json({
                        success: true,
                        message: "first message",
                        data: newMessage
                    })
                }
            }
        } catch (e) {
            res.status(404).json({
                success: true,
                message: e.message,
                data: null
            })
        }
    }

    async getMessage(req, res) {
        try {
            let listMessage = await MessageService.getMessages(req);
            res.status(200).json({
                success: true,
                message: null,
                data: listMessage
            })
        } catch (e) {
            res.status(404).json({
                success: true,
                message: e.message,
                data: null
            })
        }
    }

    async readMessage(req, res) {
        try {
            let roomId = req.params.chatId;
            let user = req.user;
            let data = await UnreadMessagesService.clean(user.id, roomId);
                res.status(200).json({
                    success: true,
                    message: null,
                    data: null
                })
        } catch (e) {
            res.status(404).json({
                success: true,
                message: e.message,
                data: null
            })
        }
    }
}

export default new MessageController();