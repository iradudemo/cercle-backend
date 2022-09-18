const mongoose = require("mongoose");
const slugify = require("slugify");

const PlayGroundSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please add any description this playground"],
    maxlength: [5000, "Description can not be more than 500 characters"],
  },

  price: {
    type: Number,
    default: 0,
  },
  photo: {
    type: Object,
    default: "no-photo.jpg",
    required: true,
  },
  photo2: {
    type: Object,
    default: "no-photo.jpg",
  },
  photo3: {
    type: Object,
    default: "no-photo.jpg",
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// Create playground slug from the name
PlayGroundSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("PlayGround", PlayGroundSchema);
