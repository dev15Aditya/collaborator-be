const express = require('express');
const http = require('http');
const cors = require('cors');

const connectDB = require('./config/db');
const connectSocket = require('./config/socket')

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messageRoutes = require('./routes/messageRoutes');

const corsConfig = require('./utils/corsConfig');

const app = express();

app.use(cors(corsConfig));
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/message', messageRoutes)

connectDB();

const server = http.createServer(app);
connectSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
})