const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const User = require('../models/user.model.js');
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
router.get('/freelancers', async (req, res) => {
    try {
        // Find all profiles and populate the 'user' field with their username and role
        const profiles = await Profile.find({}).populate('user', 'username role');
        
        // Filter out any profiles where the user might not be a freelancer (optional safeguard)
        const freelancerProfiles = profiles.filter(p => p.user && p.user.role === 'Freelancer');
        
        res.status(200).json(freelancerProfiles);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching freelancers." });
    }
});

module.exports = router;

