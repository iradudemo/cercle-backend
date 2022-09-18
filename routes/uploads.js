const router = require("express").Router();
const cloudinary = require("cloudinary");
const { json } = require("express");
const auth = require("../middleware/auth.js");
const fs = require("fs");

// upload to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// upload image
router.post("/", (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "No files uploaded!" });
    }
    const file = req.files.file;
    // file must not exceed 1mb
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ success: false, msg: "file size must be <1Mb" });
    }

    if (
      file.mimetype != "image/jpeg" &&
      file.mimetype != "image/png" &&
      file.mimetype != "image/jpg"
    ) {
      removeTmp(file.tempFilePath);

      return res.status(400).json({
        success: false,
        msg: "invalid file format only png or jpg are accepted.",
      });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "playground" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
// delete image on cloudinary
router.post("/drop", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No image selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Image deleted" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// remove file uploaded in tmp local folder
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = router;
