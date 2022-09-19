const express = require("express");
const {
  getTransaction,
  createTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
  approvePayment,
} = require("../controller/transaction");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getTransaction).post(createTransaction);
router
  .route("/:id")
  .get(getSingleTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);
router.route("/payment/:txId").post(approvePayment);

module.exports = router;
