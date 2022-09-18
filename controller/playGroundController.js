const path = require("path");
const PlayGround = require("../models/PlayG");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all playground
// @route   GET /api/playground
// @acess   public
exports.getPlayGround = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single playground
// @route   GET /api/playground/:id
// @acess   public
exports.getSinglePlayGround = asyncHandler(async (req, res, next) => {
  // try {
  const playGround = await PlayGround.findById(req.params.id);
  if (!playGround) {
    return next(
      new ErrorResponse(`playGround with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ sucess: true, data: playGround });
});

exports.createPlayGround = asyncHandler(async (req, res, next) => {
  const { name, category, description, price, photo, photo2, photo3 } =
    req.body;
  if (!photo)
    return next(new ErrorResponse(`Please upload at least on image`, 400));

  // check if playground exist
  const isExist = await PlayGround.findOne({ name });
  if (isExist)
    return next(
      new ErrorResponse(`Playground with name ${name} is already exist.`)
    );

  const playground = await PlayGround.create(req.body);
  res.status(201).json({ success: true, data: playground });
});

exports.updatePlayGround = asyncHandler(async (req, res, next) => {
  const playGround = await PlayGround.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!playGround) {
    return next(
      new ErrorResponse(`playGround with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    sucess: true,
    data: {
      msg: `playground with id: ${req.params.id} has already updated`,
      updated_data: playGround,
    },
  });
});

exports.deletePlayGround = asyncHandler(async (req, res, next) => {
  const playGround = await PlayGround.findByIdAndDelete(req.params.id);
  if (!playGround) {
    return next(
      new ErrorResponse(`playGround with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    sucess: true,
    data: {
      msg: "PlayGround with id: " + req.params.id + " Has already deleted",
    },
  });
});

// @desc      Upload photo for playground
// @route     PUT /api/playground/:id/photo
// @access    Private
exports.playgroundPhotoUpload = asyncHandler(async (req, res, next) => {
  const playground = await PlayGround.findById(req.params.id);

  if (!playground) {
    return next(
      new ErrorResponse(`PlayGround not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is playground owner

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${playground._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await PlayGround.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
