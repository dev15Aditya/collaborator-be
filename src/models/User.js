const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  onlineStatus: {
    type: Boolean,
    default: false,
  },
  room: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
