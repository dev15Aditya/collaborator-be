const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Update the CORS configuration
const io = new Server(server, {
  cors: {
    origin: "https://collaborator-gold.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(cors({
  origin: "https://collaborator-gold.vercel.app",
  credentials: true
}));

app.use(express.json());

// function to generate a unique ID
function generateUniqueId() {
  // random 16-character hexadecimal string
  const uniqueId = Math.random().toString(16).slice(2, 18);

  // Ensure uniqueness by checking against a global set of generated IDs
  const generatedIds = new Set();
  if (generatedIds.has(uniqueId)) {
    return generateUniqueId();
  } else {
    generatedIds.add(uniqueId);
    return uniqueId;
  }
}

// In-memory storage for whiteboards
const whiteboards = new Map();

// Endpoint to create a new room
app.post('/create-room', (req, res) => {
  const roomId = generateUniqueId();
  whiteboards.set(roomId, []);
  res.json({ roomId });
})

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (roomId) => {
    if(!whiteboards.has(roomId)) {
      whiteboards.set(roomId, []);
    }

    socket.join(roomId);
    console.log(`Client joined room: ${roomId}`);

    // Send current whiteboard state to the client
    const currentState = whiteboards.get(roomId) || [];
    socket.emit('initialState', currentState);
  });

  socket.on('drawAction', (action) => {
    const roomId = Array.from(socket.rooms)[1]; // Get the room ID
    if (!roomId) return;

    // Update the whiteboard state
    const currentState = whiteboards.get(roomId) || [];
    currentState.push(action);
    whiteboards.set(roomId, currentState);

    // Broadcast the action to all clients in the room except the sender
    socket.to(roomId).emit('drawAction', action);
  });

  socket.on('undo', (actionId) => {
    const roomId = Array.from(socket.rooms)[1];
    if (!roomId) return;

    const currentState = whiteboards.get(roomId) || [];
    const updatedState = currentState.filter(action => action.id !== actionId);
    whiteboards.set(roomId, updatedState);

    // Broadcast the undo action to all clients in the room
    io.to(roomId).emit('undo', actionId);
  });

  socket.on('redo', (action) => {
    const roomId = Array.from(socket.rooms)[1];
    if (!roomId) return;

    const currentState = whiteboards.get(roomId) || [];
    currentState.push(action);
    whiteboards.set(roomId, currentState);

    // Broadcast the redo action to all clients in the room
    io.to(roomId).emit('redo', action);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));