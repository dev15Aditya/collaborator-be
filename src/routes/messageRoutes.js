const express = require('express');
const { createMessageController, fetchMessageController } = require('../controllers/messageController');

const router = express.Router();

router.post('/create', createMessageController);
router.get('/fetchByRoom/:roomId', fetchMessageController);

module.exports = router;
