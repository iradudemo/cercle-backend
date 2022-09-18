const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
  playGroundId: {
    type: mongoose.Schema.ObjectId,
    ref: "PlayGround",
  },

  amount: {
    type: Number,
    required: true,
  },
  transactionStatus: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  telephoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  cretedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
