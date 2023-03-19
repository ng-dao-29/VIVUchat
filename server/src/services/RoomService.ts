import {AppDataSource} from "../database/data-source";
import {Rooms} from "../models/Rooms";
import {Users} from "../models/Users";

const roomRepository = AppDataSource.getRepository(Rooms);
const userRepository = AppDataSource.getRepository(Users);

class RoomService {

    async checkId(req) {
        let dataRoom = await roomRepository.findOne({
            relations: {
                member: true,
                messages: true
            },
            where: {
                id: req.body.roomId,
            }
        });
        return dataRoom;
    }

    async checkRoom(req) {
        let user = req.user;
        let userChat = await userRepository.findOneBy({
            id: req.body.userId[0]
        })
        let roomName = user.id + ":" + userChat.id;
        let dataChat = await roomRepository.find({
            relations: {
                newMessage: {
                    user: true
                },
                member: true
            },
            where: {
                name: roomName
            }
        })
        if (dataChat.length < 1) {
            roomName = userChat.id + ":" + user.id;
            dataChat = await roomRepository.find({
                relations: {
                    newMessage: true,
                    member: true,
                },
                where: {
                    name: roomName
                },
            });
        }
        if (dataChat.length < 1) {
            return null
        } else {
            return dataChat[0]
        }
    }

    async createRoomprivate(req) {
        let user = req.user;
        let userChat = await userRepository.findOneBy({
            id: req.body.userId[0],
        });
        console.log(userChat)
        let roomName = user.id + ":" + userChat.id;
        let newRoom = new Rooms();
        newRoom.name = roomName;
        newRoom.member = [user, userChat];
        let newRoomData = await roomRepository.save(newRoom);
        if (newRoomData) {
            return newRoomData;
        }
    }

    async CreateRoomGroup(req) {
        let avatar = [];
        let user = req.user;
        let online = false
        const {listUsersId, nameGroup} = req.body;
        let listUser = [user]
        for (let i = 0; i < listUsersId.length; i++) {
            let userChat = await userRepository.findOneBy({
                id: listUsersId[i],
            });
            if (userChat) {
                if (userChat.online) {
                    online = true
                }
                avatar.push(userChat.avatar)
                listUser.push(userChat)
            }
        }
        let newRoom = new Rooms();
        newRoom.name = nameGroup;
        newRoom.member = listUser;
        newRoom.isGroup = true;
        newRoom.owner = user;
        let newRoomData = await roomRepository.save(newRoom);
        if (newRoomData) {
            newRoomData.online = online
            newRoomData.avatar = avatar
            return newRoomData;
        }
    }

    async getList(req) {

        let dataUser = await userRepository.findOne({
            relations: {
                rooms: {
                    newMessage: {
                        user: true
                    },
                    member: true,
                    messages: true,
                    owner: true
                }
            },
            where: {
                id: req.user.id
            }
        })
        let listRoom = dataUser.rooms;
        return listRoom;
    };

    async getDataRoom(req) {
        let dataRoom = await roomRepository.findOne({
            select: {
                member: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    online: true,
                    lastActivity: true,
                }
            },
            relations: {
                member: true,
                messages: {
                    userSend: true,
                },
                owner: true
            },
            where: {
                id: req.params.id
            }
        });
        return dataRoom;
    }

    async addMember(req,users) {
        let chat = await roomRepository.findOne({
            relations: { member: true},
            where: {id: req.body.roomId}
        })
        users.forEach(user => {
            chat.member.push(user)
        })
         let chatUpdate = await roomRepository.save(chat)
        return chatUpdate
    }
}

export default new RoomService();