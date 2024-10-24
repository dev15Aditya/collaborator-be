const { createRoom, getRoomUsers, joinRoom, leaveRoom } = require("../services/roomService.js");

module.exports.createRoomController = async (req, res) => {
    const { roomId, userName } = req.body;
    const response = await createRoom({ roomId, userName });
    res.status(response.status).send(response.message);
}

module.exports.joinRoomController = async (req, res) => {
    const { roomId, userName } = req.body;
    const response = await joinRoom({ roomId, userName });
    res.status(response.status).send(response.message);
}

module.exports.leaveRoomController = async (req, res) => {
    const { roomId, userName } = req.body;
    const response = await leaveRoom({ roomId, userName });
    res.status(response.status).send(response.message);
}

module.exports.getRoomUsersController = async (req, res) => {
    const { roomId } = req.params;
    const response = await getRoomUsers({ roomId });
    res.status(response.status).send(response.users);
}