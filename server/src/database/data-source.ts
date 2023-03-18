import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../models/Users";
import { Rooms } from "../models/Rooms";
import { Messages } from "../models/Messages";
import {Relationships} from "../models/Relationships";
import { UsersInRooms} from "../models/UsersInRooms";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "290429",
    database: "vivuchat",
    synchronize: false,
    logging: false,
    entities: [Users, Rooms, Messages, Relationships],
    migrations: ["dist/src/migrations/*.js"],
});