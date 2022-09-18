const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Reviews = require("../models/Reviews");
const PlayGround = require("../models/PlayG");

// @desc      Get reviews
// @route     GET /api/reviews
// @route     GET /api/playgrounds/:playgrounds/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.playgroundId) {
    const reviews = await Reviews.find({ playground: req.params.playgroundId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single review
// @route     GET /api/reviews
// @route     GET /api/reviews
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id).populate({
    path: "playground",
    select: "name discription",
  });
  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Add review
// @route     POST /api/plaground/:playgroundId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.playground = req.params.playgroundId;
  req.body.user = req.user.id;

  const playground = await PlayGround.findById(req.params.playgroundId);

  if (!playground) {
    return next(
      new ErrorResponse(
        `No playground with the id of ${req.params.playgroundId}`,
        404
      )
    );
  }

  const review = await Reviews.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc      Update review
// @route     PUT /api/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Reviews.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc      Delete review
// @route     DELETE /api/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
