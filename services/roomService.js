const { Room } = require("../db/mongo-schema")

module.exports.createRoom = async ({roomId, userName}) => {
  // check if room already exists
  const room = await Room.findOne({
    roomId
  });
  if(room) {
    await this.joinRoom({roomId, userName});
    return { status: 200, message: 'Room already exists. Joined room successfully'}
  }
  await Room.create({roomId, userName});
  return { status: 201, message: 'Room created successfully' };
}

module.exports.joinRoom = async ({roomId, userName}) => {
  const room = await Room.findOne({roomId});
  if (!room) {
    return { status: 404, message: 'Room not found' };
  }

  if (!room.users.includes(userName)) {
    await Room.updateOne({ roomId }, { $push: { users: userName } });
  } else {
    return { status: 400, message: `User ${userName} is already in the room` };
  }
  
  return {status: 201, message: `Joined room ${roomId}`}
}

module.exports.leaveRoom = async ({roomId, userName}) => {
  const room = await Room.findOne({roomId});
  if (!room) {
    return { status: 404, message: 'Room not found' };
  }
  await Room.updateOne({roomId}, { $pull: { users: userName } });
  return { status: 200, message: `Left room ${roomId}` };
}

module.exports.getRoomUsers = async ({roomId}) => {
  const room = await Room.findOne({roomId});
  if (!room) {
    return { status: 404, message: 'Room not found' };
  }
  return { status: 200, users: room.users };
}