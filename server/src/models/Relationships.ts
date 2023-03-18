import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToOne
} from "typeorm"

import { Users } from "./Users";

@Entity()
export class Relationships {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.follow)
    user: Users;

    @ManyToOne(() => Users, (user) => user.followers)
    object: Users;

    @Column({type: "enum", enum: ["friend", "block", "waiting"]})
    information: string

    @OneToOne(() => Users)
    @JoinColumn()
    proactive: Users;
}