const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Profile = require('../models/profile.model.js');
const router = express.Router();

// GET CURRENT USER'S PROFILE (Protected Route)
router.get('/me', verifyToken, async (req, res) => {
    try {
        // Find the profile linked to the logged-in user's ID
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
        
        if (!profile) {
            // It's not an error if a new user doesn't have a profile yet
            return res.status(404).json({ message: 'Profile not found for this user.' });
        }
        
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
});

// CREATE OR UPDATE PROFILE (Protected Route)
router.post('/', verifyToken, async (req, res) => {
    // Only users with the 'Freelancer' role can create or update a profile
    if (req.user.role !== 'Freelancer') {
        return res.status(403).json({ message: 'Only Freelancers can create a profile.' });
    }

    const { headline, bio, skills, portfolioLinks, hourlyRate } = req.body;
    
    // Prepare the fields to be saved in the database
    const profileFields = {
        user: req.user.id,
        headline,
        bio,
        // Convert comma-separated strings from the form into arrays
        skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
        portfolioLinks: Array.isArray(portfolioLinks) ? portfolioLinks : portfolioLinks.split(',').map(link => link.trim()),
        hourlyRate
    };

    try {
        // Find the profile by the user ID and update it.
        // If it doesn't exist, 'upsert: true' will create it.
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
});

module.exports = router;

