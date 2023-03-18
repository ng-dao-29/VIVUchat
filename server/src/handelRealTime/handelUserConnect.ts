import {AppDataSource} from "../database/data-source";
import { Users } from "../models/Users";
const userRepository = AppDataSource.getRepository(Users);

module.exports = (io, socket, onlineUser) => {

    const setupConnect = async (idUser) => {
        try {
            const userOff = await userRepository.findOneBy({id: idUser})
            userOff.online = true;
            await userRepository.save(userOff);
            onlineUser.set(idUser, socket.id)
            socket.userId = idUser;
            io.emit("operationHandling");
        } catch (e) {
            io.emit("operationHandling");
            onlineUser.set(idUser, socket.id)
            socket.userId = idUser;
        }
    };

    const handleLogout = async (user) => {
            onlineUser.delete(user.id)
    }

    const handleDisconnect = async () => {
        try {
            const userOff = await userRepository.findOneBy({id: socket.userId})
            userOff.online = false;
            await userRepository.save(userOff);
            onlineUser.delete(socket.userId)
            io.emit("operationHandling");
        } catch (err) {
            io.emit("operationHandling");
            onlineUser.delete(socket.userId)
        }
    }

    socket.on('setUpUser', setupConnect)
    socket.on("logout", handleLogout)
    socket.on("disconnect", handleDisconnect)
}
