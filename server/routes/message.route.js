const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Conversation = require('../models/conversation.model.js');
const Message = require('../models/message.model.js');
const router = express.Router();

router.post('/send/:id', verifyToken, async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        if (!conversation) {
            conversation = await Conversation.create({ participants: [senderId, receiverId] });
        }

        const newMessage = new Message({ senderId, receiverId, message });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = req.getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            req.io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.messages);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;