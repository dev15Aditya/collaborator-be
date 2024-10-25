
function setupWhiteboardSockets(io) {
  io.on('connection', (socket) => {
    let currRoom = null;

    socket.on('join-room', async ({roomId, username}) => {
      try{
        if(currRoom) {
          socket.leave(currRoom);
        }

        socket.join(roomId);
        currRoom = roomId;

        const room = await whiteboardService.getOrCreateRoom(roomId);

        // Send initial state
        socket.emit('room-joined', {
          snapshot: room.getCurrentSnapshot(),
        });

        // Handle updates from this client
        socket.on('update', (update) => {
          room.handleUpdate(update);
          // Broadcast to other clients in the room
          socket.to(roomId).emit('update', update);
        });
      } catch(error) {
        console.error(error);
      }
    })

    socket.on('disconnect', () => {
      if (currRoom) {
        socket.leave(currRoom);
      }
    });
  })
}

module.exports = setupWhiteboardSockets;