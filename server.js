const http = require('http');
const app = require('./app');
const connectDB = require('./db/mongoConnection');
const { Server } = require('socket.io');
const setupWhiteboardSockets = require('./sockets/whiteboardSocket');
const corsConfig = require('./utils/corsConfig');


connectDB();

// Create HTTP server
const server = http.createServer(app);

// Create socket server
const io = new Server(server, {
    cors: {
        origin: 'https://collabx-red.vercel.app/',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    console.log("Socket ", socket.id)
    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
