const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Gig = require('../models/gig.model.js');
const router = express.Router();

// CREATE A NEW GIG
router.post('/create', verifyToken, async (req, res) => {
    if (req.user.role.toLowerCase() !== 'client') {
        return res.status(403).json({ message: "Forbidden: Only clients can post gigs." });
    }
    try {
        const newGig = new Gig({ ...req.body, userRef: req.user.id });
        await newGig.save();
        res.status(201).json(newGig);
    } catch (error) {
        res.status(500).json({ message: "Server error while creating gig." });
    }
});

// --- NEW --- UPDATE A GIG
router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) {
            return res.status(404).json({ message: 'Gig not found.' });
        }
        // Check if the user trying to update the gig is the one who created it
        if (gig.userRef.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own gigs.' });
        }
        
        const updatedGig = await Gig.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // {new: true} returns the updated document
        );
        
        res.status(200).json(updatedGig);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating gig.' });
    }
});


// GET ALL GIGS (with search)
router.get('/', async (req, res) => {
    try {
        const { searchTerm, category, location } = req.query;
        const query = {};
        if (searchTerm) {
            query.$or = [ { title: { $regex: searchTerm, $options: 'i' } }, { description: { $regex: searchTerm, $options: 'i' } } ];
        }
        if (category) { query.category = category; }
        if (location) { query.location = { $regex: location, $options: 'i' }; }
        const gigs = await Gig.find(query);
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching gigs." });
    }
});

// GET GIGS FOR CURRENT USER
router.get('/user/my-gigs', verifyToken, async (req, res) => {
    try {
        const gigs = await Gig.find({ userRef: req.user.id });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching user gigs.' });
    }
});

// DELETE A GIG
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

// GET SINGLE GIG
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('userRef', 'username email');
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching gig.' });
  }
});


module.exports = router;
