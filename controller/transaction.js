const Transaction = require("../models/Transaction");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all transaction
// @route   GET /api/transaction
// @acess   public
exports.getTransaction = async (req, res, next) => {
  const transactions = await Transaction.find();
  res
    .status(200)
    .json({ success: true, count: transactions.length, data: transactions });
};

// @desc    Get single transaction
// @route   GET /api/transaction/:id
// @acess   public
exports.getSingleTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(
      new ErrorResponse(`transaction with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: transaction });
});

exports.createTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.create(req.body);
  res.status(201).json({ success: true, data: transaction });
});

exports.updateTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!transaction) {
    return next(
      new ErrorResponse(`transaction with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {
      msg: `transaction with id: ${req.params.id} has already updated`,
      updated_data: transaction,
    },
  });
});
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction) {
    return next(
      new ErrorResponse(`transaction with id: ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {
      msg: `transaction with id: ${req.params.id} has successfully deleted`,
    },
  });
});
exports.approvePayment = asyncHandler(async (req, res, next) => {
  console.log(`transaction ID: ${req.params.txId}`);
  console.log("________________________");
  console.log(req.body);
  const status = req.body.status;

  console.log("________________________");

  console.log(`Status ${status}`);
  if (status === "SUCCESS") {
    const transaction = await Transaction.findOneAndUpdate(
      {
        transactionId: req.params.txId,
      },
      { transactionStatus: "SUCCESS" },
      {
        new: true,
      }
    );
    if (!transaction) {
      return next(
        new ErrorResponse(
          `transaction with id: ${req.params.txid} not found`,
          404
        )
      );
    }
  }
  if (status === "FAILED") {
    const transaction = await Transaction.findOneAndUpdate(
      {
        transactionId: req.params.txId,
      },
      { transactionStatus: "FAILED" },
      {
        new: true,
      }
    );
    if (!transaction) {
      return next(
        new ErrorResponse(
          `transaction with id: ${req.params.txid} not found`,
          404
        )
      );
    }
  }
  if (status !== "SUCCESS") {
    return next(
      new ErrorResponse(
        `transaction with id: ${req.params.txid} had been failed`,
        200
      )
    );
  }

  res.status(200).json({
    success: true,
    data: {
      msg: `transaction with id: ${req.params.id} has already updated`,
    },
  });
});
