import UserController from "../controllers/User.controller";
import {Router} from "express";
export const userRouter = Router()

userRouter.get("/", UserController.searchUser)
userRouter.get("/1", UserController.getUser)
