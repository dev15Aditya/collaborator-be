const Room = require("../models/Room");

module.exports.createRoom = async ({ roomId, type }) => {
    try{
        const existingRoom = await Room.findOne({roomId});

        if(existingRoom){
            return { status: 400, message: 'Room already exists' };
        }

        const newRoom = await Room.create({
            roomId,
            type,
            users: [],
            messages: []
        })

        return { status: 201, message: 'Room created successfully', roomId: newRoom._id };
    }
    catch(error){
        return { status: 500, message: 'Error creating room', error: error.message };
    }
}

module.exports.fetchPublicRooms = async () => {
    try{
        const publicRooms = await Room.find({type: 'public'}).populate('users', 'userName');
        return { status: 200, publicRooms };
    }
    catch(error){
        return { status: 500, message: 'Error fetching public rooms', error: error.message };
    }
}

// Retrieve 1:1 private chat room by user.
module.exports.fetchPrivateRoomByUsers = async (user1, user2) => {
    try{
        const privateRoom = await Room.findOne({
            type: 'private',
            users: { $all: [user1, user2] }
        }).populate('users', 'userName');
        return { status: 200, privateRoom };
    }
    catch(error){
        return { status: 500, message: 'Error fetching private room', error: error.message };
    }
}

// Join a user to a room
module.exports.joinRoom = async (userId, roomId) => {
    try{
        const room = await Room.findById(roomId);
        if(!room){
            return { status: 404, message: 'Room not found' };
        }

        if(room.users.includes(userId)){
            return { status: 400, message: 'User already in room' };
        }

        room.users.push(userId);
        await room.save();

        return { status: 200, message: 'User joined room successfully' };
    }
    catch(error){
        return { status: 500, message: 'Error joining room', error: error.message };
    }
}

// remove a user from a room
module.exports.leaveRoom = async (userId, roomId) => {
    try{
        const room = await Room.findById(roomId);
        if(!room){
            return { status: 404, message: 'Room not found' };
        }

        if(!room.users.includes(userId)){
            return { status: 400, message: 'User not in room' };
        }

        room.users = room.users.filter(user => user.toString() !== userId);
        await room.save();

        return { status: 200, message: 'User left room successfully' };
    }
    catch(error){
        return { status: 500, message: 'Error leaving room', error: error.message };
    }
}