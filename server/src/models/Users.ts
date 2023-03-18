import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    OneToMany,
    ManyToMany, JoinTable
} from "typeorm"
import { Rooms } from "./Rooms";
import {Relationships} from "./Relationships";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column(
        {type: "varchar",
            default: "https://taytou.com/wp-content/uploads/2022/06/anh-dai-dien-dep-cho-nam-ngau-avatar-mat-deo-kinh-hai-huoc.jpg"
        })
    avatar: string;

    @Column({type: "boolean", default: true})
    online: boolean;

    @Column({type: "timestamp", nullable: true})
    lastActivity: Date;

    @OneToMany(() => Relationships, (relationship) => relationship.user)
    follow: Relationships[];

    @OneToMany(() => Relationships, (relationship) => relationship.object)


    @ManyToMany(() => Rooms, (room) => room.member)
    rooms: Rooms[];
}