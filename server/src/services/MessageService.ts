import {AppDataSource} from "../database/data-source";
import { Rooms } from "../models/Rooms";
import { Users } from "../models/Users";
import { Messages } from "../models/Messages";
const roomRepository = AppDataSource.getRepository(Rooms);
const messageRepository = AppDataSource.getRepository(Messages);
import UnreadMessagesService from "./UnreadMessagesService";
class MessagesService {

    async create(req) {
        let newMessage = new Messages();
        newMessage.room = req.body.roomId;
        newMessage.content = req.body.content;
        newMessage.userSend = req.user;
        let dataNewMessage = await messageRepository.save(newMessage);
        await UnreadMessagesService.addNewMessage(req.body.roomId)
        return dataNewMessage;
    }

    async get(req) {
        let chatId = req.params.chatId;
        let dataRoom = await roomRepository.findOne({
            where: {
                id: chatId,
            },
            relations: {
                messages: {
                    userSend: true
                },
            },
        })

        let messages = dataRoom.messages
        return messages;
    }

    async getMessages(req) {
        let chatId = req.params.chatId;
        let messages = await messageRepository.find({
            where: {
                room: {
                    id: chatId
                }
            },
            relations: {
                room: true,
                userSend: true,
            }
        })
        return messages;
    }
}

export default new MessagesService();