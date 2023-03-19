import express from "express";
import {Server} from "socket.io";
import bodyParser from 'body-parser';
import { AppDataSource } from "./src/database/data-source";
import routers from "./src/routers/indexRouters";
const cors = require('cors')
import * as dotenv from "dotenv";
dotenv.config();

const handleUserConnection = require("./src/handelRealTime/handelUserConnect")
const handleMessage = require("./src/handelRealTime/handelMessage")
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(express.json());

AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });

app.use(cors())
routers(app)

const server = app.listen(PORT, () => {
  console.log("App running with port: " + PORT)
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
})
export const onlineUser = new Map()

const onConnections = (socket) => {
    handleUserConnection(io,socket, onlineUser);
    handleMessage(io,socket, onlineUser);
}

io.on("connection",onConnections)