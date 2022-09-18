const mongoose = require("mongoose");

const BookedTimeSchema = new mongoose.Schema({
  playgroundId: {
    type: mongoose.Schema.ObjectId,
    ref: "PlayGround",
    required: true,
  },
  day: {
    type: String,
    required: [true, "provide day"],
  },
  from: {
    type: String,
    required: [true, "provide starting hour"],
  },
  to: {
    type: String,
    required: [true, "Provide at which time playground will be free"],
  },
});

module.exports = mongoose.model("BookedTime", BookedTimeSchema);
