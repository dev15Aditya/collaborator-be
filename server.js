const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const socketHandler = require('./sockets/socketHandler');

const server = http.createServer(app);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://collaborator-gold.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Initialize Socket.io handlers
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
