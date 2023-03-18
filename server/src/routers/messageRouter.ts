import MessageController from "../controllers/Message.controller";
import { Router } from "express";
export const messageRouter = Router();

messageRouter.post("/", MessageController.createMessage);
messageRouter.get("/:chatId", MessageController.getMessage)