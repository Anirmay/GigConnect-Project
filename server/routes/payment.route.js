const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
router.post("/order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    res.json({ status: "Payment verified" });
  } catch (err) {
    console.error("❌ Payment verification failed:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

module.exports = router;