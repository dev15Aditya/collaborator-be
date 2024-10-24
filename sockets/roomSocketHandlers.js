const RoomController = require('../controllers/roomController');

module.exports = (socket, io) => {
  socket.on('joinRoom', async (roomId) => {
    console.log('Joining room:', roomId);
    try {
      const room = await RoomController.joinRoom(roomId.roomId);
      console.log('Room:', room);
      socket.join(roomId);
      socket.emit('initialState', room.actions);
      io.to(roomId).emit('fullSync', room.actions);
    } catch (error) {
      console.error('Error in joinRoom:', error);
    }
  });

  socket.on('disconnect', async () => {
    const rooms = Array.from(socket.rooms);
    if (rooms.length > 1) {
      const roomId = rooms[1];
      const room = await RoomController.joinRoom(roomId);
      io.to(roomId).emit('fullSync', room.actions);
    }
  });
};
