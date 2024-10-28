const { createRoom, fetchPublicRooms, fetchPrivateRoomByUsers, joinRoom, leaveRoom } = require("../services/roomService");

module.exports.createRoomController = async (req, res) => {
    try{
        const { roomId, type } = req.body;
        const response = await createRoom({ roomId, type });
        return res.status(response.status).json({ message: response.message, roomId: response.roomId });
    }
    catch(error){
        return res.status(500).json({ message: 'Error creating room', error: error.message });
    }
}

module.exports.fetchPublicRoomsController = async (req, res) => {
    try{
        const response = await fetchPublicRooms();
        return res.status(response.status).json(response.publicRooms);
    }
    catch(error){
        return res.status(500).json({ message: 'Error fetching public rooms', error: error.message });
    }
}

module.exports.fetchPrivateRoomByUsersController = async (req, res) => {
    try{
        const { user1, user2 } = req.body;
        const response = await fetchPrivateRoomByUsers(user1, user2);
        return res.status(response.status).json(response.privateRoom);
    }
    catch(error){
        return res.status(500).json({ message: 'Error fetching private room', error: error.message });
    }
}

module.exports.joinRoomController = async (req, res) => {
    try{
        const { userId, roomId } = req.body;
        const response = await joinRoom(userId, roomId);
        return res.status(response.status).json({ message: response.message });
    }
    catch(error){
        return res.status(500).json({ message: 'Error joining room', error: error.message });
    }
}

module.exports.leaveRoomController = async (req, res) => {
    try{
        const { userId, roomId } = req.body;
        const response = await leaveRoom(userId, roomId);
        return res.status(response.status).json({ message: response.message });
    }
    catch(error){
        return res.status(500).json({ message: 'Error leaving room', error: error.message });
    }
}