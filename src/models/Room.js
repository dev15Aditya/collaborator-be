const { default: mongoose } = require('mongoose');

const room = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['public', 'private'],
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', room);
