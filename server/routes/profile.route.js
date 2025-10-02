const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Profile = require('../models/profile.model.js');
const router = express.Router();

router.get('/me', verifyToken, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found for this user.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'Freelancer') {
        return res.status(403).json({ message: 'Only Freelancers can create a profile.' });
    }
    const { headline, bio, skills, portfolioLinks, hourlyRate } = req.body;
    const profileFields = {
        user: req.user.id,
        headline,
        bio,
        skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
        portfolioLinks: Array.isArray(portfolioLinks) ? portfolioLinks : portfolioLinks.split(',').map(link => link.trim()),
        hourlyRate
    };
    try {
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
});

module.exports = router;

