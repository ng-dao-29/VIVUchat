import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Users } from "./Users";
import { Rooms } from "./Rooms";

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Rooms, (room) => room)
    room: Rooms;

    @ManyToOne(() => Users, (user) => user)
    userSend: Users;

    @Column({type: "mediumtext"})
    content: string;

    @Column({
        type: "timestamp",
        default: () => "now()",
    })
    time: Date;
}