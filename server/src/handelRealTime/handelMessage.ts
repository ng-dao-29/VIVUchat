
module.exports = (io,socket, onlineUser) => {
    const sendMessage = (newMessage, receiver) => {
        let userSocketIds = []
        receiver.forEach((idUser) => {
            let userSocketId = onlineUser.get(idUser);
            if (userSocketId) {
                userSocketIds.push(userSocketId)
            }
        })
        socket.broadcast.to(userSocketIds).emit("newMessage", newMessage)

    }

    const newChat = (dataChat, member, userSend) => {
        let userSocketIds = []
        member.forEach((idUser) => {
            let userSocketId = onlineUser.get(idUser);
            if (userSocketId) {
                userSocketIds.push(userSocketId)
            }
        });
        let avatar = [userSend.avatar]
        dataChat.name = userSend.name;
        dataChat.avatar = avatar;
        socket.broadcast.to(userSocketIds).emit("newChat", dataChat)
    };

    socket.on("sendMessage", sendMessage);
    socket.on("newChat", newChat);
}