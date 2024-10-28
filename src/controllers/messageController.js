const { createmessage, fetchMessageByRoom } = require("../services/messageService");

module.exports.createMessageController = async (req, res) => {
    try{
        const { roomId, sender, content } = req.body;
        const message = await createmessage({ roomId, sender, content });
        return res.status(201).json({ success: true, message });
    }
    catch(error){
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports.fetchMessageController = async (req, res) => {
    try{
        const { roomId } = req.params;
        const messages = await fetchMessageByRoom(roomId);
        return res.status(200).json({success: true, messages});
    }
    catch(error){
        return res.status(500).json({ success: false, error: error.message });
    }
}