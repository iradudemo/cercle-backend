const express = require("express");
const {
  viewAllBooked,
  getSingleBookedTime,
  updateABookedTime,
  deleteABookedTime,
  bookTime,
} = require("../controller/bookedTime");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(viewAllBooked).post(bookTime);
router
  .route("/:id")
  .get(getSingleBookedTime)
  .put(updateABookedTime)
  .delete(deleteABookedTime);

module.exports = router;
