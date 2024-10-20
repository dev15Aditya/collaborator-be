const express = require('express');
const router = express.Router();
const whiteboardService = require('../services/whiteboardService');

// Create a new room
router.post('/', (req, res) => {
  const roomId = whiteboardService.createRoom();
  res.json({ roomId });
});

module.exports = router;
