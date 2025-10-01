const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const Review = require('../models/review.model.js');
const router = express.Router();

// CREATE A NEW REVIEW (Protected Route)
router.post('/create', verifyToken, async (req, res) => {
    const { gigId, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        const newReview = new Review({
            gigId,
            userId,
            rating,
            comment
        });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: "Server error while creating review." });
    }
});

// GET ALL REVIEWS FOR A SPECIFIC GIG (Public Route)
router.get('/:gigId', async (req, res) => {
    try {
        const reviews = await Review.find({ gigId: req.params.gigId }).populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching reviews." });
    }
});

module.exports = router;
