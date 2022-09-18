const express = require("express");
const {
  getTransaction,
  createTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transaction");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getTransaction).post(createTransaction);
router
  .route("/:id")
  .get(getSingleTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
