// in server/routes/user.route.js

const express = require('express');
const verifyToken = require('../utils/verifyUser.js');
const User = require("../models/user.model.js");
const Profile = require('../models/profile.model.js');
const router = express.Router();

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id;

        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
});



router.get("/freelancers", async (req, res, next) => {
 try {
    const freelancerUsers = await User.find({ role: 'freelancer' }).select('_id');

    const freelancerUserIds = freelancerUsers.map(user => user._id);

    const freelancerProfiles = await Profile.find({ user: { $in: freelancerUserIds } })
      .populate('user', 'username'); 

    res.status(200).json(freelancerProfiles);

 } catch (error) {
    console.error("Error fetching freelancer profiles:", error);
    next(error);
 }
});


module.exports = router;