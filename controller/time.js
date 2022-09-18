const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Time = require("../models/Time");

// @desc    Get all time
// @route   GET /api/time
// @access   public
exports.getTime = asyncHandler(async (req, res, next) => {
  const time = await Time.find();
  res.status(200).json({ success: true, data: time });
});

// @desc    Get single time
// @route   GET /api/time/:id
// @acess   public
exports.getSingleTime = asyncHandler(async (req, res, next) => {
  const time = await Time.findById(req.params.id);
  if (!time) {
    return next(
      new ErrorResponse(`time with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: time });
});

// @desc Create time
// POST /api/time
// access private
exports.createTime = asyncHandler(async (req, res, next) => {
  const time = await Time.create(req.body);
  res.status(201).json({ success: true, data: time });
});

exports.updateTime = asyncHandler(async (req, res, next) => {
  const time = await Time.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!time) {
    return next(
      new ErrorResponse(`time with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {
      msg: `time with id: ${req.params.id} has updated successfully`,
      updated_data: time,
    },
  });
});

exports.deleteTime = asyncHandler(async (req, res, next) => {
  const time = await Time.findByIdAndDelete(req.params.id);
  if (!time) {
    return next(
      new ErrorResponse(`time with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {
      msg: "Time with id: " + req.params.id + " Has deleted",
    },
  });
});
