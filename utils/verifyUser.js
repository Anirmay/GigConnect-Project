const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Token is not valid" });
        }
        
        // This line attaches the user's info to the request.
        req.user = decoded; 
        
        // This is the most important line. It tells the server to continue.
        next(); 
    });
};

module.exports = verifyToken;

