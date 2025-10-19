import { Server } from "socket.io"

const ChatSocket = (io: Server) => {
    io.on('connection', (socket) => {
        socket.on('message', (payload) => {
            io.to(payload.to).emit('message', {
                from: payload.from,
                message: payload.message
            })
        })
    })
}

export default ChatSocket