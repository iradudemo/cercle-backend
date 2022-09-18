const express = require("express");
const {
  getTime,
  createTime,
  getSingleTime,
  updateTime,
  deleteTime,
} = require("../controller/time");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Time = require("../models/Time");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Time, { path: "playground", select: "name" }), getTime)
  .post(protect, authorize("admin"), createTime);
router
  .route("/:id")
  .get(getSingleTime)
  .put(protect, authorize("admin"), updateTime)
  .delete(protect, authorize("admin"), deleteTime);

module.exports = router;
