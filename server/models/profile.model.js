const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    headline: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    skills: {
        type: [String],
        default: []
    },
    portfolioLinks: {
        type: [String],
        default: []
    },
    hourlyRate: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;