const RoomController = require('../controllers/roomController');

module.exports = (socket, io) => {
  socket.on('drawAction', async (action) => {
    const roomId = Array.from(socket.rooms)[1];
    if (!roomId) return;

    try {
      await RoomController.saveAction(roomId, action);
      io.to(roomId).emit('drawAction', action);
    } catch (error) {
      console.error('Error in drawAction:', error);
    }
  });

  socket.on('undo', async (actionId) => {
    const roomId = Array.from(socket.rooms)[1];
    if (!roomId) return;

    try {
      await RoomController.removeAction(roomId, actionId);
      io.to(roomId).emit('undo', actionId);
    } catch (error) {
      console.error('Error in undo:', error);
    }
  });

  socket.on('redo', async (action) => {
    const roomId = Array.from(socket.rooms)[1];
    if (!roomId) return;

    try {
      await RoomController.saveAction(roomId, action);
      io.to(roomId).emit('redo', action);
    } catch (error) {
      console.error('Error in redo:', error);
    }
  });
};
