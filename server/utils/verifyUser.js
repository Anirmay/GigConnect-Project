const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No Token Provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Token is not valid" });
    }

    try {
      const user = await User.findById(decoded.id).select("role _id");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = { id: user._id.toString(), role: user.role };
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error in auth" });
    }
  });
};

module.exports = verifyToken;
