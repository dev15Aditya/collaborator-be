const { createmessage } = require('../services/messageService');
const corsConfig = require('../utils/corsConfig');

function connectSocket(server){
    const io = require('socket.io')(server, {
        cors: corsConfig,
        transport: ['websocket']
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Join a public or private room
        socket.on('room:join', async ({roomId, userId}) => {
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);

            // Notify other users in the room
            socket.to(roomId).emit('room:user_joined', {userId});
        });

        // Leave a room
        socket.on('room:leave', ({roomId, userId}) => {
            socket.leave(roomId);
            console.log(`User ${userId} left room ${roomId}`);

            // Notify other users in the room
            socket.to(roomId).emit('room:user_left', {userId});
        });

        // Send message in a room
        socket.on('message:send', async ({roomId, senderId, content}) => {
            const timestamp = new Date();

            const message = createmessage({roomId, senderId, content, timestamp});

            // Emit message to other users in the room
            io.to(roomId).emit('message:receive', {
                roomId,
                senderId,
                content,
                timestamp: message.timestamp
            })
        })

    })
}

module.exports = connectSocket;