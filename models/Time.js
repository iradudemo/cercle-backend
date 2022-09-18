const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  playground: {
    type: mongoose.Schema.ObjectId,
    ref: "PlayGround",
    required: true,
  },
  startTime: {
    type: String,
    required: [true, "provide starting hour"],
  },
  endTime: {
    type: String,
    required: [true, "Provide at which time playground will be free"],
  },
});

module.exports = mongoose.model("Time", TimeSchema);
