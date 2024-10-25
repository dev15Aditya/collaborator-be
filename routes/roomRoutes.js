const express = require('express');
const { createRoomController, joinRoomController, leaveRoomController, getRoomUsersController } = require('../controllers/roomController');

const router = express.Router();

router.post('/create', createRoomController);
router.post('/join', joinRoomController);
router.post('/leave', leaveRoomController);
router.get('/:roomId/users', getRoomUsersController);

module.exports = router;