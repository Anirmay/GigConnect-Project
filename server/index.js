const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path'); // NEW: Import the path module

const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth.route.js');
const gigRoutes = require('./routes/gig.route.js');
const profileRoutes = require('./routes/profile.route.js');
const messageRoutes = require('./routes/message.route.js');
const userRoutes = require('./routes/user.route.js');
const reviewRoutes = require('./routes/review.route.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// --- NEW: Function to get a user's socket ID ---
const userSocketMap = {}; // {userId: socketId}
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // Send the list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Make io and getReceiverSocketId accessible to routes
app.use((req, res, next) => {
    req.io = io;
    req.getReceiverSocketId = getReceiverSocketId;
    next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gig', gigRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/review', reviewRoutes);

// --- NEW: SERVE FRONTEND STATIC FILES IN PRODUCTION ---
const __dirname = path.resolve(); // Get the current directory path
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// --- END OF NEW SECTION ---


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});


