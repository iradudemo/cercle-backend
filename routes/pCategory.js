const express = require("express");
const {
  getCategory,
  getSingleCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/category");

const playgroundRoute = require("./playGround");
const Category = require("../models/PCategory");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// router.use("/:categoryId/playground", playgroundRoute);

router
  .route("/")
  .get(advancedResults(Category), getCategory)
  .post(protect, authorize("admin"), createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
