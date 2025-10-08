const express = require('express');
const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

// Helper function to verify token (used for the /verify route)
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });
        req.userId = decoded.id;
        next();
    });
};

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ message: "Username is already taken." });
        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email is already registered." });

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration." });
        console.log(error);
    }
});

// --- LOGIN ROUTE (Corrected) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return res.status(404).json({ message: "User not found." });

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // ** THE FIX IS HERE: **
        // We separate the password from the rest of the user data to send back
        const { password: hashedPassword, ...userData } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(200)
            .json(userData); // <-- Send user data, not just a message

    } catch (error) {
        res.status(500).json({ message: "Server error during login." });
        console.log(error);
    }
});

// --- FORGOT PASSWORD ROUTE ---
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User with this email does not exist." });

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save({ validateBeforeSave: false });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request for GigConnect',
            text: `Click the following link to reset your password: \n\n ${resetURL}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'An email has been sent.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error while sending reset email.' });
    }
});

// --- RESET PASSWORD ROUTE ---
router.post('/reset-password/:token', async (req, res) => {
    try {
        const user = await User.findOne({ 
            resetPasswordToken: req.params.token, 
            resetPasswordExpires: { $gt: Date.now() } 
        });

        if (!user) return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });

        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been successfully reset.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while resetting password.' });
    }
});


// --- LOGOUT ROUTE ---
router.post('/logout', (req, res) => {
    res.clearCookie('access_token').status(200).json({ message: "Logout successful." });
});

module.exports = router;

