const express = require("express");
const {
  getPlayGround,
  getSinglePlayGround,
  createPlayGround,
  deletePlayGround,
  updatePlayGround,
  playgroundPhotoUpload,
} = require("../controller/playGroundController");
const advancedResults = require("../middleware/advancedResults");

const PlayGround = require("../models/PlayG");
const reviewRouter = require("./reviews");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use("/:playgroundId/reviews", reviewRouter);
router
  .route("/")
  .get(
    advancedResults(PlayGround, { path: "category", select: "name" }),
    getPlayGround
  )
  .post(protect, authorize("admin"), createPlayGround);
router
  .route("/:id/photo")
  .put(protect, authorize("admin"), playgroundPhotoUpload);
router
  .route("/:id")
  .get(getSinglePlayGround)
  .put(protect, authorize("admin"), updatePlayGround)
  .delete(protect, authorize("admin"), deletePlayGround);

module.exports = router;
