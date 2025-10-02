const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const User = require('../models/user.model.js');
const router = express.Router();

// GET ALL USERS (except the logged-in user)
router.get('/', verifyToken, async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        // Find all users ($ne: not equal) except for the one who is logged in
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching users." });
    }
});

module.exports = router;
