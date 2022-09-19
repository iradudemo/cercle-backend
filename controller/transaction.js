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
      msg: `transaction with id: ${req.params.id} has already deleted`,
    },
  });
});
exports.approvePayment = asyncHandler(async (req, res, next) => {
  console.log(req.params.txId);
  console.log(JSON.stringify(res.body));
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
