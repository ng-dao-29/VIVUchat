import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users";
import { Rooms } from "./Rooms";

@Entity()
export class UsersInRooms {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Users, (user) => user.userInRoom)
    // users: Users[];
    //
    // @ManyToOne(() => Rooms, (rooms) => rooms.userInRoom)
    // rooms: Rooms[];

    @Column({type: "tinyint", default: 0})
    newMessage: number;
}