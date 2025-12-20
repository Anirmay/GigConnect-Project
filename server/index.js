const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const path = require("path");

// Import Routes
const authRoutes = require('./routes/auth.route.js');
const gigRoutes = require('./routes/gig.route.js');
const profileRoutes = require('./routes/profile.route.js');
const messageRoutes = require('./routes/message.route.js');
const userRoutes = require('./routes/user.route.js');
const reviewRoutes = require('./routes/review.route.js');
const paymentRoutes = require('./routes/payment.route.js');

// ✅ Added freelancer review route
// const freelancerReviewRoutes = require('./routes/freelancerReview.route.js');

const app = express();
const server = http.createServer(app);

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // Local dev
      "https://gigconnect-anirmay.vercel.app", // Production frontend URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }
const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Allow CORS from both local + production frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gigconnect-project.netlify.app" // ✅ ADD THIS: Your actual Netlify site
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// ✅ Middleware to attach socket info
app.use((req, res, next) => {
  req.io = io;
  req.getReceiverSocketId = getReceiverSocketId;
  next();
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/payment", paymentRoutes);


app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
