import {AppDataSource} from "../database/data-source";
import { Rooms } from "../models/Rooms";
import { Users } from "../models/Users";
import { Messages } from "../models/Messages";
import { NewMessagers } from "../models/NewMessagers";
const NewMessageRepository = AppDataSource.getRepository(NewMessagers);

class UnreadMessagesService {
    async create(members, room) {
        let newData = new NewMessagers();
        newData.user = members
        newData.rooms = room
        let data = await NewMessageRepository.save(newData)
        return data
    }

    async addNewMessage (room) {
        try {
            await NewMessageRepository
                .createQueryBuilder()
                .update(NewMessagers)
                .set({
                    newMessage: () => "newMessage + 1",
                })
                .where("rooms = :rooms", { rooms: room })
                .execute()
        } catch (e) {

        }
    }

    async clean(userId, roomId) {
        try {
            await NewMessageRepository
                .createQueryBuilder()
                .update(NewMessagers)
                .set({
                    newMessage: 0,
                })
                .where("roomsId = :roomsId", { roomsId: roomId })
                .andWhere("userId = :userId", { userId: userId})
                .execute()
        } catch (e) {
        }
    }

}

export default new UnreadMessagesService()