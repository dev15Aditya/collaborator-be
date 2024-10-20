const whiteboardService = require('../services/whiteboardService');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (roomId) => {
      if (!whiteboardService.getWhiteboardState(roomId).length) {
        whiteboardService.createRoom(roomId);
      }

      socket.join(roomId);
      console.log(`Client joined room: ${roomId}`);

      const currentState = whiteboardService.getWhiteboardState(roomId);
      socket.emit('initialState', currentState);
    });

    socket.on('drawAction', (action) => {
      const roomId = Array.from(socket.rooms)[1];
      if (!roomId) return;

      whiteboardService.updateWhiteboardState(roomId, action);
      socket.to(roomId).emit('drawAction', action);
    });

    socket.on('undo', (actionId) => {
      const roomId = Array.from(socket.rooms)[1];
      if (!roomId) return;

      whiteboardService.undoAction(roomId, actionId);
      io.to(roomId).emit('undo', actionId);
    });

    socket.on('redo', (action) => {
      const roomId = Array.from(socket.rooms)[1];
      if (!roomId) return;

      whiteboardService.redoAction(roomId, action);
      io.to(roomId).emit('redo', action);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
