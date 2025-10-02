const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Conversation = require('../models/conversation.model.js');
const Message = require('../models/message.model.js');
const router = express.Router();

// SEND A MESSAGE
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

        // --- REAL-TIME LOGIC ---
        const receiverSocketId = req.getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // If the receiver is online, send the message to them directly
            req.io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET MESSAGES BETWEEN TWO USERS
router.get('/:id', verifyToken, async (req, res) => {
    // ... your existing code to get messages ...
});

module.exports = router;

