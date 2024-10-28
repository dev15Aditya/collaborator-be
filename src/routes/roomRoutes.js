const express = require('express');
const { createRoomController, fetchPublicRoomsController, fetchPrivateRoomByUsersController, joinRoomController, leaveRoomController } = require('../controllers/roomController');

const router = express.Router();

router.post('/create', createRoomController);
router.get('/fetchPublicRooms', fetchPublicRoomsController);
router.get('/fetchPrivateRoomByUsers', fetchPrivateRoomByUsersController);
router.post('/join', joinRoomController);
router.post('/leave', leaveRoomController);

module.exports = router;
