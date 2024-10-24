const mongoose = require('mongoose');

const room = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  users: [{
    type: String,
    required: true
  }]
})

const chatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const whiteboardSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
})

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  }
})

exports.Chat = mongoose.model('Chat', chatSchema);
exports.Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);
exports.User = mongoose.model('User', userSchema);
exports.Room = mongoose.model('Room', room);