const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const User = require('../models/user.model.js');
const router = express.Router();

// GET ALL USERS (except the logged-in user) - for chat
router.get('/', verifyToken, async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching users." });
    }
});

// --- NEW: GET ALL FREELANCERS ---
router.get('/freelancers', async (req, res) => {
    try {
        // Find all users with the role 'Freelancer' and also get their profile info
        const freelancers = await User.find({ role: 'Freelancer' }).select('-password');
        // In a more advanced app, you would also populate their profile details here
        res.status(200).json(freelancers);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching freelancers." });
    }
});


module.exports = router;

