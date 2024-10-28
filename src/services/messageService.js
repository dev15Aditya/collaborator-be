const Message = require("../models/Message")

module.exports.createmessage = async (roomId, sender, content) => {
    const message = new Message({
        roomId,
        sender,
        content,
        timestamp: new Date()
    });
    
    return await message.save();
}

module.exports.fetchMessageByRoom = async (roomId) => {
    return await Message.find({roomId}).sort({timeStamp: 1});
}