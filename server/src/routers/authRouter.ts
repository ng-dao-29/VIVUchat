import AuthController from "../controllers/Auth.controller";
import { Router} from "express"
import { auth } from "../middlewares/authJWT";

export const authRouter = Router();
authRouter.post("/",AuthController.login);
authRouter.post("/user",AuthController.createUser);
authRouter.use(auth)
authRouter.get("/", AuthController.logout)
authRouter.put("/", AuthController.UpdatePassword)