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
@Entity()
export class Rooms{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "boolean", default: false})
    isGroup: boolean;

    @Column({type: "varchar", nullable: true})
    name: string;

    // @OneToOne(() => Users, (user) => user)
    // @JoinColumn()
    // owner: Users;

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
}