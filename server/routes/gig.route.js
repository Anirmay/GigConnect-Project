const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Gig = require('../models/gig.model.js');
const router = express.Router();

// CREATE A NEW GIG
router.post('/create', verifyToken, async (req, res) => {
    // ... your existing create gig code (no changes)
});

// GET GIGS (with search)
router.get('/', async (req, res) => {
    // ... your existing get all gigs code (no changes)
});

// GET A SINGLE GIG BY ID
router.get('/:id', async (req, res) => {
    // ... your existing get single gig code (no changes)
});

// --- NEW: GET GIGS FOR THE CURRENT LOGGED-IN USER ---
router.get('/user/my-gigs', verifyToken, async (req, res) => {
    try {
        const gigs = await Gig.find({ userRef: req.user.id });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching user gigs.' });
    }
});

// --- NEW: DELETE A GIG ---
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return res.status(404).json({ message: 'Gig not found.' });
        if (gig.userRef.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own gigs.' });
        }
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Gig has been deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting gig.' });
    }
});

module.exports = router;

