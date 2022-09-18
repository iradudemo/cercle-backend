const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const BookedTime = require("../models/BookedTime");

// @desc    Get all booked playground time
// @route   GET /api/bookedTime
// @access   public
exports.viewAllBooked = asyncHandler(async (req, res, next) => {
  const bookedTime = await BookedTime.find();
  res.status(200).json({ success: true, data: bookedTime });
});

// // @desc    Get booked playground time
// // @route   GET /api/time/:id
// // @acess   public
exports.getSingleBookedTime = asyncHandler(async (req, res, next) => {
  const bookedTime = await BookedTime.findById(req.params.id);
  if (!bookedTime) {
    return next(
      new ErrorResponse(`time with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: bookedTime });
});

// @desc Create time
// POST /api/time
// access private
exports.bookTime = asyncHandler(async (req, res, next) => {
  const { playgroundId, day, from, to } = req.body;
  const bookedTime = await BookedTime.create({ playgroundId, day, from, to });
  res.status(201).json({ success: true, data: bookedTime });
});

exports.updateABookedTime = asyncHandler(async (req, res, next) => {
  const bookedTime = await BookedTime.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!bookedTime) {
    return next(
      new ErrorResponse(`time with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {
      msg: `time with id: ${req.params.id} has updated successfully`,
      updated_data: bookedTime,
    },
  });
});

exports.deleteABookedTime = asyncHandler(async (req, res, next) => {
  const bookedTime = await BookedTime.findByIdAndDelete(req.params.id);
  if (!bookedTime) {
    return next(
      new ErrorResponse(`time with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {
      msg: "Time with id: " + req.params.id + " successfully deleted",
    },
  });
});
