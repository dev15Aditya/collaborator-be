const http = require('http');
const app = require('./app');
const connectDB = require('./db/mongoConnection');
const { Server } = require('socket.io');
const { Room } = require('./db/mongo-schema');

connectDB();

// Create HTTP server
const server = http.createServer(app);

// Create socket server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        // origin: 'https://collabx-red.vercel.app',
        methods: ["GET", "POST"]
    },
    transports: ['websocket']
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    console.log("Socket ", socket.id)
    socket.on('send_message', async (message) => {
        console.log('Message: ', message);
        io.emit('receive_message', message);
        const { roomId, sender, content } = message;
        // Save message to database
        try {
            // Find the room by `roomId` or create a new one if it doesn’t exist
            let room = await Room.findOne({ roomId: roomId });

            // Add the new message to the room’s messages array
            room.messages.push({
                content: message.content,
                sender: message.sender,
                timestamp: message.timestamp
            });

            // Save the room with the new message
            await room.save();
            console.log('Message saved to room:', message.roomId);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
