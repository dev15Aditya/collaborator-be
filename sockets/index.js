const roomSocketHandlers = require('./roomSocketHandlers');
const drawSocketHandlers = require('./drawSocketHandlers');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client ID', socket.id);
    console.log('New client connected');
    roomSocketHandlers(socket, io);
    drawSocketHandlers(socket, io);
  });
};
