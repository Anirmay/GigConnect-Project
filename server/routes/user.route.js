const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const User = require("../models/user.model.js");
const Profile = require('../models/profile.model.js'); // Import the Profile model
const router = express.Router();

// GET ALL USERS (for chat)
router.get('/', verifyToken, async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching users." });
    }
});

// --- UPDATED: GET ALL FREELANCERS WITH THEIR PROFILES ---
router.get("/freelancers", async (req, res) => {
  try {
    const freelancers = await User.find({ role: "freelancer" }).select("-password");
    res.status(200).json(freelancers);
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    res.status(500).json({ message: "Server error fetching freelancers." });
  }
});

module.exports = router;

