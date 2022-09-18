const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let errors = { ...err };
  errors.message = err.message;
  console.log(err);

  //   mongoose object Id
  if (err.name === "CastError") {
    const message = `Resource with an id ${err.value} is not found`;
    errors = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate id
  if (err.code === 11000) {
    const message = "Duplicate value appears please provide different name";
    errors = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    errors = new ErrorResponse(message, 400);
  }
  res
    .status(errors.statusCode || 500)
    .json({ success: false, errors: errors.message || "Server error" });
};

module.exports = errorHandler;
