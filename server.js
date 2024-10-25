const http = require('http');
const app = require('./app');
const connectDB = require('./db/mongoConnection');
const { Server } = require('socket.io');
const setupWhiteboardSockets = require('./sockets/whiteboardSocket');


connectDB();
// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "localhost:3000",
        methods: ["GET", "POST"]
    }
})

setupWhiteboardSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
