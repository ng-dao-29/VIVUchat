import {AppDataSource} from "../database/data-source";
import { Rooms } from "../models/Rooms";
import { Users } from "../models/Users";
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
        console.log(req.body)
        let user = req.user;
            let userChat = await userRepository.findOneBy({
                id: req.body.userId[0],
            });
            let roomName = user.id + ":" + userChat.id;
        let newRoom = new Rooms();
            newRoom.name = roomName;
            newRoom.member = [user, userChat];
        let newRoomData = await roomRepository.save(newRoom);
        if (newRoomData) {
            return newRoomData;
        }
    }

    async getList(req) {
        let dataUser = await userRepository.findOne({
            relations: {
                rooms: {
                    member: true,
                    messages: true
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
            relations: {
                member: true,
                messages: {
                    userSend: true,
                }
            },
            where: {
                id: req.params.id
            }
        });
        return dataRoom;
    }
}

export default new RoomService();