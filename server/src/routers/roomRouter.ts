import RoomController from "../controllers/Room.controller";
import { Router } from "express";
export const roomRouter = Router();

roomRouter.post("/", RoomController.createRoom)
roomRouter.post("/group", RoomController.createGroup)
roomRouter.put("/group", RoomController.addUser)
roomRouter.get("/", RoomController.getList)
roomRouter.get("/1/:id", RoomController.getDataRoom)