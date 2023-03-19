import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { Users } from "./Users";
import { Rooms } from "./Rooms";

@Entity()
export class NewMessagers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.id)
    user: Users;
    
    @ManyToOne(() => Rooms, (rooms) => rooms.newMessage)
    rooms: Rooms;

    @Column({type: "tinyint", default: 0})
    newMessage: number;
}