const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    time: { type: Date, default: new Date(), unique: true },
    orderName: { type: String, unique: false },
    orderNotes: String,
    mobileNumber: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number,
    products: [],
    // quantity: [],
    totalPrice: Number,
    promoCode: { type: String, default: null },
    delivered: { type: Boolean, default: false },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  { timestamps: true }
);

const Userdb = mongoose.model("orders", schema);

module.exports = Userdb;
