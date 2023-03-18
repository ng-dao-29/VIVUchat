import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    OneToMany,
    JoinTable,
} from "typeorm";

import { Users } from "./Users";
import { Messages } from "./Messages";
import { NewMessagers} from "./NewMessagers";

@Entity()
export class Rooms{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "boolean", default: false})
    isGroup: boolean;

    @Column({type: "varchar", nullable: true})
    name: string;

    @ManyToOne(() => Users, (user) => user)
    @JoinColumn()
    owner: Users;

    @ManyToMany(() => Users, (user) => user.rooms)
    @JoinTable({name: "Users join Rooms"})
    member: Users[];

    @Column({type: "boolean", nullable: true})
    online: boolean;

    @Column({type: "varchar", nullable: true})
    avatar: any;

    @OneToMany(() => Messages, (message) => message.room)
    messages: Messages[];

    @Column({type: "timestamp", nullable: true})
    lastActivity: Date;

    @OneToMany(() => NewMessagers, (newMessage) => newMessage.rooms)
    newMessage: NewMessagers[];
}