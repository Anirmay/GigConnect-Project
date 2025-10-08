import React from "react";
import axios from "axios";

export default function PaymentButton({ amount }) {
  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const { data: order } = await axios.post(
        "http://localhost:8000/api/payment/order",
        { amount }
      );

      // 2. Open Razorpay checkout
      const options = {
        key: "rzp_test_ROsUbrSSTao9AG", // use your test Key ID
        amount: order.amount,
        currency: order.currency,
        name: "GigConnect",
        description: "Gig Payment",
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify payment on backend
          await axios.post("http://localhost:8000/api/payment/verify", response);
          alert("✅ Payment Successful!");
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Something went wrong in payment");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        background: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Pay ₹{amount}
    </button>
  );
}