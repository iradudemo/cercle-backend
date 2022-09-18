const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of reviews"],
  },
  text: {
    type: String,
    required: [true, "Please add your text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  playground: {
    type: mongoose.Schema.ObjectId,
    ref: "PlayGround",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
// Prevent user from submitting more than one review per playground
ReviewsSchema.index({ playground: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewsSchema.statics.getAverageRating = async function (playgroundId) {
  const obj = await this.aggregate([
    {
      $match: { playground: playgroundId },
    },
    {
      $group: {
        _id: "$playground",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("PlayGround").findByIdAndUpdate(playgroundId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAveragerating after save
ReviewsSchema.post("save", function () {
  this.constructor.getAverageRating(this.playground);
});

// Call getAveragerating before remove
ReviewsSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.playground);
});

module.exports = mongoose.model("Review", ReviewsSchema);
