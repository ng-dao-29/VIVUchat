import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToMany,
    JoinColumn,
    OneToMany,
    JoinTable,
} from "typeorm";

import { Users } from "./Users";
import { Messages } from "./Messages";
import { UsersInRooms} from "./UsersInRooms";

@Entity()
export class Rooms{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "boolean", default: false})
    isGroup: boolean;

    @Column({type: "varchar", nullable: true})
    name: string;

    @OneToOne(() => Users, (user) => user)
    @JoinColumn()
    owner: Users;

    @ManyToMany(() => Users, (user) => user.rooms)
    @JoinTable({name: "Users join Rooms"})
    member: Users[];

    @Column({type: "boolean", nullable: true})
    online: boolean;

    @Column({type: "varchar"})
    avatar: any;

    @OneToMany(() => Messages, (message) => message.room)
    messages: Messages[];

    @Column({type: "timestamp", nullable: true})
    lastActivity: Date;

    // @OneToMany(() => UsersInRooms, (userInRoom) => userInRoom.rooms)
    // userInRoom: UsersInRooms[];
}