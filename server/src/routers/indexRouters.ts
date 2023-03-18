import { userRouter } from "../routers/userRouter";
import { authRouter } from "../routers/authRouter";
import { auth } from "../middlewares/authJWT";
import { roomRouter } from "../routers/roomRouter";
import { messageRouter } from "./messageRouter";
function routers(app) {
    app.use("/auth",authRouter)
    app.use(auth)
    app.use("/user",userRouter)
    app.use("/chat", roomRouter)
    app.use("/message",messageRouter)
}
export default routers;