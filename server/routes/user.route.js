// in server/routes/user.route.js

const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const User = require("../models/user.model.js");
const Profile = require('../models/profile.model.js');
const router = express.Router();

// ----------------------------------------------------------------
// GET ALL USERS (EXCEPT SELF) - FOR CHAT FEATURE
// ----------------------------------------------------------------
router.get('/', verifyToken, async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id;
        // Find all users where the _id is "not equal" ($ne) to the logged-in user's ID
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
});


// ----------------------------------------------------------------
// GET ALL FREELANCER PROFILES - EFFICIENT METHOD ✅
// ----------------------------------------------------------------
router.get("/freelancers", async (req, res, next) => {
 try {
    // Step 1: Find all users with the role 'freelancer' and select only their IDs.
    const freelancerUsers = await User.find({ role: 'freelancer' }).select('_id');

    // Step 2: Create a new array containing only the user IDs.
    const freelancerUserIds = freelancerUsers.map(user => user._id);

    // Step 3: Find all profiles where the 'user' field is in our array of freelancer IDs.
    // Then, populate the 'user' field but only include the 'username'.
    const freelancerProfiles = await Profile.find({ user: { $in: freelancerUserIds } })
      .populate('user', 'username'); 

    res.status(200).json(freelancerProfiles);

 } catch (error) {
    console.error("Error fetching freelancer profiles:", error);
    next(error); // Pass the error to your global error handler
 }
});


module.exports = router;